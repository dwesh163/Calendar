import mysql from 'mysql2/promise';
import { dbConfig } from '../../../../../lib/config';

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

	if (!req.headers.user) {
		return res.status(401).send('unauthorized');
	}

	try {
		var user = await connection.execute('SELECT user_id, user_email, user_username, user_image, user_provider, user_company, user_name, user_key_private, user_id_public FROM users WHERE user_id_public = ?', [req.headers.user]);
		user = user[0][0];

		if (user == undefined) {
			return res.status(401).send('unauthorized');
		}

		var decoded = jwt.verify(req.headers.token, user.user_key_private);

		if (decoded.id == user.user_id_public && decoded.id == req.headers.user) {
			delete user.user_key_private;
			delete user.user_id_public;
			return res.status(200).send(user);
		} else {
			return res.status(401).send('unauthorized');
		}
	} catch (error) {
		console.log(error);
		return res.status(401).send('unauthorized');
	}
}
