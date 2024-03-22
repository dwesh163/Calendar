import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { v4 as uuidv4 } from 'uuid';
import mysql from 'mysql2/promise';
import { dbConfig } from '../../../../lib/config';

var jwt = require('jsonwebtoken');

async function connectMySQL() {
	try {
		const connection = await mysql.createConnection(dbConfig);
		return connection;
	} catch (error) {
		console.error('Error connecting to MySQL:', error);
		throw error;
	}
}

function generateRandomString(length) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return result;
}

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			const connection = await connectMySQL();
			try {
				const [existingUser] = await connection.execute('SELECT * FROM users WHERE user_email = ?', [user.email]);

				if (existingUser.length) {
					await connection.execute('UPDATE users SET user_username = ?, user_image = ?, user_provider = ?, user_company = ?, user_name = ? WHERE user_email = ?', [profile.login, user.image, account.provider, profile.company, profile.name, user.email]);
				} else {
					await connection.execute('INSERT INTO users (user_id_public, user_email, user_username, user_image, user_provider, user_company, user_name, user_key_private, user_key_public) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [uuidv4(), user.email, profile.login, user.image, account.provider, profile.company, profile.name, generateRandomString(32), generateRandomString(32)]);
					const [rows] = await connection.execute('SELECT user_id FROM users WHERE user_email = ?', [user.email]);
					const userId = rows[0].user_id;
					await connection.execute('INSERT INTO calendars (calendar_name, calendar_id_public, calendar_color, calendar_user_id) VALUES (?, ?, ?, ?)', ['Calendar 1', uuidv4(), 'a855f7', userId]);
				}

				return Promise.resolve(true);
			} catch (error) {
				console.error('Error during sign-in:', error);
				return Promise.resolve(false);
			} finally {
				if (connection) connection.end();
			}
		},

		async session({ session, token, user }) {
			const connection = await connectMySQL();
			try {
				const [existingUser] = await connection.execute('SELECT * FROM users WHERE user_email = ?', [session.user.email]);
				const [calendarsId] = await connection.execute('SELECT calendar_id_public FROM calendars WHERE calendar_user_id = ?', [existingUser[0].user_id]);
				if (existingUser.length) {
					const payload = {
						time: new Date().getTime(),
						id: existingUser[0].user_id_public,
						key: existingUser[0].user_key_private,
						calendarId: calendarsId.map((item) => item.calendar_id_public),
					};

					const secretKey = existingUser[0].user_key_private;
					const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });

					session.user.id = existingUser[0].user_id_public;
					session.user.username = existingUser[0].user_username;
					session.user.calendarId = calendarsId.map((item) => item.calendar_id_public);
					session.token = token;
				}
			} catch (error) {
				console.error('Error during session creation:', error);
			} finally {
				if (connection) connection.end();
			}
			return session;
		},
	},
};

export default NextAuth(authOptions);
