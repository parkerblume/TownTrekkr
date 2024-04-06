import React from 'react';
import { useNavigate } from "react-router-dom";
import TownsList from '../components/TownsList';

const GamePage = () => {
	const navigate = useNavigate();

	const handleNavigate = (path) => {
		navigate(path);
	};

	return (
		<div className="flex min-h-screen w-screen flex-col bg-webPrimary justify-center p-10">
			<div className="flex-1">
				<TownsList/>
			</div>
		</div>
	);
};

export default GamePage;
