import mysql from 'mysql2/promise';
import { dbConfig } from '../../../../../lib/config';
import { getSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';

const generateKey = (length) => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};

const connectMySQL = async () => {
	try {
		const connection = await mysql.createConnection(dbConfig);
		return connection;
	} catch (error) {
		console.error('Error connecting to MySQL:', error);
		throw error;
	}
};

const verifyApiKey = async (newKey, connection) => {
	const [rows] = await connection.execute('SELECT api_key FROM api WHERE api_key = ?', [newKey]);
	return rows.length > 0;
};

const getUserApiCount = async (userId, connection) => {
	const [rows] = await connection.execute('SELECT COUNT(*) AS api_count FROM api WHERE api_user_id = ?', [userId]);
	return rows[0].api_count;
};

const insertApiKey = async (key, secret_key, userId, currentDate, connection) => {
	await connection.execute('INSERT INTO api (api_key, api_secret_key, api_public_id, api_limit, api_used, api_last_used, api_date_created, api_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [key, secret_key, uuidv4(), 100, 0, null, currentDate, userId]);
};

export default async function Get(req, res) {
	const connection = await connectMySQL();
	const session = await getSession({ req });

	try {
		const [users] = await connection.execute('SELECT * FROM users WHERE user_id_public = ?', [session.user.id]);
		const user = users[0];

		if (!user) {
			return res.status(401).send('Unauthorized');
		}

		const apiCount = await getUserApiCount(user.user_id, connection);
		if (apiCount >= 5) {
			return res.status(403).send('API limit reached for this user');
		}

		let key;
		do {
			key = generateKey(32);
		} while (await verifyApiKey(key, connection));

		const currentDate = new Date();

		await insertApiKey(key, generateKey(32), user.user_id, currentDate, connection);

		return res.status(200).send({ api_key: key, api_limit: 100, api_used: 0, api_last_used: null, api_date_created: currentDate });
	} catch (error) {
		console.error('Error:', error);
		return res.status(401).send('Unauthorized');
	} finally {
		if (connection) {
			connection.end();
		}
	}
}
