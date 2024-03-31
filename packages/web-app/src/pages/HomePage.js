import React from "react";

const HomePage = () => {

	const fillLocalStorage = () => {
		localStorage.setItem('user', JSON.stringify({
							id: '3421323342', // Assuming the user object has an _id property
							name: 'a', // Customize these fields based on your user object
							email: 'fillerNamasdasde@gmail.com',
						}));
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-4xl font-bold">Welcome to GeoGame!</h1>
			<button className="mt-4 px-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-700">
				<a href="/GuessPage">Start Playing</a>
			</button>
			<button className="mt-4 px-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-700">
				<a href="/CreateTown">Create a Town</a>
			</button>
			<button className="mt-4 px-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-700" onClick={fillLocalStorage}>
				Fill Local Storage
			</button>
		</div>
	);
}

export default HomePage;
