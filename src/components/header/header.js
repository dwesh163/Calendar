import React from 'react';
import SearchBar from './search';
import Menu from './menu';
import DayToggle from './dayToggle';

import { useState } from 'react';

export default function HeaderComponents({ setSearchContent, setSelectedMenu, setSelectedDay, selectedDay, selectedMenu }) {
	return (
		<header className="header-YxPDX5 header">
			<DayToggle setSelectedDay={setSelectedDay} selectedDay={selectedDay} />
			<Menu setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} />
			<SearchBar setSearchContent={setSearchContent} />
		</header>
	);
}
