import styles from '@/styles/side.module.css';

function formatTime(timeString) {
	const [hours, minutes] = timeString.split(':');
	var formattedHours = hours;
	var formattedMinutes = minutes;
	if (hours != '00') {
		formattedHours = hours < 10 ? `0${hours}` : hours;
	}
	if (minutes != '00') {
		formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	}
	return `${formattedHours}:${formattedMinutes}`;
}

function reformatEvents(events) {
	const eventsByDate = {};

	events.forEach((event) => {
		const date = event.event_date.split('T')[0];
		if (!eventsByDate[date]) {
			eventsByDate[date] = [];
		}
		eventsByDate[date].push({
			event_start: event.event_start,
			event_end: event.event_end,
			event_description: event.event_description,
			event_location: event.event_location,
			event_url: event.event_url,
			event_name: event.event_name,
			calendar_id: event.calendar_id,
			calendar_color: event.color,
		});
	});

	const sortedDates = Object.keys(eventsByDate).sort((a, b) => {
		const dateA = new Date(a);
		const dateB = new Date(b);
		return dateA - dateB;
	});

	const sortedEventsByDate = {};
	sortedDates.forEach((date) => {
		sortedEventsByDate[date] = eventsByDate[date];

		sortedEventsByDate[date].sort((a, b) => {
			const formattedTimeA = formatTime(a.event_start);
			const formattedTimeB = formatTime(b.event_start);

			const timeA = new Date(`1970-01-01T${formattedTimeA}`);
			const timeB = new Date(`1970-01-01T${formattedTimeB}`);

			return timeA - timeB;
		});
	});

	return sortedEventsByDate;
}

export default function Events({ events }) {
	if (JSON.stringify(events) == '{}') {
		return <div style={{ color: '#ffffffb2' }}>No events</div>;
	}
	const formatEvents = reformatEvents(events);

	return (
		<div className={styles['box']}>
			<div className={styles['days']}>
				{Object.keys(formatEvents).map((date, index) => {
					const tomorrow = new Date();
					tomorrow.setDate(tomorrow.getDate() + 1);

					const isToday = new Date(date).getDate() === new Date().getDate() && new Date(date).getMonth() === new Date().getMonth() && new Date(date).getFullYear() === new Date().getFullYear();
					const isTomorrow = new Date(date).getDate() === tomorrow.getDate() && new Date(date).getMonth() === tomorrow.getMonth() && new Date(date).getFullYear() === tomorrow.getFullYear();

					return (
						<div key={index} className={styles['day-events']}>
							<div className={`${styles['day-header']} ${isToday ? styles['day-header-blue'] : ''} ${isTomorrow ? styles['day-header-green'] : ''}`}>
								<div className={styles['left']}>
									<div className={styles['day-header-text']}>{isToday ? 'TODAY' : isTomorrow ? 'TOMORROW' : new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLocaleUpperCase()}</div>
									<div className={styles['day-header-date']}>{date.replaceAll('-', '/')}</div>
								</div>
								<div className={styles['right']}>
									<div className="temp">
										<div className="x55 inter-bold-white-13px">12º</div>
										<div className="x40 inter-normal-white-13px">/10º</div>
									</div>
									<img className="sun-JwFjZH sun" data-id="1:2639" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/sun-1.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/sun-1.svg" alt="sun" />
								</div>
							</div>
							{formatEvents[date].map((event, index) =>
								event.event_start === '00:00' && event.event_end === '00:00' ? (
									<div className={styles['day-event-all']} style={{ backgroundColor: '#' + event.calendar_color }} key={index}>
										<div className="all-hands-company-meeting-kD7TOQ valign-text-middle text-smmedium">{event.event_name}</div>
									</div>
								) : (
									<div className={styles['day-event']} key={index}>
										<div className="meta">
											<div className="ellipse-4-kqTvlq ellipse-4" style={{ backgroundColor: '#' + event.calendar_color }}></div>
											<div className="time-kqTvlq time">
												<div className={styles['day-time']}>
													{(parseInt(event.event_start.split(':')[0]) > 12 ? 'PM' : 'AM') != (parseInt(event.event_end.split(':')[0]) > 12 ? 'PM' : 'AM') ? (
														<span>
															{event.event_start} {parseInt(event.event_start.split(':')[0]) > 12 ? 'PM' : 'AM'} – {event.event_end} {parseInt(event.event_end.split(':')[0]) > 12 ? 'PM' : 'AM'}
														</span>
													) : (
														<span>
															{event.event_start} – {event.event_end} {parseInt(event.event_start.split(':')[0]) > 12 ? 'PM' : 'AM'}
														</span>
													)}
												</div>
												{event.event_url ? (
													<div className="frame-11-xpN6K4 frame-11">
														<img className="video-camera" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-2.svg" alt="video-camera" />
													</div>
												) : (
													<></>
												)}
											</div>
										</div>
										<div className={styles['day-title']}>
											<div className="monthly-catch-up valign-text-middle text-xsmedium">{event.event_name}</div>
										</div>
										<div className={styles['day-location']}>
											{event.event_url ? (
												<>
													{event.event_location} {event.event_location ? '/ ' : ' '}
													<a className={styles['day-event-url']} target="_blank" href={event.event_url}>
														{event.event_url}
													</a>
												</>
											) : (
												<>{event.event_location}</>
											)}
										</div>
									</div>
								)
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
