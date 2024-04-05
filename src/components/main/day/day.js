import styles from '@/styles/day.module.css';
import Events from './events';
import { Gear } from 'react-bootstrap-icons';

export default function Day({ initialDate, events }) {
	const timeRow = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
	return (
		<>
			<Events events={events} initialDate={initialDate} />
			<div style={{ position: 'absolute', bottom: '15px', right: '30px', color: '#71717a', fontSize: '1.4rem' }}>
				<Gear />
			</div>
			<div className={styles['day-box']}>
				<div className={styles['day-days']}>
					<div className={styles['day-rows']}>
						<article key={initialDate} className={`${styles['day-title']} ${new Date(initialDate).toLocaleDateString('en-US', { weekday: 'long' }) === 'Saturday' || new Date(initialDate).toLocaleDateString('en-US', { weekday: 'long' }) === 'Sunday' ? styles['day-weekend'] : ''}`}>
							<div className={`${styles['days-names']} ${styles['days-names']} ${styles['days-names']}  inter-bold-sonic-silver-10px`}>{new Date(initialDate).toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()}</div>
							<div className="x21 valign-text-middle inter-medium-black-22px">{new Date(initialDate).toLocaleDateString('en-US', { day: '2-digit' })}</div>
						</article>
					</div>
					<div className="est-gmt-5-muPwlo valign-text-middle text-xsmedium">
						EST
						<br />
						GMT-5
					</div>
				</div>
				<div className={styles['box-100']}>
					{timeRow.map((time, index) => (
						<div style={{ height: `calc(100% / ${timeRow.length})` }} key={index} className={styles['hour-row']} data-id="1:428">
							<div className="time-BdLsfm valign-text-middle time text-xsmedium" data-id="1:429">
								<span className="time">{time} AM</span>
							</div>
							<div className="blocks">
								<div key={index} className={styles['x60-block']}>
									<div className={styles['x30-block-half']} data-id="1:2308"></div>
									<div className={styles['x30-block']} data-id="1:2307"></div>
								</div>
							</div>
							<div className="time-XwphFF valign-text-middle time text-xsmedium" data-id="1:438">
								{time} AM
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
