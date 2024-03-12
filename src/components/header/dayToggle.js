import styles from '@/styles/header.module.css';

export default function DayToggle({ setSelectedDay, SelectedDay }) {
	const handleInputChange = (event) => {
		const content = event.target.value;
		setSelectedDay(content);
	};

	return (
		<div className={styles.dayToggle}>
			<button onClick={handleInputChange}>{'<'}</button>
			<button>{SelectedDay}</button>
			<button onClick={handleInputChange}>{'>'}</button>
		</div>
	);
}
