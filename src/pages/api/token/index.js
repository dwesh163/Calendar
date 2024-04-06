import * as mysql from 'mysql2/promise';
import { dbConfig } from '../../../../lib/config';
import jwt from 'jsonwebtoken';

async function connectMySQL() {
	try {
		const connection = await mysql.createConnection(dbConfig);
		return connection;
	} catch (error) {
		console.error('Error connecting to MySQL:', error);
		throw error;
	}
}

export default async function Auth(req, res) {
	if (req.headers.authorization == undefined) {
		return res.status(401).send('unauthorized');
	}

	try {
		const connection = await connectMySQL();
		let [[api]] = await connection.execute('SELECT * FROM api WHERE api_key = ? LIMIT 1', [req.headers.authorization.replace('Bearer ', '')]);

		if (api == undefined) {
			return res.status(401).send('unauthorized');
		}

		await connection.execute('UPDATE api SET api_used = api_used + 1, api_last_used = ? WHERE api_id = ?', [new Date(), api.api_id]);

		const expiry = new Date();
		expiry.setMinutes(expiry.getMinutes() + 10);
		var token = jwt.sign({ id: api.api_public_id, exp: Math.floor(Date.now() / 1000) + 10 * 60 }, process.env.API_SECRET);

		return res.status(200).send({ token: token, expiry: expiry });
	} catch (error) {
		console.error(error);
		return res.status(401).send('unauthorized');
	}
}
