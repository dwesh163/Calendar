import mysql from 'mysql2/promise';
import { dbConfig } from '../../../../../lib/config';
import verifyUserRequest from '../../../../../lib/auth';

async function connectMySQL() {
	try {
		const connection = await mysql.createConnection(dbConfig);
		return connection;
	} catch (error) {
		console.error('Error connecting to MySQL:', error);
		throw error;
	}
}

export default async function Get2(req, res) {
	const connection = await connectMySQL();

	try {
		const verify = await verifyUserRequest(req.headers.key, req.headers.token, connection);

		if (verify.code == 401) {
			return res.status(401).send('unauthorized');
		}
		if (verify.code == 403) {
			return res.status(403).send('Max limit reached');
		}

		const calendarIds = verify.calendarIds;

		const reqCalendarIds = req.query.calendarIds.split(':');

		if (req.query.date) {
			const eventsOfDay = await getEventsByDate(connection, reqCalendarIds, req.query.date);
			return res.status(200).send({ events: eventsOfDay });
		} else if (req.query.name) {
			const eventsByName = await getEventsByName(connection, reqCalendarIds, req.query.name);
			return res.status(200).send({ events: eventsByName });
		} else {
			return res.status(200).send({});
		}
	} catch (error) {
		console.error(error);
		return res.status(401).send('Unauthorized');
	}
}

async function getEventsByDate(connection, calendarIds, date) {
	const [firstDayOfMonth, lastDayOfMonth] = getFirstAndLastDayOfMonth(date);

	const events = [];
	for (const calendarId of calendarIds) {
		const calendarEvents = await connection.execute('SELECT * FROM events WHERE calendar_id = ? AND event_date = ?', [calendarId, date]);
		events.push(...calendarEvents[0]);
	}
	return events;
}

async function getEventsByName(connection, calendarIds, name) {
	const events = [];
	for (const calendarId of calendarIds) {
		const calendarEvents = await connection.execute('SELECT * FROM events WHERE calendar_id = ? AND event_name = ?', [calendarId, name]);
		events.push(...calendarEvents[0]);
	}
	return events;
}

function getFirstAndLastDayOfMonth(dateString) {
	const [month, day, year] = dateString.split('-').map(Number);
	const firstDayOfMonth = new Date(year, month - 1, 1);
	const lastDayOfMonth = new Date(year, month, 0);
	return [firstDayOfMonth, lastDayOfMonth];
}
