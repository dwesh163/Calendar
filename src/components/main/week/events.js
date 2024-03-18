import styles from '@/styles/week.module.css';
import { useEffect, useState } from 'react';

export default function Events({ events }) {
	const [currentTimePercentage, setCurrentTimePercentage] = useState();
	const timeStartDay = new Date().setHours(7, 0);
	const timeEndDay = new Date().setHours(18, 0);
	const totalDayDurationMinutes = (timeEndDay - timeStartDay) / (1000 * 60);

	useEffect(() => {
		setCurrentTimePercentage(((parseInt(new Date().getHours() - 7) * 60 + parseInt(new Date().getMinutes())) / totalDayDurationMinutes) * 100);
		console.log(currentTimePercentage);
	}, [new Date().getMinutes()]);

	return (
		<div style={{ position: 'absolute', width: 'calc(100% - 16px - 16px - 4vw - 4vw)', marginLeft: '4vw', marginRight: '10px', marginTop: '112px', height: 'calc(100% - 155px - 2px)' }}>
			<hr style={{ position: 'relative', zIndex: '3', margin: '0', color: '#2598ff', top: currentTimePercentage + '%', opacity: '0.6' }} />
			<div className="week-events" data-id="1:292" style={{ position: 'relative', zIndex: '2', height: '100%' }}>
				{Object.keys(events).map((key, index) => {
					let dayOfWeek = new Date(key).getDay();

					if (dayOfWeek === 0) {
						dayOfWeek = 7;
					}
					dayOfWeek -= 1;

					return (
						<>
							{events[key].map((eventData, index) => {
								const currentDate = new Date();

								const [startHour, startMinute] = eventData.event_start.split(':');
								const [endHour, endMinute] = eventData.event_end.split(':');

								const eventStartTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), startHour, startMinute);
								const eventEndTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), endHour, endMinute);
								const eventDurationMinutes = (eventEndTime - eventStartTime) / (1000 * 60);
								const heightPercentage = (eventDurationMinutes / totalDayDurationMinutes) * 100;
								const StartTimePercentage = ((parseInt(startHour - 7) * 60 + parseInt(startMinute)) / totalDayDurationMinutes) * 100;
								console.log('heightPercentage', heightPercentage);
								console.log('StartTimePercentage', eventData);

								return (
									<div key={`event:${index}`} className="event-smAq6k event" style={{ left: `calc((100%/7) * ${dayOfWeek})`, width: 'calc(100%/7)', height: `${heightPercentage}%`, top: 'calc(' + StartTimePercentage + '% - 2px)', backgroundColor: '#' + eventData.calendar_color + '1c' }}>
										<div className="bar-xiYxnB bar" style={{ backgroundColor: '#' + eventData.calendar_color }}>
											<div className="body" style={{ width: '10vw' }}>
												<div className="time-ULMe0a time">
													<div className="end-79QYEA valign-text-middle end text-xsmedium" style={{ color: '#' + eventData.calendar_color }}>
														{eventData.event_start}
													</div>
													<div className="ampm-79QYEA valign-text-middle ampm text-xsmedium" style={{ color: '#' + eventData.calendar_color }}>
														AM
													</div>
													<div className="frame-11-79QYEA frame-11">
														<img className="video-camera" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera.svg" alt="video-camera" />
													</div>
												</div>
												<div className="end-kxzoJR valign-text-middle end inter-semi-bold-allports-12px " style={{ color: '#' + eventData.calendar_color, marginTop: '4px' }}>
													{eventData.event_name}
												</div>
												<div className="ampm-79QYEA valign-text-middle end inter-semi-bold-allports-12px " style={{ color: '#' + eventData.calendar_color, marginTop: '10px', fontStyle: 'italic' }}>
													{eventData.event_description}
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</>
					);
				})}

				{/* <div className="event-smAq6k event" data-id="1:449">
					<div className="bar-xiYxnB bar" data-id="1:450"></div>
					<div className="body" data-id="1:451">
						<div className="time-ULMe0a time" data-id="1:452">
							<div className="end-79QYEA valign-text-middle end text-xsmedium" data-id="1:453">
								8:00
							</div>
							<div className="ampm-79QYEA valign-text-middle ampm text-xsmedium" data-id="1:454">
								AM
							</div>
							<div className="frame-11-79QYEA frame-11" data-id="1:455">
								<img className="video-camera" data-id="1:456" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera.svg" alt="video-camera" />
							</div>
						</div>
						<div className="end-ULMe0a valign-text-middle end inter-semi-bold-allports-12px" data-id="1:457">
							Monday Wake-Up Hour
						</div>
					</div>
				</div>
				<div className="event-0sRouZ event" data-id="1:458">
					<div className="bar-yS2XRe bar" data-id="I1:458;1:450"></div>
					<div className="body" data-id="I1:458;1:451">
						<div className="time-V0Ie8k time" data-id="I1:458;1:452">
							<div className="end-mZWcjN valign-text-middle end text-xsmedium" data-id="I1:458;1:453">
								9:00
							</div>
							<div className="ampm-mZWcjN valign-text-middle ampm text-xsmedium" data-id="I1:458;1:454">
								AM
							</div>
						</div>
						<div className="end-V0Ie8k valign-text-middle end inter-semi-bold-allports-12px" data-id="I1:458;1:457">
							All-Team Kickoff
						</div>
					</div>
				</div>
				<div className="event-YOjxeX event" data-id="1:459">
					<div className="bar-55SefE bar" data-id="I1:459;1:450"></div>
					<div className="body" data-id="I1:459;1:451">
						<div className="time-kxzoJR time" data-id="I1:459;1:452">
							<div className="end-jgM0xz valign-text-middle end text-xsmedium" data-id="I1:459;1:453">
								10:00
							</div>
							<div className="ampm-jgM0xz valign-text-middle ampm text-xsmedium" data-id="I1:459;1:454">
								AM
							</div>
							<div className="frame-11-jgM0xz frame-11" data-id="I1:459;1:455">
								<img className="video-camera" data-id="I1:459;1:456" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-16.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-16.svg" alt="video-camera" />
							</div>
						</div>
						<div className="end-kxzoJR valign-text-middle end inter-semi-bold-allports-12px" data-id="I1:459;1:457">
							Financial Update
						</div>
					</div>
				</div>
				<div className="event-Brsuvr event" data-id="1:460">
					<div className="bar-7nE4MD bar" data-id="I1:460;1:450"></div>
					<div className="body" data-id="I1:460;1:451">
						<div className="time-vJv6eA time" data-id="I1:460;1:452">
							<div className="end-l3sjXE valign-text-middle end text-xsmedium" data-id="I1:460;1:453">
								11:00
							</div>
							<div className="ampm-l3sjXE valign-text-middle ampm text-xsmedium" data-id="I1:460;1:454">
								AM
							</div>
						</div>
						<p className="end-vJv6eA valign-text-middle end inter-semi-bold-purple-heart-12px" data-id="I1:460;1:457">
							🍔 New Employee Welcome Lunch!
						</p>
					</div>
				</div>
				<div className="event-eW9UQj event" data-id="1:461">
					<div className="bar-daVwTK bar" data-id="I1:461;1:450"></div>
					<div className="body" data-id="I1:461;1:451">
						<div className="time-Rwakzd time" data-id="I1:461;1:452">
							<div className="end-Xq7cZA valign-text-middle end text-xsmedium" data-id="I1:461;1:453">
								1:00
							</div>
							<div className="ampm-Xq7cZA valign-text-middle ampm text-xsmedium" data-id="I1:461;1:454">
								PM
							</div>
							<div className="frame-11-Xq7cZA frame-11" data-id="I1:461;1:455">
								<img className="video-camera" data-id="I1:461;1:456" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-16.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-16.svg" alt="video-camera" />
							</div>
						</div>
						<div className="end-Rwakzd valign-text-middle end inter-semi-bold-allports-12px" data-id="I1:461;1:457">
							Design Review
						</div>
					</div>
				</div>
				<div className="event-M5zoya event" data-id="1:462">
					<div className="bar-REYeOU bar" data-id="I1:462;1:450"></div>
					<div className="body" data-id="I1:462;1:451">
						<div className="time-NIGCBy time" data-id="I1:462;1:452">
							<div className="end-EMlLDy valign-text-middle end text-xsmedium" data-id="I1:462;1:453">
								1:00
							</div>
							<div className="ampm-EMlLDy valign-text-middle ampm text-xsmedium" data-id="I1:462;1:454">
								PM
							</div>
							<div className="frame-11-EMlLDy frame-11" data-id="I1:462;1:455">
								<img className="video-camera" data-id="I1:462;1:456" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-18.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-18.svg" alt="video-camera" />
							</div>
						</div>
						<div className="end-NIGCBy valign-text-middle end inter-semi-bold-allports-12px" data-id="I1:462;1:457">
							Design Review
						</div>
					</div>
				</div>
				<div className="event-HVFqGN event" data-id="1:463">
					<div className="bar-FbHj4W bar" data-id="I1:463;1:450"></div>
					<div className="body" data-id="I1:463;1:451">
						<div className="time-N0qV5p time" data-id="I1:463;1:452">
							<div className="end-cPjI02 valign-text-middle end text-xsmedium" data-id="I1:463;1:453">
								2:00
							</div>
							<div className="ampm-cPjI02 valign-text-middle ampm text-xsmedium" data-id="I1:463;1:454">
								PM
							</div>
							<div className="frame-11-cPjI02 frame-11" data-id="I1:463;1:455">
								<img className="video-camera" data-id="I1:463;1:456" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-19.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-19.svg" alt="video-camera" />
							</div>
						</div>
						<div className="end-N0qV5p valign-text-middle end" data-id="I1:463;1:457">
							1:1 with Jon
						</div>
					</div>
				</div>
				<div className="event-WUxKzX event" data-id="1:464">
					<div className="bar-w5x07G bar" data-id="I1:464;1:450"></div>
					<div className="body" data-id="I1:464;1:451">
						<div className="time-AS7kXP time" data-id="I1:464;1:452">
							<div className="end-4rrpam valign-text-middle end text-xsmedium" data-id="I1:464;1:453">
								2:00
							</div>
							<div className="ampm-4rrpam valign-text-middle ampm text-xsmedium" data-id="I1:464;1:454">
								PM
							</div>
							<div className="frame-11-4rrpam frame-11" data-id="I1:464;1:455">
								<img className="video-camera" data-id="I1:464;1:456" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-20.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-20.svg" alt="video-camera" />
							</div>
						</div>
						<div className="end-AS7kXP valign-text-middle end" data-id="I1:464;1:457">
							1:1 with Heather
						</div>
					</div>
				</div>
				<div className="event-3JEzro event" data-id="1:465">
					<div className="bar-i9Om10 bar" data-id="I1:465;1:450"></div>
					<div className="body" data-id="I1:465;1:451">
						<div className="time-lid3hb time" data-id="I1:465;1:452">
							<div className="end-ZZEKLv valign-text-middle end text-xsmedium" data-id="I1:465;1:453">
								4:00
							</div>
							<div className="ampm-ZZEKLv valign-text-middle ampm text-xsmedium" data-id="I1:465;1:454">
								PM
							</div>
							<div className="frame-11-ZZEKLv frame-11" data-id="I1:465;1:455">
								<img className="video-camera" data-id="I1:465;1:456" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-21.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-21.svg" alt="video-camera" />
							</div>
						</div>
						<p className="end-lid3hb valign-text-middle end" data-id="I1:465;1:457">
							🍻 Design Team Happy Hour
						</p>
					</div>
				</div>
				<div className="event-Pqe1Ax event" data-id="1:466">
					<div className="bar-ujtfnG bar" data-id="I1:466;1:450"></div>
					<div className="body" data-id="I1:466;1:451">
						<div className="time-mR3pRc time" data-id="I1:466;1:452">
							<div className="end-FbuqlP valign-text-middle end text-xsmedium" data-id="I1:466;1:453">
								4:00
							</div>
							<div className="ampm-FbuqlP valign-text-middle ampm text-xsmedium" data-id="I1:466;1:454">
								PM
							</div>
							<div className="frame-11-FbuqlP frame-11" data-id="I1:466;1:455">
								<img className="video-camera" data-id="I1:466;1:456" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-22.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-22.svg" alt="video-camera" />
							</div>
						</div>
						<div className="end-mR3pRc valign-text-middle end" data-id="I1:466;1:457">
							🍷 Happy Hour
						</div>
					</div>
				</div>
				<div className="event-APPDkw event" data-id="1:476">
					<div className="bar-OHlpmm bar" data-id="I1:476;1:450"></div>
					<div className="body" data-id="I1:476;1:451">
						<div className="time-S9CsHm time" data-id="I1:476;1:452">
							<div className="end-X2Biyy valign-text-middle end text-xsmedium" data-id="I1:476;1:453">
								1:00
							</div>
							<div className="ampm-X2Biyy valign-text-middle ampm text-xsmedium" data-id="I1:476;1:454">
								PM
							</div>
							<div className="frame-11-X2Biyy frame-11" data-id="I1:476;1:455">
								<img className="video-camera" data-id="I1:476;1:456" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-16.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-16.svg" alt="video-camera" />
							</div>
						</div>
						<div className="end-S9CsHm valign-text-middle end inter-semi-bold-allports-12px" data-id="I1:476;1:457">
							MVP Prioritization Workshop
						</div>
					</div>
				</div>
				<div className="event-JASrOB event" data-id="1:467">
					<div className="bar-Pb6zu5 bar" data-id="I1:467;1:450"></div>
					<div className="body" data-id="I1:467;1:451">
						<div className="time-dJRKOi time" data-id="I1:467;1:452">
							<div className="end-7sIhUY valign-text-middle end text-xsmedium" data-id="I1:467;1:453">
								12:00
							</div>
							<div className="ampm-7sIhUY valign-text-middle ampm text-xsmedium" data-id="I1:467;1:454">
								PM
							</div>
							<div className="frame-11-7sIhUY frame-11" data-id="I1:467;1:455">
								<img className="video-camera" data-id="I1:467;1:456" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-23.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-23.svg" alt="video-camera" />
							</div>
						</div>
						<p className="end-dJRKOi valign-text-middle end inter-semi-bold-allports-12px" data-id="I1:467;1:457">
							🍔 Design System Kickoff Lunch
						</p>
					</div>
				</div>
				<div className="event-Naixv2 event" data-id="1:468">
					<div className="bar-VB57wB bar" data-id="I1:468;1:450"></div>
					<div className="body" data-id="I1:468;1:451">
						<div className="time-NBGp6I time" data-id="I1:468;1:452">
							<div className="end-dZUVvb valign-text-middle end text-xsmedium" data-id="I1:468;1:453">
								12:00
							</div>
							<div className="ampm-dZUVvb valign-text-middle ampm text-xsmedium" data-id="I1:468;1:454">
								PM
							</div>
							<div className="frame-11-dZUVvb frame-11" data-id="I1:468;1:455">
								<img className="video-camera" data-id="I1:468;1:456" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-18.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-18.svg" alt="video-camera" />
							</div>
						</div>
						<div className="end-NBGp6I valign-text-middle end inter-semi-bold-allports-12px" data-id="I1:468;1:457">
							🥗 Marketing Meet-and-Greet
						</div>
					</div>
				</div>
				<div className="event-YskBhO event" data-id="1:469">
					<div className="bar-hEIrWu bar" data-id="I1:469;1:450"></div>
					<div className="body" data-id="I1:469;1:451">
						<div className="time-Sy1goZ time" data-id="I1:469;1:452">
							<div className="end-BZXdoa valign-text-middle end text-xsmedium" data-id="I1:469;1:453">
								9:00
							</div>
							<div className="ampm-BZXdoa valign-text-middle ampm text-xsmedium" data-id="I1:469;1:454">
								AM
							</div>
						</div>
						<div className="end-Sy1goZ valign-text-middle end inter-semi-bold-allports-12px" data-id="I1:469;1:457">
							Design Review: Acme Marketi...
						</div>
					</div>
				</div>
				<div className="event-1xWM6Q event" data-id="1:470">
					<div className="bar-6K6NAA bar" data-id="I1:470;1:450"></div>
					<div className="body" data-id="I1:470;1:451">
						<div className="time-3l2avd time" data-id="I1:470;1:452">
							<div className="end-TIgFDf valign-text-middle end text-xsmedium" data-id="I1:470;1:453">
								9:00
							</div>
							<div className="ampm-TIgFDf valign-text-middle ampm text-xsmedium" data-id="I1:470;1:454">
								AM
							</div>
						</div>
						<div className="end-3l2avd valign-text-middle end" data-id="I1:470;1:457">
							Webinar: Figma ...
						</div>
					</div>
				</div>
				<div className="event-0Yy4uD event" data-id="1:471">
					<div className="bar-PjRcZ0 bar" data-id="I1:471;1:450"></div>
					<div className="body" data-id="I1:471;1:451">
						<div className="time-HehbTA time" data-id="I1:471;1:452">
							<div className="end-sPBGpx valign-text-middle end text-xsmedium" data-id="I1:471;1:453">
								9:00
							</div>
							<div className="ampm-sPBGpx valign-text-middle ampm text-xsmedium" data-id="I1:471;1:454">
								AM
							</div>
							<div className="frame-11-sPBGpx frame-11" data-id="I1:471;1:455">
								<img className="video-camera" data-id="I1:471;1:456" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera.svg" alt="video-camera" />
							</div>
						</div>
						<div className="end-HehbTA valign-text-middle end inter-semi-bold-allports-12px" data-id="I1:471;1:457">
							☕️ Coffee Chat
						</div>
					</div>
				</div>
				<div className="event-gTkN92 event" data-id="1:472">
					<div className="bar-aIypN1 bar" data-id="I1:472;1:450"></div>
					<div className="body" data-id="I1:472;1:451">
						<div className="time-l2V9s9 time" data-id="I1:472;1:452">
							<div className="end-vDCVdG valign-text-middle end text-xsmedium" data-id="I1:472;1:453">
								9:00
							</div>
							<div className="ampm-vDCVdG valign-text-middle ampm text-xsmedium" data-id="I1:472;1:454">
								AM
							</div>
							<div className="frame-11-vDCVdG frame-11" data-id="I1:472;1:455">
								<img className="video-camera" data-id="I1:472;1:456" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-26.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-26.svg" alt="video-camera" />
							</div>
						</div>
						<div className="end-l2V9s9 valign-text-middle end inter-semi-bold-allports-12px" data-id="I1:472;1:457">
							☕️ Coffee Chat
						</div>
					</div>
				</div>
				<div className="event-pIvgdK event" data-id="1:473">
					<div className="bar-LEnwSB bar" data-id="I1:473;1:450"></div>
					<div className="body" data-id="I1:473;1:451">
						<div className="time-kn4x36 time" data-id="I1:473;1:452">
							<div className="end-wlin2U valign-text-middle end text-xsmedium" data-id="I1:473;1:453">
								11:00
							</div>
							<div className="ampm-wlin2U valign-text-middle ampm text-xsmedium" data-id="I1:473;1:454">
								AM
							</div>
							<div className="frame-11-wlin2U frame-11" data-id="I1:473;1:455">
								<img className="video-camera" data-id="I1:473;1:456" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-27.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-27.svg" alt="video-camera" />
							</div>
						</div>
						<div className="end-kn4x36 valign-text-middle end inter-semi-bold-purple-heart-12px" data-id="I1:473;1:457">
							Onboarding Presentation
						</div>
					</div>
				</div>
				<div className="event-r42ZVV event" data-id="1:474">
					<div className="bar-w3gNF7 bar" data-id="I1:474;1:450"></div>
					<div className="body" data-id="I1:474;1:451">
						<div className="time-IfGh9y time" data-id="I1:474;1:452">
							<div className="end-xFePJU valign-text-middle end text-xsmedium" data-id="I1:474;1:453">
								10:00
							</div>
							<div className="ampm-xFePJU valign-text-middle ampm text-xsmedium" data-id="I1:474;1:454">
								AM
							</div>
							<div className="frame-11-xFePJU frame-11" data-id="I1:474;1:455">
								<img className="video-camera" data-id="I1:474;1:456" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-28.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-28.svg" alt="video-camera" />
							</div>
						</div>
						<div className="end-IfGh9y valign-text-middle end inter-semi-bold-purple-heart-12px" data-id="I1:474;1:457">
							Health Benefits Walkthrough
						</div>
					</div>
				</div>
				<div className="event-EFHFmz event" data-id="1:475">
					<div className="bar-cOcki1 bar" data-id="I1:475;1:450"></div>
					<div className="body" data-id="I1:475;1:451">
						<div className="time-ih9mnl time" data-id="I1:475;1:452">
							<div className="end-7wKR9y valign-text-middle end text-xsmedium" data-id="I1:475;1:453">
								2:00
							</div>
							<div className="ampm-7wKR9y valign-text-middle ampm text-xsmedium" data-id="I1:475;1:454">
								PM
							</div>
							<div className="frame-11-7wKR9y frame-11" data-id="I1:475;1:455">
								<img className="video-camera" data-id="I1:475;1:456" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-29.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/video-camera-29.svg" alt="video-camera" />
							</div>
						</div>
						<div className="end-ih9mnl valign-text-middle end inter-semi-bold-allports-12px" data-id="I1:475;1:457">
							Concept Design Review II
						</div>
					</div>
				</div> */}
			</div>
		</div>
	);
}
