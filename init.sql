CREATE TABLE IF NOT EXISTS calendars (
	calendar_id int NOT NULL UNIQUE AUTO_INCREMENT,
	calendar_name varchar(50) NOT NULL,
	calendar_id_public varchar(50) NOT NULL,
	calendar_color varchar(8) NOT NULL,
	calendar_user_id INT NOT NULL,
	PRIMARY KEY (calendar_id)
);

CREATE TABLE IF NOT EXISTS users (
	user_id int NOT NULL UNIQUE AUTO_INCREMENT,
	user_id_public varchar(50) NOT NULL,
	user_email varchar(50) NOT NULL,
	user_username varchar(50) NOT NULL,
	user_image varchar(255) NOT NULL,
	user_provider varchar(30) NOT NULL,
	user_company varchar(30) NOT NULL,
	user_name varchar(150) NOT NULL,
	PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS events (
	event_id int NOT NULL UNIQUE AUTO_INCREMENT,
	event_start varchar(10) NOT NULL,
	event_end varchar(10) NOT NULL,
	event_description varchar(150),
	event_date date NOT NULL,
	event_location varchar(50),
	event_url varchar(50),
	event_name varchar(50) NOT NULL,
	calendar_id int NOT NULL,
	PRIMARY KEY (event_id)
);

CREATE TABLE IF NOT EXISTS devices (
	devices_id int NOT NULL UNIQUE AUTO_INCREMENT,
	devices_ip varchar(100),
	devices_os_name varchar(100),
	devices_os_version varchar(100),
	devices_vendor varchar(100),
	devices_browser_name varchar(100),
	devices_browser_version varchar(100),
	devices_user_id INT NOT NULL,
	PRIMARY KEY (devices_id)
);

ALTER TABLE calendars ADD CONSTRAINT calendars_fk3 FOREIGN KEY (calendar_user_id) REFERENCES users(user_id);

ALTER TABLE devices ADD CONSTRAINT devices_fk3 FOREIGN KEY (devices_user_id) REFERENCES users(user_id);

ALTER TABLE events ADD CONSTRAINT events_fk8 FOREIGN KEY (calendar_id) REFERENCES calendars(calendar_id);
