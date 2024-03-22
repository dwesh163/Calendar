export default function DayToggle({ setSelectedDay, selectedDay }) {
	const handleAddDay = () => {
		const newSelectedDay = new Date(selectedDay);
		newSelectedDay.setDate(newSelectedDay.getDate() + 1);
		setSelectedDay(newSelectedDay);
	};

	const handleSubtractDay = () => {
		const newSelectedDay = new Date(selectedDay);
		newSelectedDay.setDate(newSelectedDay.getDate() - 1);
		setSelectedDay(newSelectedDay);
	};

	return (
		<div className="arrows-ZCz2Pk arrows" data-id="1:405">
			<div className="icon-button" data-id="1:406" onClick={handleSubtractDay}>
				<div className="icon-button-master-clGUZh icon-button-master" data-id="I1:406;45:4078">
					<img className="icon" data-id="I1:406;45:4078;28:1566" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/icon-34.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/icon-34.svg" alt="Icon" />
				</div>
			</div>
			<div className="button" data-id="1:407">
				<div className="button-master-7vJxcm button-master" data-id="I1:407;45:3162">
					<div className="text-8WD65S valign-text-middle text-xsregular" data-id="I1:407;45:3162;2:18654">
						{selectedDay.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
					</div>
				</div>
			</div>
			<div className="icon-button" data-id="1:408" onClick={handleAddDay}>
				<div className="icon-button-master-Oq7aRa icon-button-master" data-id="I1:408;45:4078">
					<img className="icon" data-id="I1:408;45:4078;28:1566" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/icon-35.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/icon-35.svg" alt="Icon" />
				</div>
			</div>
		</div>
	);
}
