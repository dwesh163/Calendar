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

export default async function Events(req, res) {
	try {
		const connection = await connectMySQL();
		if (req.method == 'GET') {
			const verify = await getAndVerifyUser(req, 'GET', 'event', connection);
			let events = [];

			if (verify.code != 200) {
				return res.status(verify.code).send(verify.response);
			}

			const reqEventsId = req.query.eventsId.split(/:|\n/).filter((id) => id.trim() !== '');

			for (const eventId of reqEventsId) {
				let [[event]] = await connection.execute('SELECT event_id_public, event_start, event_end, event_description, event_location, event_url, event_name, calendar_id FROM events WHERE event_id_public = ?', [eventId]);
				if (event != undefined && verify.response.user_req_calendars_id.includes(verify.response.user_calendars_id[event.calendar_id])) {
					events.push(event);
				}
			}

			events = events.map((item) => ({
				id: item.event_id_public,
				start: item.event_start,
				end: item.event_end,
				description: item.event_description,
				location: item.event_location,
				url: item.event_url,
				name: item.event_name,
				calendarId: verify.response.user_calendars_id[item.calendar_id],
			}));

			return res.status(200).send(events);
		}

		if (req.method == 'PUT') {
			const verify = await getAndVerifyUser(req, 'PUT', 'event', connection);
			const data = JSON.parse(JSON.stringify(req.body));
			const id = req.query.eventsId;

			if (verify.code != 200) {
				return res.status(verify.code).send(verify.response);
			}

			if (!data.start && !data.end && !data.description && !data.location && !data.url && !data.name && !data.calendarId) {
				return res.status(406).send('No new data provided');
			}

			const [[existingEvent]] = await connection.execute('SELECT * FROM events WHERE event_id_public = ?', [id]);

			if (!verify.response.user_calendars_id[existingEvent.calendar_id]) {
				return res.status(404).send('Event not found');
			}

			const newStart = data.start ? new Date(data.start) : existingEvent.event_start;
			const newEnd = data.end ? new Date(data.end) : existingEvent.event_end;
			const newDescription = data.description ? data.description : existingEvent.event_description;
			const newLocation = data.location ? data.location : existingEvent.event_location;
			const newUrl = data.url ? data.url : existingEvent.event_url;
			const newName = data.name ? data.name : existingEvent.event_name;
			const newCalendarId = data.calendarId ? verify.response.user_calendars_id[data.calendarId] : existingEvent.calendar_id;

			console.log(newStart, newEnd, newDescription, newLocation, newUrl, newName, newCalendarId);

			await connection.execute('UPDATE events SET event_start = ?, event_end = ?, event_description = ?, event_location = ?, event_url = ?, event_name = ?, calendar_id = ? WHERE event_id_public = ?', [newStart, newEnd, newDescription, newLocation, newUrl, newName, newCalendarId, id]);

			return res.status(200).send('Event updated successfully');
		}

		if (req.method == 'DELETE') {
			const verify = await getAndVerifyUser(req, 'DELETE', 'event', connection);
			if (verify.code != 200) {
				return res.status(verify.code).send(verify.response);
			}

			const reqEventsId = req.query.eventsId.split(/:|\n/).filter((id) => id.trim() !== '');

			for (const eventId of reqEventsId) {
				const [[existingEvent]] = await connection.execute('SELECT * FROM events WHERE event_id_public = ?', [eventId]);

				if (verify.response.user_calendars_id[existingEvent.calendar_id]) {
					await connection.execute('DELETE FROM events WHERE event_id_public = ?', [eventId]);
				}
			}

			res.send(200);
		}
		return res.status(405).send('Method Not Allowed');
	} catch (error) {
		console.log(error);
		return res.status(500).send('Internal Server Error');
	}
}
