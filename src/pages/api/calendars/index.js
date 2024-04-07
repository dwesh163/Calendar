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
			const verify = await getAndVerifyUser(req, 'GET', 'calendar', connection);

			if (verify.code != 200) {
				return res.status(verify.code).send(verify.response);
			}

			let [calendarsId] = await connection.execute('SELECT calendar_id_public, calendar_name, calendar_icon, calendar_color FROM calendars WHERE calendar_user_id = ?', [verify.response.user_id]);

			calendarsId = calendarsId.map((item) => ({
				id: item.calendar_id_public,
				color: item.calendar_color,
				name: item.calendar_name,
				icon: item.calendar_icon,
			}));

			return res.status(200).send(calendarsId);
		}

		if (req.method == 'POST') {
			const verify = await getAndVerifyUser(req, 'POST', 'calendar', connection);
			const data = JSON.parse(JSON.stringify(req.body));
			const Regex = /^#[0-9A-F]{6}$/i;
			const id = uuidv4();

			if (verify.code != 200) {
				return res.status(verify.code).send(verify.response);
			}

			if (!data.name || !data.color || !data.icon) {
				return res.status(406).send('Data not valid');
			}

			if (!Regex.test(data.color)) {
				return res.status(406).send('Color format not valid must be #XXXXXX');
			}

			const [[count]] = await connection.execute('SELECT COUNT(*) AS calendar_count FROM calendars WHERE calendar_user_id = ?', [verify.response.user_id]);

			if (count.calendar_count >= 8) {
				return res.status(429).send('Maximum number of calendars created');
			}

			await connection.execute('INSERT INTO calendars (calendar_id_public, calendar_name, calendar_color, calendar_icon, calendar_user_id) VALUES (?, ?, ?, ?,?)', [id, data.name, data.color.replace('#', ''), data.icon, verify.response.user_id]);
			return res.status(201).send({ id: id, name: data.name, color: data.color.replace('#', ''), icon: data.icon });
		}
		return res.status(405).send('Method Not Allowed');
	} catch (error) {
		console.log(error);
		return res.status(500).send('Internal Server Error');
	}
}
