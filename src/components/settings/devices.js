import React from 'react';
import styles from '@/styles/settings.module.css';
import { Android2, Apple, PcDisplay, Phone, Ubuntu, Windows } from 'react-bootstrap-icons';

const DeviceInfo = ({ device, last }) => {
	const getDeviceIcon = (osName, vendor) => {
		switch (osName.toLowerCase()) {
			case 'ubuntu':
				return <PcDisplay />;
			case 'ios':
				return <Phone />;
			case 'android':
				return <Phone />;
			default:
				return <PcDisplay />;
		}
	};

	const getIcon = (osName, vendor) => {
		switch (osName.toLowerCase()) {
			case 'ubuntu':
				return <Ubuntu />;
			case 'ios':
				return <Apple />;
			case 'android':
				return <Android2 />;
			case 'window':
				return <Windows />;
			default:
				return;
		}
	};

	return (
		<div className={styles.deviceInfo} style={{ borderBottom: last ? 'none' : '' }}>
			<div className={styles.deviceIcon}>{getDeviceIcon(device.devices_os_name, device.devices_vendor)}</div>
			<div>
				<div>
					<span className={styles.deviceOsName}>
						{/* <span className={styles.deviceOsIcon}>{getIcon(device.devices_os_name)}</span> */}
						{device.devices_os_name} {device.devices_os_version}
					</span>{' '}
					<span className={styles.deviceBrowserName}>{device.devices_browser_name}</span>
				</div>
			</div>
			<button className={styles.deviceDisconnect}>delete</button>
		</div>
	);
};

export default function Devices({ devices }) {
	return (
		<div className={styles.mainBox}>
			<div className={styles.deviceBorder}>
				{devices.map((device, index) => (
					<DeviceInfo key={'device-' + index} device={device} last={index == devices.length - 1} />
				))}
			</div>
		</div>
	);
}
