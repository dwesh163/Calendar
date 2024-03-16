export const dbConfig = {
	host: process.env.MYSQL_HOST || 'localhost',
	port: process.env.MYSQL_PORT || 3201,
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || 'password',
	database: process.env.MYSQL_DATABASE || 'my_database',
};
