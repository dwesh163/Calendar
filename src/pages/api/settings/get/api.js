import mysql from 'mysql2/promise';
import { dbConfig } from '../../../../../lib/config';
import { getSession } from 'next-auth/react';

async function connectMySQL() {
	try {
		const connection = await mysql.createConnection(dbConfig);
		return connection;
	} catch (error) {
		console.error('Error connecting to MySQL:', error);
		throw error;
	}
}

export default async function GetApis(req, res) {
	const connection = await connectMySQL();
	const session = await getSession({ req });
	try {
		const [users] = await connection.execute('SELECT user_id FROM users WHERE user_id_public = ?', [session.user.id]);
		const user = users[0];

		if (!user) {
			return res.status(401).send('Unauthorized');
		}

		const [apis] = await connection.execute('SELECT api_key, api_limit, api_used, api_last_used, api_date_created FROM api WHERE api_user_id = ?', [user.user_id]);

		return res.status(200).send(apis);
	} catch (error) {
		console.log(error);
		return res.status(401).send('unauthorized');
	}
}
