import Head from 'next/head';
import styles from '../styles/settings.module.css';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import { ArrowLeftShort, BoxArrowLeft, CodeSlash, Laptop, Person, Phone, ShieldShaded, Sliders } from 'react-bootstrap-icons';

import Devices from '@/components/settings/devices';

import packageJson from '/package.json';
import Api from '@/components/settings/api';

function MainCircularProgress() {
	const height = 200;
	const circleSize = height * 0.15;

	return (
		<Box sx={{ position: 'relative', margin: 'auto' }}>
			<CircularProgress
				variant="determinate"
				sx={{
					color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 800 : 800],
				}}
				size={circleSize}
				thickness={4}
				height={height}
				value={100}
			/>
			<CircularProgress
				variant="indeterminate"
				sx={{
					color: (theme) => (theme.palette.mode === 'light' ? '#fff' : '#000'),
					animationDuration: '1200ms',
					position: 'absolute',
					left: 0,
					[`& .${circularProgressClasses.circle}`]: {
						strokeLinecap: 'round',
					},
				}}
				size={circleSize}
				thickness={4}
				height={height}
			/>
		</Box>
	);
}

export default function Settings() {
	const { data: session, status } = useSession();

	const router = useRouter();
	const [loading, setIsLoading] = useState(true);
	const [user, setUser] = useState({});
	const [devices, setDevices] = useState({});
	const [page, setPage] = useState('Account');

	const pages = ['Account', 'Security', 'Advanced settings', 'API', 'Devices'];

	useEffect(() => {
		if (status == 'unauthenticated') {
			router.push('/');
		}
	}, [session, status]);

	const handleSwitchPage = (newPage) => {
		setPage(newPage); // Mettez à jour l'état de la page avec la nouvelle page
	};

	useEffect(() => {
		if (status === 'authenticated') {
			const fetchSettings = async () => {
				try {
					const response = await fetch(`/api/settings/get`, {
						headers: { token: session.token, user: session.user.id },
					});
					if (!response.ok) {
						throw new Error('Failed to fetch calendar data');
					}
					const userData = await response.json();
					setUser(userData.user);
					setDevices(userData.devices);
					setIsLoading(false);
				} catch (error) {}
			};

			fetchSettings();
		}
	}, [status]);

	return (
		<>
			<Head>
				<title>Calendar</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="stylesheet" href="/index2.css" />
				<link href="https://fonts.googleapis.com/css2?family=Anta&family=Bebas+Neue&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
			</Head>
			<main>
				<div className={styles.settings}>
					<div className={styles.menu}>
						<div className={styles.list}>
							<div className={styles.title}>
								<ArrowLeftShort className={styles.titleIcon} />
								<div className={styles.titleText}>Settings</div>
							</div>
							<div className={styles.itemList}>
								<div className={styles.rectangle} style={{ top: `calc(50px * ${pages.indexOf(page)})` }}></div>
								<div className={styles.item} onClick={() => handleSwitchPage('Account')}>
									<Person className={styles.itemIcon} />
									<div className={styles.itemText}>Account</div>
								</div>

								<div className={styles.item} onClick={() => handleSwitchPage('Security')}>
									<ShieldShaded className={styles.itemIcon} />
									<div className={styles.itemText}>Security</div>
								</div>

								<div className={styles.item} onClick={() => handleSwitchPage('Advanced settings')}>
									<Sliders className={styles.itemIcon} />
									<div className={styles.itemText}>Advanced settings</div>
								</div>

								<div className={styles.item} onClick={() => handleSwitchPage('API')}>
									<CodeSlash className={styles.itemIcon} />
									<div className={styles.itemText}>API</div>
								</div>

								<div className={styles.item} onClick={() => handleSwitchPage('Devices')}>
									<Laptop className={styles.itemIcon} />
									<div className={styles.itemText}>Devices</div>
								</div>

								<div
									className={styles.item}
									onClick={() => {
										router.push('/');
										signOut();
									}}>
									<BoxArrowLeft className={styles.itemIcon} />
									<div className={styles.itemText}>Logout</div>
								</div>
							</div>
						</div>
						<footer className={styles.footer}>
							{packageJson.name.toUpperCase()} - {packageJson.version}
						</footer>
					</div>
					<div className={styles.content}>
						<div className={styles.pageTitle} data-id="2:764">
							{page}
						</div>

						<hr className={styles.hr} />

						{loading ? (
							<div className={styles.loading}>
								<MainCircularProgress />
							</div>
						) : (
							<>
								{page === 'Account' && (
									<div className={styles.mainBox}>
										<div className={styles.mainItem}>
											<div className={styles.mainItemText}>Name</div>
											<div className={styles.mainItemContent}>{user.user_name && user.user_name}</div>
										</div>

										<div className={styles.mainItem}>
											<div className={styles.mainItemText}>Username</div>
											<div className={styles.mainItemContent}>{user.user_username && user.user_username}</div>
										</div>

										<div className={styles.mainItem}>
											<div className={styles.mainItemText}>Email</div>
											<div className={styles.mainItemContent}>{user.user_email && user.user_email}</div>
										</div>

										<div className={styles.mainItem}>
											<div className={styles.mainItemText}>Company</div>
											<div className={styles.mainItemContent}>{user.user_company && user.user_company}</div>
										</div>

										<div className={styles.mainItem}>
											<div className={styles.mainItemText}>Date of birth</div>
											<div className={styles.mainItemContent}>18 january 1999</div>
											<div className={styles.mainItemEdit}>edit</div>
										</div>
									</div>
								)}

								{page === 'Devices' && <Devices devices={devices} />}
								{page === 'API' && <Api />}
							</>
						)}
					</div>
				</div>
			</main>
		</>
	);
}
