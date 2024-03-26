import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import { useMediaQuery } from 'react-responsive';
import { useSession, signIn, signOut } from 'next-auth/react';

import styles from '@/styles/loading.module.css';

import packageJson from '/package.json';

function MainCircularProgress() {
	const height = 200;
	const circleSize = height * 0.15;

	return (
		<Box sx={{ position: 'relative', margin: 'auto', height: '100%' }}>
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

export default function Loading({ loadingText }) {
	const { data: session, status } = useSession();

	const isMobile = useMediaQuery({ maxWidth: 567 });

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#000' }}>
			<Box sx={{ height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<img src="/logo.png" alt="Loading Image" style={{ width: '25vh', margin: 'auto', position: 'relative', marginTop: '35vh' }} />
			</Box>
			<Box sx={{ height: '15vh', display: 'flex', flexDirection: 'column', color: 'white' }}>
				{(() => {
					switch (loadingText) {
						case 'load':
							return <MainCircularProgress height={isMobile ? 200 : 250} />;
						case 'unauthenticated':
							return (
								<button className={styles['button']} onClick={signIn}>
									Sign In
								</button>
							);
						case 'authenticated':
							return (
								<span>
									Connect as <strong>{session ? session.user.name : null}</strong>
								</span>
							);
						default:
							return <MainCircularProgress height={isMobile ? 200 : 250} />;
					}
				})()}
			</Box>
			<Box sx={{ height: '10vh', color: '#fff', textAlign: 'center', marginTop: 'auto', fontWeight: '600', color: '#fff' }}>
				<footer>
					{packageJson.name.toUpperCase()} - {packageJson.version}
				</footer>
			</Box>
		</Box>
	);
}
