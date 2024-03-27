import mysql from 'mysql2/promise';
import { dbConfig } from '../../../../../lib/config';
import { getSession } from 'next-auth/react';

const jwt = require('jsonwebtoken');

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

	try {
		let user = await connection.execute('SELECT * FROM users WHERE user_id_public = ?', [session.user.id]);
		user = user[0][0];

		if (user == undefined) {
			return res.status(401).send('unauthorized');
		}

		let calendarIds = await connection.execute('SELECT calendar_id_public FROM calendars WHERE calendar_user_id = ?', [user.user_id]);
		calendarIds = calendarIds[0].map((item) => item.calendar_id_public);

		let reqCalendarIds = req.query.calendarId.split(':');

		let calendars = [];
		let events = [];

		for (let i = 0; i < reqCalendarIds.length; i++) {
			let calendarId = reqCalendarIds[i];
			if (!calendarIds.includes(calendarId)) {
				continue;
			}
			let calendar = await connection.execute('SELECT calendar_id, calendar_name, calendar_color, calendar_id_public FROM calendars WHERE calendar_id_public = ?', [calendarId]);

			let eventDateWeek = new Date();
			let dateParts = req.query.date.split('-');
			let eventDate = new Date(dateParts[2], parseInt(dateParts[0]) - 1, dateParts[1]);
			eventDate.setDate(eventDate.getDate() - 1);
			eventDateWeek.setDate(eventDate.getDate() + 7);

			let eventsCalendar = await connection.execute('SELECT event_start, event_end, event_description, event_date, event_location, event_url, event_name FROM events WHERE calendar_id = ? AND event_date > ? AND event_date < ?', [calendar[0][0].calendar_id, eventDate, eventDateWeek]);

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
