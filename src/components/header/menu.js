import styles from '@/styles/header.module.css';

export default function Menu({ setSelectedMenu }) {
	const choice = ['Day', 'Week', 'Month', 'Year'];

	const handleInputChange = (event) => {
		const content = event.target.value;
		setSelectedMenu(content);
	};

	return (
		<div className={styles.menu}>
			{choice.map((key, index) => (
				<button key={index} className={styles.buttonMenu}>
					{key}
				</button>
			))}
		</div>
	);
}
