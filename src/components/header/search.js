import styles from '@/styles/header.module.css';

import { Search } from 'react-bootstrap-icons';

export default function SearchBar({ setSearchContent }) {
	const handleInputChange = (event) => {
		const content = event.target.value;
		setSearchContent(content);
	};

	return (
		<div className={styles.userContainer}>
			<div className={styles.search}>
				<div className={styles.searchIconWrapper}>
					<Search />
				</div>
				<input className={styles.styledInputBase} placeholder="Search" onChange={handleInputChange} />
			</div>
		</div>
	);
}
