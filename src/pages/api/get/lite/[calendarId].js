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

export default async function Get(req, res) {
	const connection = await connectMySQL();
	const session = await getSession({ req });

	if (!req.headers.user) {
		return res.status(401).send('unauthorized');
	}

	try {
		var user = await connection.execute('SELECT * FROM users WHERE user_id_public = ?', [session.user.id]);
		user = user[0][0];

		if (user == undefined) {
			return res.status(401).send('unauthorized');
		}
		var calendarIds = await connection.execute('SELECT calendar_id_public FROM calendars WHERE calendar_user_id = ?', [user.user_id]);
		calendarIds = calendarIds[0].map((item) => item.calendar_id_public);
		var reqCalendarIds = req.query.calendarId.split(':');

		var calendars = [];
		var events = [];

		for (let i = 0; i < reqCalendarIds.length; i++) {
			var calendarId = reqCalendarIds[i];
			if (!calendarIds.includes(calendarId)) {
				continue;
			}
			var calendar = await connection.execute('SELECT calendar_id, calendar_name, calendar_color, calendar_id_public FROM calendars WHERE calendar_id_public = ?', [calendarId]);

			var dateParts = req.query.date.split('-');
			var eventDate = new Date(dateParts[2], parseInt(dateParts[0]) - 1, dateParts[1]);
			eventDate.setDate(eventDate.getDate() - 1);

			var eventsCalendar = await connection.execute('SELECT event_start, event_end, event_date, event_name FROM events WHERE calendar_id = ?', [calendar[0][0].calendar_id]);

			eventsCalendar[0].map((item) => {
				item.calendar_id = calendar[0][0].calendar_id_public;
				item.color = calendar[0][0].calendar_color;
				events.push(item);
			});

			delete calendar[0][0].calendar_id;

			calendars.push(calendar[0][0]);
		}

		return res.status(200).send({ calendars, events });
	} catch (error) {
		console.log(error);
		return res.status(401).send('unauthorized');
	}
}
