import styles from '@/styles/week.module.css';
import Events from './events';

const getDaysInWeek = (date) => {
	const daysArray = [];
	const year = date.getFullYear();
	const month = date.getMonth();
	const dayOfWeek = date.getDay();
	let startOfWeek = date.getDate() - dayOfWeek + 1;
	if (dayOfWeek === 0) startOfWeek -= 7;
	const endOfWeek = startOfWeek + 6;

	for (let i = startOfWeek; i <= endOfWeek; i++) {
		daysArray.push(new Date(year, month, i));
	}

	return daysArray;
};

export default function Week({ initialDate, events }) {
	const daysOfWeek = getDaysInWeek(new Date(initialDate));
	const timeRow = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5];

	return (
		<>
			<Events events={events} />
			<div className={styles['week-box']} data-id="1:415">
				<div className={styles['week-days']} data-id="1:416">
					<div className={styles['days-rows']} data-id="1:417">
						{daysOfWeek.map((day) => (
							<article key={day} className={`${styles['day-title']} ${new Date(day).toLocaleDateString('en-US', { weekday: 'long' }) === 'Saturday' || new Date(day).toLocaleDateString('en-US', { weekday: 'long' }) === 'Sunday' ? styles['day-weekend'] : ''} ${new Date(day).toLocaleDateString('en-US') === new Date().toLocaleDateString('en-US') ? styles['day-today'] : ''}`} style={{ boxShadow: new Date(day).toLocaleDateString('en-US', { weekday: 'long' }) === 'Sunday' ? 'inset 0px -1px 0px #e0e0e0' : '' }}>
								<div className={`${styles['days-names']} ${styles['days-names']} ${styles['days-names']}  inter-bold-sonic-silver-10px`}>{new Date(day).toLocaleDateString('en-US', { weekday: 'long' }).substring(0, 3).toUpperCase()}</div>
								<div className="x21 valign-text-middle inter-medium-black-22px" data-id="1:420">
									{new Date(day).toLocaleDateString('en-US', { day: '2-digit' })}
								</div>
							</article>
						))}
					</div>
					<div className="est-gmt-5-muPwlo valign-text-middle text-xsmedium" data-id="1:427">
						EST
						<br />
						GMT-5
					</div>
				</div>
				<div className={styles['box-100']}>
					{timeRow.map((time, index) => (
						<div style={{ height: `calc(100% / ${timeRow.length})` }} key={index} className={styles['hour-row']} data-id="1:428">
							<div className="time-BdLsfm valign-text-middle time text-xsmedium" data-id="1:429">
								{time} {time < 13 && time > 6 ? 'AM' : 'PM'}
							</div>
							<div className="blocks">
								{daysOfWeek.map((day) => (
									<div key={index} className={`${styles['x60-block']} ${new Date(day).toLocaleDateString('en-US', { weekday: 'long' }) === 'Saturday' || new Date(day).toLocaleDateString('en-US', { weekday: 'long' }) === 'Sunday' ? styles['day-weekend'] : ''} ${new Date(day).toLocaleDateString('en-US') === new Date().toLocaleDateString('en-US') ? styles['day-today'] : ''}`} style={{ boxShadow: new Date(day).toLocaleDateString('en-US', { weekday: 'long' }) === 'Sunday' ? 'inset 0px -1px 0px #e0e0e0' : '' }}>
										<div className={styles['x30-block-half']} data-id="1:2308"></div>
										<div className={styles['x30-block']} data-id="1:2307"></div>
									</div>
								))}
							</div>
							<div className="time-XwphFF valign-text-middle time text-xsmedium" data-id="1:438">
								{time} {time < 13 && time > 6 ? 'AM' : 'PM'}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
