import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { v4 as uuidv4 } from 'uuid';
import mysql from 'mysql2/promise';
import { dbConfig } from '../../../../lib/config';

var jwt = require('jsonwebtoken');
var uaParser = require('ua-parser-js');

async function connectMySQL() {
	try {
		const connection = await mysql.createConnection(dbConfig);
		return connection;
	} catch (error) {
		console.error('Error connecting to MySQL:', error);
		throw error;
	}
}

export const authOptions = (req) => ({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			const connection = await connectMySQL();
			try {
				const [[existingUser]] = await connection.execute('SELECT * FROM users WHERE user_email = ?', [user.email]);

				if (existingUser) {
					await connection.execute('UPDATE users SET user_username = ?, user_image = ?, user_provider = ?, user_company = ?, user_name = ? WHERE user_email = ?', [profile.login, user.image, account.provider, profile.company, profile.name, user.email]);
				} else {
					await connection.execute('INSERT INTO users (user_id_public, user_email, user_username, user_image, user_provider, user_company, user_name) VALUES (?, ?, ?, ?, ?, ?, ?)', [uuidv4(), user.email, profile.login, user.image, account.provider, profile.company, profile.name]);
					const [[user]] = await connection.execute('SELECT user_id FROM users WHERE user_email = ?', [user.email]);
					await connection.execute('INSERT INTO calendars (calendar_name, calendar_icon, calendar_id_public, calendar_color, calendar_user_id) VALUES (?, ?, ?, ?, ?)', ['Calendar 1', 'Calendar3', uuidv4(), 'a855f7', user.user_id]);
				}

				var deviceInfo = uaParser(req.headers['user-agent']);

				deviceInfo.os.version = deviceInfo.os.version || '';
				deviceInfo.device.vendor = deviceInfo.device.vendor || '';
				deviceInfo.device.model = deviceInfo.device.model || '';
				deviceInfo.device.type = deviceInfo.device.type || '';

				await connection.execute('INSERT INTO devices (devices_ip, devices_os_name, devices_os_version, devices_vendor, devices_browser_name, devices_browser_version, devices_public_id, devices_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [req.headers.host, deviceInfo.os.name, deviceInfo.os.version, deviceInfo.device.vendor, deviceInfo.browser.name, deviceInfo.browser.version, uuidv4(), existingUser.user_id ? existingUser.user_id : user.user_id]);

				if (profile.login == process.env.SUPER_ADMIN) {
					return Promise.resolve(true);
				}

				return Promise.resolve(false);
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
				const [[existingUser]] = await connection.execute('SELECT * FROM users WHERE user_email = ?', [session.user.email]);
				const [calendarsId] = await connection.execute('SELECT calendar_id_public FROM calendars WHERE calendar_user_id = ?', [existingUser.user_id]);
				if (existingUser) {
					session.user.id = existingUser.user_id_public;
					session.user.username = existingUser.user_username;
					session.user.calendarId = calendarsId.map((item) => item.calendar_id_public);
				}
			} catch (error) {
				console.error('Error during session creation:', error);
			} finally {
				if (connection) connection.end();
			}
			return session;
		},
	},
});

export default (req, res) => NextAuth(req, res, authOptions(req));
