import React from 'react';
import { useNavigate } from "react-router-dom";
import TownsList from '../components/TownsList';


const GamePage = () => {
	const navigate = useNavigate();

	const handleNavigate = (path) => {
		navigate(path);
	};

	const localStorageExampleData = {
		"_id": "660eed19f9eadf4267c40a18",
		"fileId": "660eed19a00c8514f2d09c94",
		"user_id": "66060766d2f84a45fe9c98be",
		"town": "660497f815daa8e29584bed5",
		"coordinateX": 28.65944913314387,
		"coordinateY": -81.2053436789252,
		"likes": 0,
		"dislikes": 0,
		"createdAt": "2024-04-04T18:10:33.961Z",
		"updatedAt": "2024-04-04T18:10:33.961Z",
		"__v": 0
	}
	localStorage.setItem('imageData', JSON.stringify(localStorageExampleData));

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
