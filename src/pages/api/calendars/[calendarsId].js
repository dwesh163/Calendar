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

export default async function Calendars(req, res) {
	try {
		const connection = await connectMySQL();
		if (req.method == 'GET') {
			const verify = await getAndVerifyUser(req, 'GET', 'calendar', connection);
			let calendars = [];

			if (verify.code != 200) {
				return res.status(verify.code).send(verify.response);
			}

			const reqCalendarsId = req.query.calendarsId.split(/:|\n/).filter((id) => id.trim() !== '');

			if (reqCalendarsId.length == 1) {
				const [[calendar]] = await connection.execute('SELECT calendar_name, calendar_color, calendar_id_public FROM calendars WHERE calendar_id_public = ?', [reqCalendarsId[0]]);
				return res.status(200).send(calendar);
			}

			for (const calendarId of reqCalendarsId) {
				if (verify.response.calendarsPublicId.includes(calendarId)) {
					const [[calendar]] = await connection.execute('SELECT calendar_name, calendar_color, calendar_id_public FROM calendars WHERE calendar_id_public = ?', [calendarId]);
					calendars.push(calendar);
				}
			}

			return res.status(200).send(calendars);
		}

		if (req.method == 'PUT') {
			const verify = await getAndVerifyUser(req, 'PUT', 'calendar', connection);
			const data = JSON.parse(JSON.stringify(req.body));
			const Regex = /^#[0-9A-F]{6}$/i;
			const id = req.query.calendarsId;

			if (verify.code != 200) {
				return res.status(verify.code).send(verify.response);
			}

			if (!data.name && !data.color && !data.icon) {
				return res.status(406).send('No new data provided');
			}

			if (data.color && !Regex.test(data.color)) {
				return res.status(406).send('Color format not valid must be #XXXXXX');
			}

			const [[existingCalendar]] = await connection.execute('SELECT * FROM calendars WHERE calendar_id_public = ? AND calendar_user_id = ?', [id, verify.response.user_id]);
			const newName = data.name ? data.name : existingCalendar.calendar_name;
			const newIcon = data.icon ? data.icon : existingCalendar.calendar_icon;
			const newColor = data.color ? data.color.replace('#', '') : existingCalendar.calendar_color;

			await connection.execute('UPDATE calendars SET calendar_name = ?, calendar_color = ?, calendar_icon = ? WHERE calendar_id_public = ? AND calendar_user_id = ?', [newName, newColor, newIcon, id, verify.response.user_id]);

			return res.status(200).send('Calendar updated successfully');
		}

		if (req.method == 'DELETE') {
			const verify = await getAndVerifyUser(req, 'DELETE', 'calendar', connection);
			if (verify.code != 200) {
				return res.status(verify.code).send(verify.response);
			}

			const reqCalendarsId = req.query.calendarsId.split(/:|\n/).filter((id) => id.trim() !== '');

			for (const calendarId of reqCalendarsId) {
				const [[calendar]] = await connection.execute('SELECT calendar_id FROM calendars WHERE calendar_id_public = ?', [calendarId]);

				await connection.execute('DELETE FROM events WHERE calendar_id = ?', [calendar.calendar_id]);
				await connection.execute('DELETE FROM calendars WHERE calendar_id_public = ?', [calendarId]);
			}

			res.send(200);
		}
		return res.status(405).send('Method Not Allowed');
	} catch (error) {
		console.log(error);
		return res.status(401).send('unauthorized');
	}
}
