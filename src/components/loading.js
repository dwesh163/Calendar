import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';

import packageJson from '/package.json';

function MainCircularProgress(props) {
	return (
		<Box sx={{ position: 'relative', margin: 'auto' }}>
			<CircularProgress
				variant="determinate"
				sx={{
					color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 800 : 800],
				}}
				size={40}
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
				size={40}
				thickness={4}
				{...props}
			/>
		</Box>
	);
}

export default function Loading() {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#000' }}>
			<Box sx={{ height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<img src="/logo.png" alt="Loading Image" style={{ height: '100vh', width: '100vh', margin: 'auto', position: 'relative', marginTop: '-10vh' }} />
			</Box>
			<Box sx={{ height: '10vh' }}>
				<MainCircularProgress />
			</Box>
			<Box sx={{ height: '10vh', color: '#fff', textAlign: 'center', marginTop: 'auto', fontWeight: '600' }}>
				<footer>
					{packageJson.name.toUpperCase()} - {packageJson.version}
				</footer>
			</Box>
		</Box>
	);
}
