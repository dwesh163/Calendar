import React, { useState, useEffect } from 'react';
import styles from '@/styles/settings.module.css';

export default function Api() {
	const [apis, setApis] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchApis();
	}, []);

	const fetchApis = async () => {
		try {
			const response = await fetch('/api/settings/get/api');
			if (!response.ok) {
				throw new Error('Failed to fetch APIs');
			}
			const data = await response.json();
			setApis(data);
			setLoading(false);
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	};

	const handleCreateApiKey = async () => {
		console.log(apis.length);
		if (apis.length == 5) {
			setError('API limit reached');
			return;
		}
		try {
			const response = await fetch('/api/settings/create/api', {
				method: 'POST',
			});
			if (!response.ok) {
				throw new Error('Failed to create API key');
			}
			const data = await response.json();
			setApis([...apis, data]);
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className={styles.mainBox}>
			<button onClick={handleCreateApiKey}>Create API Key</button>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{apis == [] && <p>no apis</p>}
			{apis.map((api, index) => (
				<>
					<div key={index}>{api.api_key}</div>
					<div key={index}>{new Date(api.api_date_created).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</div>
					<br />
				</>
			))}
		</div>
	);
}
