import React from 'react';
import ReturnHomeButton from './ReturnHomeButton';

const NavigationBar = () => {
	return (
		<nav className="flex flex-row items-center justify-between w-full h-10vh bg-webAccent text-webSecondary">
			<ReturnHomeButton />
			<h1 className="text-5xl p-4 font-londrina-solid">Town Trekkr</h1>
		</nav>
	);
};

export default NavigationBar;
