import styles from '@/styles/side.module.css';
import { PersonFill, BoxArrowInLeft } from 'react-bootstrap-icons';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Events from './events';

export default function Side({ calendars, initialDate, events, eventsLite }) {
	const { data: session, status } = useSession();

	const [isHovered, setIsHovered] = useState(false);

	const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
	const [currentDate, setCurrentDate] = useState(new Date(initialDate));

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
		<div className="left-menu-smAq6k">
			<div className="top-hDJypf">
				<div className={styles['user-box']} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={signOut}>
					{isHovered ? (
						<span style={{ cursor: isHovered ? 'pointer' : '', display: 'flex', alignItems: 'center' }}>
							<BoxArrowInLeft className={styles['user-icon']} color="#fff" />
							<span className={styles['user-name']}>Sign Out</span>
						</span>
					) : (
						<>
							<PersonFill className={styles['user-icon']} color="#fff" />
							<span className={styles['user-name']}>{session ? session.user.name : ''}</span>
						</>
					)}
				</div>

				<div className="icon-button">
					<div className="icon-button-master-fEMv3C icon-button-master" data-id="I1:299;45:4078">
						<img className="icon" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/icon.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/icon.svg" alt="Icon" />
					</div>
				</div>
			</div>
			<div className={styles['main-box']}>
				<div className={styles['month-box']}>
					<div className={styles['month-title']}>
						<h1 className={styles['month-text']}>{currentDate.toLocaleString('default', { month: 'long' })}</h1>
						<h1 className={styles['month-year']}>{currentDate.getFullYear()}</h1>
					</div>
					<div className="arrows" data-id="1:304">
						<img className="chevron-left-tnsQ9a" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/chevron-left-1.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/chevron-left-1.svg" alt="chevron-left" onClick={() => changeMonth(-1)} />
						<img className="chevron-right-tnsQ9a" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/chevron-right-1.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/chevron-right-1.svg" alt="chevron-right" onClick={() => changeMonth(1)} />
					</div>
				</div>
				<div className="mini-calendar-hDJypf">
					<div className="header-nxhxsB header">
						{daysOfWeek.map((day, index) => (
							<article className={styles['week-header']} key={index}>
								<div className={`day-${day} valign-text-middle inter-semi-bold-sonic-silver-10px`}>{day}</div>
							</article>
						))}
					</div>
				</div>
				{weeks.map((week, weekIndex) => (
					<div className={styles['week']} key={weekIndex}>
						{week.map((day, dayIndex) => {
							const eventsForDay = eventsLite[`${new Date(day).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-').split('-')[2]}-${new Date(day).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-').split('-')[0]}-${new Date(day).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-').split('-')[1]}`] || [];
							return (
								<div className={styles['day-box']} key={dayIndex}>
									{new Date().getDate() === day.getDate() && new Date().getMonth() === day.getMonth() && new Date().getFullYear() === day.getFullYear() ? (
										<div class={styles['day-current']} style={{ height: eventsForDay == [] ? '33px' : '38px' }}>
											<div className={`${!isSameMonth(day, currentDate) ? styles['day-not'] : ''} valign-text-middle inter-semi-bold-white-11px`} style={{ marginTop: '5px' }}>
												{day.getDate()}
											</div>
											<div className={styles['day-header-events']}>
												{eventsForDay.slice(0, 4).map((event, index) => (
													<div class={styles['event-point']} style={{ backgroundColor: 'white' }} key={index} data-id="1:2650"></div>
												))}
											</div>
										</div>
									) : (
										<>
											<div className={` ${!isSameMonth(day, currentDate) ? styles['day-not'] : ''} valign-text-middle inter-semi-bold-white-11px`}>{day.getDate()}</div>
											<div className={styles['day-header-events']}>
												{eventsForDay.slice(0, 4).map((event, index) => (
													<div class={styles['event-point']} style={{ backgroundColor: '#' + event.calendar_color }} key={index} data-id="1:2650"></div>
												))}
											</div>
										</>
									)}
								</div>
							);
						})}
					</div>
				))}
			</div>

			<Events events={events} />
		</div>
	);
}
