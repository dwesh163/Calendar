import mysql from 'mysql2/promise';
import { dbConfig } from '../../../../lib/config';
import getAndVerifyUser from '../../../../lib/auth';
import { v4 as uuidv4 } from 'uuid';

async function connectMySQL() {
	try {
		const connection = await mysql.createConnection(dbConfig);
		return connection;
	} catch (error) {
		console.error('Error connecting to MySQL:', error);
		throw error;
	}
}

export default async function Index(req, res) {
	try {
		const connection = await connectMySQL();
		if (req.method == 'GET') {
			const verify = await getAndVerifyUser(req, 'GET', 'event', connection);
			const eventsList = [];

			if (verify.code != 200) {
				return res.status(verify.code).send(verify.response);
			}

			for (const calendasId in verify.response.user_req_calendars_id) {
				let [events] = await connection.execute('SELECT event_start, event_end, event_description, event_location, event_url, event_name, calendar_id, event_id_public FROM events WHERE calendar_id = ?', [parseInt(calendasId)]);
				if (events.length == 0) {
					continue;
				}

				events = events.map((item) => {
					eventsList.push({
						id: item.event_id_public,
						start: item.event_start,
						end: item.event_end,
						description: item.event_description,
						location: item.event_location,
						url: item.event_url,
						name: item.event_name,
						calendarId: verify.response.user_calendars_id[item.calendar_id],
					});
				});
			}

			return res.status(200).send(eventsList);
		}

		if (req.method == 'POST') {
			const verify = await getAndVerifyUser(req, 'POST', 'event', connection);
			const data = JSON.parse(JSON.stringify(req.body));
			const id = uuidv4();

			if (verify.code != 200) {
				return res.status(verify.code).send(verify.response);
			}

			if (!data.name || !data.start || !data.end || !data.calendarId) {
				return res.status(406).send('Data not valid');
			}

			await connection.execute('INSERT INTO events (event_id_public, event_start, event_end, event_description, event_location, event_url, event_name, calendar_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [id, new Date(data.start), new Date(data.end), data.description ? data.description : null, data.location ? data.location : null, data.url ? data.url : null, data.name, data.calendarId]);

			return res.status(201).send({ id: id, end: new Date(data.end), start: new Date(data.start), description: data.description, location: data.location, url: data.url, name: data.name });
		}
		return res.status(405).send('Method Not Allowed');
	} catch (error) {
		console.log(error);
		return res.status(401).send('unauthorized');
	}
}
