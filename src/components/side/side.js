import styles from '@/styles/side.module.css';
import { PersonFill } from 'react-bootstrap-icons';

import { useState, useEffect } from 'react';

export default function Side({ initialDate }) {
	console.log(initialDate);
	const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
	const [currentDate, setCurrentDate] = useState(new Date(initialDate));

	useEffect(() => {
		setCurrentDate(new Date(initialDate));
	}, [initialDate]);

	const getDaysInMonth = (date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0).getDate();

		const firstDayOfWeek = firstDay.getDay();
		const daysArray = [];

		// Days of previous month
		const prevMonthLastDay = new Date(year, month, 0).getDate();
		for (let i = firstDayOfWeek - 1; i >= 0; i--) {
			const day = new Date(year, month - 1, prevMonthLastDay - i);
			day.notInMonth = true;
			daysArray.push(day);
		}

		// Days of current month
		for (let i = 1; i <= lastDay; i++) {
			daysArray.push(new Date(year, month, i));
		}

		// Days of next month
		const lastDayOfWeek = new Date(year, month, lastDay).getDay();
		const remainingDays = 6 - lastDayOfWeek;
		for (let i = 1; i <= remainingDays; i++) {
			const day = new Date(year, month + 1, i);
			day.notInMonth = true;
			daysArray.push(day);
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
		<div className="left-menu-smAq6k" data-id="1:293">
			<div className="top-hDJypf" data-id="1:294">
				<div className={styles['user-box']}>
					<PersonFill className={styles['user-icon']} color="#fff" />
					<span className={styles['user-name']}>Ehouarn Duriaux</span>
				</div>
				<div className="icon-button" data-id="1:299">
					<div className="icon-button-master-fEMv3C icon-button-master" data-id="I1:299;45:4078">
						<img className="icon" data-id="I1:299;45:4078;28:1566" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/icon.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/icon.svg" alt="Icon" />
					</div>
				</div>
			</div>
			<div className={styles['month-box']} data-id="1:300">
				<div className={styles['month-title']} data-id="1:301">
					<h1 className={styles['month-text']}>{currentDate.toLocaleString('default', { month: 'long' })}</h1>
					<h1 className={styles['month-year']}>{currentDate.getFullYear()}</h1>
				</div>
				<div className="arrows" data-id="1:304">
					<img className="chevron-left-tnsQ9a" data-id="1:305" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/chevron-left-1.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/chevron-left-1.svg" alt="chevron-left" onClick={() => changeMonth(-1)} />
					<img className="chevron-right-tnsQ9a" data-id="1:306" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/chevron-right-1.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/chevron-right-1.svg" alt="chevron-right" onClick={() => changeMonth(1)} />
				</div>
			</div>
			<div className="mini-calendar-hDJypf" data-id="1:307">
				<div className="header-nxhxsB header" data-id="1:308">
					{daysOfWeek.map((day, index) => (
						<article className={styles['day-header']} key={index}>
							<div className={`day-${day} valign-text-middle inter-semi-bold-sonic-silver-10px`}>{day}</div>
						</article>
					))}
				</div>
			</div>
			{weeks.map((week, weekIndex) => (
				<div className={styles['week']} key={weekIndex} data-id={`1:${317 + weekIndex * 8}`}>
					{week.map((day, dayIndex) => (
						<div className={styles['day-box']} key={dayIndex}>
							<div className={`${styles.day} ${!isSameMonth(day, currentDate) ? styles['day-not'] : ''} valign-text-middle inter-semi-bold-white-11px`}>{day.getDate()}</div>
							<div className={styles['day-events']}>{/* Assuming your event dots rendering goes here */}</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
}
