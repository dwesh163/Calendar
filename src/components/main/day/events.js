import styles from '@/styles/dayEvents.module.css';
import { useEffect, useState } from 'react';

export default function Events({ events, initialDate }) {
	const [currentTimePercentage, setCurrentTimePercentage] = useState();
	const timeStartDay = new Date().setHours(7, 0);
	const timeEndDay = new Date().setHours(18, 0);
	const totalDayDurationMinutes = (timeEndDay - timeStartDay) / (1000 * 60);

	useEffect(() => {
		const currentHour = new Date().getHours();
		const currentMinute = new Date().getMinutes();
		setCurrentTimePercentage((((currentHour - 7) * 60 + currentMinute) / totalDayDurationMinutes) * 100);
	}, [new Date().getMinutes()]);

	let dayOfWeek = initialDate.getDay();
	let day = `${initialDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-').split('-')[2]}-${initialDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-').split('-')[0]}-${initialDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-').split('-')[1]}`;

	if (dayOfWeek === 0) {
		dayOfWeek = 7;
	}
	dayOfWeek -= 1;

	if (events[day] == undefined) {
		return (
			<div className={styles.container}>
				<hr className={styles.currentTimeLine} style={{ top: `${currentTimePercentage}%` }} />
				<div className={styles.weekEvents}>
					<span></span>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<hr className={styles.currentTimeLine} style={{ top: `${currentTimePercentage}%` }} />
			<div className={styles.weekEvents}>
				<span>
					{events[day].map((eventData, index) => {
						const currentDate = new Date();
						const [startHour, startMinute] = eventData.event_start.split(':');
						const [endHour, endMinute] = eventData.event_end.split(':');

						const eventStartTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), startHour, startMinute);
						const eventEndTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), endHour, endMinute);
						const eventDurationMinutes = (eventEndTime - eventStartTime) / (1000 * 60);
						const heightPercentage = (eventDurationMinutes / totalDayDurationMinutes) * 100;
						const StartTimePercentage = ((parseInt(startHour - 7) * 60 + parseInt(startMinute)) / totalDayDurationMinutes) * 100;

						return (
							<div key={`event-${index}`} className={styles.event} style={{ height: `${heightPercentage}%`, top: `calc(${StartTimePercentage}% - 2px)`, backgroundColor: `#${eventData.calendar_color}1c` }}>
								<div className={styles.bar} style={{ backgroundColor: `#${eventData.calendar_color}` }}>
									<div className={styles.body} style={{ width: '10vw' }}>
										<div className={styles.time}>
											<div className={styles.startTime} style={{ color: `#${eventData.calendar_color}` }}>
												{eventData.event_start}
											</div>
											<div className={styles.ampm} style={{ color: `#${eventData.calendar_color}` }}>
												AM
											</div>
										</div>
										<div className={styles.eventName} style={{ color: `#${eventData.calendar_color}` }}>
											{eventData.event_name}
										</div>
										<div className={styles.eventDescription} style={{ color: `#${eventData.calendar_color}`, fontStyle: 'italic' }}>
											{eventData.event_description}
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</span>
			</div>
		</div>
	);
}
