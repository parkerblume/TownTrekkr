import React from 'react';
import { useNavigate } from "react-router-dom";
import TownsList from '../components/TownsList';


const GamePage = () => {
	const navigate = useNavigate();

	const handleNavigate = (path) => {
		navigate(path);
	};

	return (
		<div className="flex items-center min-h-screen w-screen flex-col bg-webTertiary justify-center p-10 ">
			<h1 className="text-4xl text-white font-bold">Towns</h1>
			<div className="bg-webPrimary p-3 rounded-2xl">
				<div className="flex-1">
					<TownsList/>
				</div>
			</div>
			<button onClick={() => handleNavigate('/MyTowns')}
			        className="p-2 bg-webAccent border-white border-4 rounded-2xl hover:bg-webPrimary transition duration-300">
				Edit Towns
			</button>
		</div>
	);
};

export default GamePage;
