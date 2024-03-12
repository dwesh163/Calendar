import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import { useMediaQuery } from 'react-responsive';

import packageJson from '/package.json';

function MainCircularProgress(props) {
	const { height } = props;
	const circleSize = height * 0.15; // 15% of the provided height

	return (
		<Box sx={{ position: 'relative', margin: 'auto', height: '100%' }}>
			<CircularProgress
				variant="determinate"
				sx={{
					color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 800 : 800],
				}}
				size={circleSize}
				thickness={4}
				{...props}
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
				{...props}
			/>
		</Box>
	);
}

export default function Loading() {
	const isMobile = useMediaQuery({ maxWidth: 567 });

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#000' }}>
			<Box sx={{ height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<img src="/logo.png" alt="Loading Image" style={{ width: '30vh', margin: 'auto', position: 'relative', marginTop: '30vh' }} />
			</Box>
			<Box sx={{ height: '15vh' }}>
				<MainCircularProgress height={isMobile ? 200 : 250} />
			</Box>
			<Box sx={{ height: '10vh', color: '#fff', textAlign: 'center', marginTop: 'auto', fontWeight: '600' }}>
				<footer>
					{packageJson.name.toUpperCase()} - {packageJson.version}
				</footer>
			</Box>
		</Box>
	);
}
