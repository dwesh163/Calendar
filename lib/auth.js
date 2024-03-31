import { getSession } from 'next-auth/react';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

export default async function getAndVerifyUser(req, method, connection) {
	if (req.method != method) {
		return { code: 405, response: 'Method Not Allowed' };
	}

	try {
		const session = await getSession({ req });

		if (session && session.user) {
			const [[user]] = await connection.execute('SELECT * FROM users WHERE user_id_public = ?', [session.user.id]);
			return { code: 200, response: user };
		} else {
			const token = req.headers.authorization?.replace('Bearer ', '');
			if (!token) {
				return { code: 400, response: 'No authorization token provided' };
			}

			const decoded = jwt.verify(token, process.env.API_SECRET);
			if (!decoded.id) {
				return { code: 401, response: 'Invalid token format' };
			}

			const [[api]] = await connection.execute('SELECT api_id, api_limit, api_used, api_last_used, api_user_id FROM api WHERE api_public_id = ?', [decoded.id]);
			if (!api) {
				return { code: 404, response: 'API not found' };
			}

			if (api.api_used >= 100) {
				return { code: 429, response: 'Max limit reached' };
			}

			await connection.execute('UPDATE api SET api_used = api_used + 1, api_last_used = ? WHERE api_id = ?', [new Date(), api.api_id]);
			let [[user]] = await connection.execute('SELECT * FROM users WHERE user_id = ?', [api.api_user_id]);
			let [calendarsId] = await connection.execute('SELECT calendar_id_public FROM calendars WHERE calendar_user_id = ?', [api.api_user_id]);

			user.calendarsId = calendarsId.map((item) => item.calendar_id_public);
			return { code: 200, response: user };
		}
	} catch (error) {
		if (error instanceof JsonWebTokenError) {
			return { code: 401, response: 'Token Invalid' };
		} else if (error.name === 'TokenExpiredError') {
			return { code: 401, response: 'Token Expired' };
		} else {
			return { code: 401, response: 'Unauthorized' };
		}
	}
}
