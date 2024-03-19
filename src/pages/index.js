import Head from 'next/head';
import styles from '../styles/index.module.css';
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Loading from '@/components/loading';

import HeaderComponents from '@/components/header/header';
import Week from '@/components/main/week/week';
import Side from '@/components/side/side';

function formatTime(timeString) {
	const [hours, minutes] = timeString.split(':');
	var formattedHours = hours;
	var formattedMinutes = minutes;
	if (hours != '00' && hours.length != 2) {
		formattedHours = hours < 10 ? `0${hours}` : hours;
	}
	if (minutes != '00' && minutes.length != 2) {
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

		sortedEventsByDate[date].forEach((item) => {
			console.log('formatTime(item.event_start);', formatTime(item.event_start));
			console.log('formatTime(item.event_end);', formatTime(item.event_end));
			item.event_start = formatTime(item.event_start);
			item.event_end = formatTime(item.event_end);
		});
	});

	return sortedEventsByDate;
}

export default function Home() {
	const { data: session, status } = useSession();

	const [loading, setIsLoading] = useState(true);
	const [loadingText, setLoadingText] = useState('load');

	const [calendarsLists, setCalendarsLists] = useState({});
	const [eventsLists, setEventsLists] = useState({});

	const [calendarsWeek, setCalendarsWeek] = useState({});
	const [eventsWeek, setEventsWeek] = useState({});

	const [calendarsLite, setCalendarsLite] = useState({});
	const [eventsLite, setEventsLite] = useState({});

	const [searchContent, setSearchContent] = useState('');
	const [selectedMenu, setSelectedMenu] = useState('Week');
	const [selectedDay, setSelectedDay] = useState(0);

	useEffect(() => {
		if (status == 'loading') {
			setLoadingText('load');
		}

		if (status == 'unauthenticated') {
			setInterval(() => {
				setLoadingText('unauthenticated');
			}, 1000);
		}

		if (status == 'authenticated') {
			setInterval(() => {
				setLoadingText('authenticated');
			}, 1000);

			setInterval(() => {
				setIsLoading(false);
			}, 2000);
		}
	}, [session, status]);

	useEffect(() => {
		console.log(searchContent, selectedMenu, selectedDay);
	}, [searchContent, selectedMenu, selectedDay]);

	// useEffect(() => {
	// 	if (status == 'authenticated') {
	// 		fetch(`/api/create`, { method: 'POST', headers: { token: session.token, user: session.user.id }, body: JSON.stringify({ from: '02-20-204', to: '02-20-2024', timeFrom: '12:00', timeTo: '16:00' }) });
	// 	}
	// }, [status]);

	useEffect(() => {
		if (status === 'authenticated') {
			const fetchWeek = async () => {
				try {
					const response = await fetch(`/api/get/week/${session.user.calendarId.join(':')}?date=${new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-')}`, {
						headers: { token: session.token, user: session.user.id },
					});
					if (!response.ok) {
						throw new Error('Failed to fetch calendar data');
					}
					const calendarData = await response.json();
					setCalendarsWeek(calendarData.calendars);
					const formatEvents = reformatEvents(calendarData.events);
					setEventsWeek(formatEvents);
				} catch (error) {
					console.error('Error fetching calendar data:', error);
				}
			};

			fetchWeek();
		}
	}, [status]);

	useEffect(() => {
		if (status === 'authenticated') {
			const fetchLite = async () => {
				try {
					const response = await fetch(`/api/get/lite/${session.user.calendarId.join(':')}?date=${new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-')}`, {
						headers: { token: session.token, user: session.user.id },
					});
					if (!response.ok) {
						throw new Error('Failed to fetch calendar data');
					}
					const calendarData = await response.json();
					setCalendarsLite(calendarData.calendars);
					const formatEvents = reformatEvents(calendarData.events);
					console.log('formatEvents', formatEvents);
					setEventsLite(formatEvents);
				} catch (error) {
					console.error('Error fetching calendar data:', error);
				}
			};

			fetchLite();
		}
	}, [status]);

	useEffect(() => {
		if (status === 'authenticated') {
			const fetchLists = async () => {
				try {
					const response = await fetch(`/api/get/lists/${session.user.calendarId.join(':')}?date=${new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-')}`, {
						headers: { token: session.token, user: session.user.id },
					});
					if (!response.ok) {
						throw new Error('Failed to fetch calendar data');
					}
					const calendarData = await response.json();
					setCalendarsLists(calendarData.calendars);
					const formatEvents = reformatEvents(calendarData.events);
					setEventsLists(formatEvents);
				} catch (error) {
					console.error('Error fetching calendar data:', error);
				}
			};

			fetchLists();
		}
	}, [status]);

	return (
		<>
			<Head>
				<title>Calendar</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="stylesheet" href="index.css" />
				<link href="https://fonts.googleapis.com/css2?family=Anta&family=Bebas+Neue&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
			</Head>
			<main className={`${styles.main} ${loading ? '' : 'zoom'}`}>
				{loading ? (
					<Loading loadingText={loadingText} />
				) : (
					<>
						<div class="container-center-horizontal">
							<div class="fantastical screen calendar" data-id="1:292">
								<Side calendars={calendarsLists} initialDate={new Date()} events={eventsLists} eventsLite={eventsLite} />
								<div class="calendar-base-smAq6k">
									<HeaderComponents setSearchContent={setSearchContent} setSelectedMenu={setSelectedMenu} setSelectedDay={setSelectedDay} selectedDay={selectedDay} selectedMenu={selectedMenu} />
									{selectedMenu == 'Week' ? <Week initialDate={new Date()} events={eventsWeek} /> : selectedMenu == 'Month' ? <Month initialDate={new Date()} events={eventsWeek} /> : ''}
								</div>
							</div>
						</div>
					</>
				)}
			</main>
		</>
	);
}
