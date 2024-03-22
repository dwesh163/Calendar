import styles from '@/styles/month.module.css';
import { useEffect, useState } from 'react';

export default function Month({ initialDate, events }) {
	const [currentDate, setCurrentDate] = useState(new Date(initialDate));
	const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	useEffect(() => {
		setCurrentDate(new Date(initialDate));
	}, [initialDate]);
	const getDaysInMonth = (date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDay = new Date(year, month, 0);
		const lastDay = new Date(year, month + 1, 0).getDate();

		const firstDayOfWeek = firstDay.getDay();
		const daysArray = [];

		const prevMonthLastDay = new Date(year, month, 0).getDate();
		for (let i = firstDayOfWeek - 1; i >= 0; i--) {
			const day = new Date(year, month - 1, prevMonthLastDay - i);
			day.notInMonth = true;
			daysArray.push(day);
		}

		for (let i = 1; i <= lastDay; i++) {
			daysArray.push(new Date(year, month, i));
		}

		const lastDayOfWeek = new Date(year, month, lastDay).getDay();
		if (lastDayOfWeek != 0) {
			const remainingDays = 7 - lastDayOfWeek;
			for (let i = 1; i <= remainingDays; i++) {
				const day = new Date(year, month + 1, i);
				day.notInMonth = true;
				daysArray.push(day);
			}
		}

		return daysArray;
	};

	const weeks = [];
	const daysInMonth = getDaysInMonth(currentDate);
	for (let i = 0; i < daysInMonth.length; i += 7) {
		weeks.push(daysInMonth.slice(i, i + 7));
	}

	const isSameMonth = (date1, date2) => {
		return date1.getMonth() === date2.getMonth();
	};

	const changeMonth = (increment) => {
		const newDate = new Date(currentDate);
		newDate.setMonth(newDate.getMonth() + increment);
		setCurrentDate(newDate);
	};

	return (
		<>
			<div className={styles['month-box']}>
				<div className={styles['month-days']}>
					<div className={styles['days-rows']}>
						{daysOfWeek.map((dayName) => (
							<article key={dayName} className={`${styles['day-title']} ${dayName === 'Saturday' || dayName === 'Sunday' ? styles['day-weekend'] : ''}`} style={{ boxShadow: dayName === 'Sunday' ? 'inset 0px -1px 0px #e0e0e0' : '' }}>
								<div className={`${styles['days-names']} inter-bold-sonic-silver-10px`}>{dayName}</div>
							</article>
						))}
					</div>
				</div>
				<div className={styles['box-100']}>
					{weeks.map((week, weekIndex) => (
						<div className={styles['week']} key={weekIndex} style={{ display: 'flex', justifyContent: 'space-between', height: 'calc(100%/5)' }}>
							{week.map((day, dayIndex) => {
								return (
									<div className={`${styles['day-box']} ${!isSameMonth(day, currentDate) ? styles['day-not'] : ''} ${day.toDateString() === new Date().toDateString() ? styles['current-day'] : ''}`} key={dayIndex} style={{ width: 'calc(100%/7)', alignItems: 'center', boxShadow: day.getDay() === 0 ? 'inset 0px -1px 0px #e0e0e0' : '' }}>
										<div className={`${styles['day-current']}`}>
											<div className="x2-GXxlPI inter-medium-mountain-mist-21px" data-id="1:748">
												{day.getDate()}
											</div>
											<div className="frame-14" data-id="1:1221">
												{events[`${day.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-').split('-')[2]}-${day.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-').split('-')[0]}-${day.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-').split('-')[1]}`] ? (
													<>
														{events[`${day.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-').split('-')[2]}-${day.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-').split('-')[0]}-${day.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-').split('-')[1]}`].map((eventName, index) => (
															<article key={index} className="tags-pdNVtl tags" data-id="1:1223">
																<div className="orange-tag inter-medium-sunshade-14px" style={{ backgroundColor: '#' + eventName.calendar_color + '3c', color: '#' + eventName.calendar_color, fontStyle: 'normal', fontWeight: '500' }}>
																	{eventName.event_name}
																</div>
															</article>
														))}
													</>
												) : (
													<></>
												)}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					))}
				</div>
			</div>
		</>
	);
}
