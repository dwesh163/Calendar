export default function Menu({ setSelectedMenu, selectedMenu }) {
	const choices = ['Day', 'Week', 'Month', 'Year'];

	const handleMenuClick = (choice) => {
		setSelectedMenu(choice);
	};

	return (
		<div className="day-toggle-ZCz2Pk" data-id="1:409">
			{choices.map((key, index) => (
				<article key={index} className="button" data-id="1:410">
					<div className={selectedMenu === key ? 'button-master-red60 button-master' : 'button-master-yvw7zB button-master'} data-id="I1:410;45:3162" onClick={() => handleMenuClick(key)}>
						<div className={selectedMenu === key ? 'text-fp5g7g valign-text-middle text-smmedium' : 'text-IE1gYp valign-text-middle text-smmedium'} data-id="I1:410;45:3162;2:18654">
							{key}
						</div>
					</div>
				</article>
			))}
		</div>
	);
}
