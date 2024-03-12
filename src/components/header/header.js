import React from 'react';
import SearchBar from './search';
import Menu from './menu';
import DayToggle from './dayToggle';

import { useState } from 'react';

export default function HeaderComponents({ setSearchContent, setSelectedMenu, setSelectedDay, SelectedDay }) {
	return (
		<header>
			<SearchBar setSearchContent={setSearchContent} />
			<Menu setSelectedMenu={setSelectedMenu} />
			<DayToggle setSelectedDay={setSelectedDay} SelectedDay={SelectedDay} />
		</header>
	);
}
