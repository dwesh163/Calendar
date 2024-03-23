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

export default async function Create(req, res) {
	const connection = await connectMySQL();

	try {
		var user = await connection.execute('SELECT * FROM users WHERE user_id_public = ?', [req.headers.user]);
		user = user[0][0];

		if (user == undefined) {
			return res.status(404).send('unauthorized');
		}

		var decoded = jwt.verify(req.headers.token, user.user_key_public);

		if (decoded.key == user.user_key_private && decoded.id == user.user_id_public && decoded.id == req.headers.user) {
			// console.log(decoded);
		}
	} catch (error) {
		return res.status(500).send(error);
	}

	return res.status(200).send({});
}
