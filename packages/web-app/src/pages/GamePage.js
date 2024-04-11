import React from 'react';
import { useNavigate } from "react-router-dom";
import TownsList from '../components/TownsList';
import ReturnHomeButton from '../components/ReturnHomeButton'; // Add this line to import the ReturnHomeButton component

const GamePage = () => {
	const navigate = useNavigate();

	const handleNavigate = (path) => {
		navigate(path);
	};

	return (
		<div className="min-h-screen w-screen bg-webTertiary">
			<ReturnHomeButton />
			<div className="flex items-center flex-col justify-center p-10 gap-2">
				<h1 className="text-4xl text-white font-bold">Ready to guess? Select a town!</h1>
				<div className="bg-webPrimary p-3 rounded-2xl shadow-xl">
					<div className="flex-1">
						<TownsList/>
					</div>
				</div>
				<button onClick={() => handleNavigate('/MyTowns')}
				        className="p-2 bg-webAccent border-white border-4 rounded-2xl hover:bg-webPrimary transition duration-300 shadow-xl">
					Edit Towns
				</button>
			</div>
		</div>
	);
};

export default GamePage;
