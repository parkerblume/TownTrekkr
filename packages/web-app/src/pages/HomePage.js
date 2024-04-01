import React from "react";

const HomePage = () => {

	// Temporary function to fill the local storage with a user object for testing
	const fillLocalStorage = () => {
		localStorage.setItem('user', JSON.stringify({
							id: '12345689123', // Assuming the user object has an _id property
							name: 'camilo', // Customize these fields based on your user object
							email: 'camilo@gmail.com',
						}));
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-4xl font-bold">Welcome to GeoGame!</h1>
			<button className="mt-4 px-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-700">
				<a href="/GuessPage">Start Playing</a>
			</button>
			<button className="mt-4 px-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-700">
				<a href="/CreateTownPage">Create a Town</a>
			</button>
			<button className="mt-4 px-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-700" onClick={fillLocalStorage}>
				Fill Local Storage
			</button>
		</div>
	);
}

export default HomePage;
