import styles from '@/styles/week.module.css';
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
			<div className={styles['week-box']} data-id="1:415">
				<div className={styles['week-days']} data-id="1:416">
					<div className={styles['days-rows']} data-id="1:417">
						{daysOfWeek.map((dayName) => (
							<article key={dayName} className={`${styles['day-title']} ${dayName === 'Saturday' || dayName === 'Sunday' ? styles['day-weekend'] : ''}`} style={{ boxShadow: dayName === 'Saturday' ? 'inset 0px -1px 0px #e0e0e0' : '' }}>
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
									<div className={styles['day-box']} key={dayIndex} style={{ width: 'calc(100%/7)', alignItems: 'center' }}>
										<div className={`${styles['day-current']} ${!isSameMonth(day, currentDate) ? styles['day-not'] : ''} ${day.toDateString() === currentDate.toDateString() ? styles['current-day'] : ''}`}>
											<div className={`${styles['days-names']} inter-semi-bold-white-11px`} style={{ marginTop: '5px', color: 'black' }}>
												{day.getDate()}
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
