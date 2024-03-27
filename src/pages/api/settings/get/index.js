import mysql from 'mysql2/promise';
import { dbConfig } from '../../../../../lib/config';
import { getSession } from 'next-auth/react';

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

export default async function GetSettings(req, res) {
	const connection = await connectMySQL();
	const session = await getSession({ req });

	try {
		var user = await connection.execute('SELECT user_id, user_email, user_username, user_image, user_provider, user_company, user_name FROM users WHERE user_id_public = ?', [session.user.id]);

		if (user == undefined) {
			return res.status(401).send('unauthorized');
		}

		var devices = await connection.execute('SELECT * FROM devices WHERE devices_user_id = ?', [user[0][0].user_id]);

		const settings = {
			user: user[0][0],
			devices: devices[0],
		};
		return res.status(200).send(settings);
	} catch (error) {
		console.log(error);
		return res.status(401).send('unauthorized');
	}
}
