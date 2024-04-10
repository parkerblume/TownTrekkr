import React from 'react';
import { useNavigate } from "react-router-dom";

const ReturnHomeButton = () => {
	const navigate = useNavigate();

	const handleNavigateHome = () => {
		navigate('/HomePage');
	};

	return (
		<button onClick={handleNavigateHome}
		        className="p-2 m-4 shadow-xl bg-webSecondary text-2xl text-webBackground border-white border-4 rounded-2xl hover:bg-webBackground hover:text-webTertiary transition duration-300">
			Return Home
		</button>
	);
};

export default ReturnHomeButton;
