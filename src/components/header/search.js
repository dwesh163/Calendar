import styles from '@/styles/header.module.css';

import { Search } from 'react-bootstrap-icons';

export default function SearchBar({ setSearchContent }) {
	const handleInputChange = (event) => {
		const content = event.target.value;
		setSearchContent(content);
	};

	return (
		<div className="field-ZCz2Pk" data-id="1:2311">
			<div className="field-master-NtaMcQ" data-id="1:2319">
				<img className="icon" data-id="1:2320" src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/icon-36.svg" anima-src="https://cdn.animaapp.com/projects/65f14e7781d354160ac606b6/releases/65f14e945ff555309d45bd7e/img/icon-36.svg" alt="Icon" />
				<div className="search-zRpoz7 valign-text-middle text-xsregular" data-id="1:2321">
					<input placeholder="Search" onChange={handleInputChange} />
				</div>
			</div>
		</div>
	);
}
