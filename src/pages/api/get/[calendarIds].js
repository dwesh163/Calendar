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
		let calendars = [];

		if (verify.code != 200) {
			return res.status(verify.code).send(verify.response);
		}

		const reqCalendarIds = req.query.calendarIds.split(/:|\n/).filter((id) => id.trim() !== '');

		for (const calendarId of reqCalendarIds) {
			if (verify.response.calendarsId.includes(calendarId)) {
				const [[calendar]] = await connection.execute('SELECT calendar_name, calendar_color, calendar_id_public FROM calendars WHERE calendar_id_public = ?', [calendarId]);
				calendars.push(calendar);
			}
		}

		return res.status(200).send(calendars);
	} catch (error) {
		console.log(error);
		return res.status(401).send('unauthorized');
	}
}
