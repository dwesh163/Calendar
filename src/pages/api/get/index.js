import mysql from 'mysql2/promise';
import { dbConfig } from '../../../../lib/config';
import getAndVerifyUser from '../../../../lib/auth';

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
	try {
		const connection = await connectMySQL();
		const verify = await getAndVerifyUser(req, 'GET', connection);

		if (verify.code != 200) {
			return res.status(verify.code).send(verify.response);
		}

		return res.status(200).send(verify.response.calendarsId);
	} catch (error) {
		console.log(error);
		return res.status(401).send('unauthorized');
	}
}
