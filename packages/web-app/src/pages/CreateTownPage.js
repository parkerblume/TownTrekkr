import React, { useState } from 'react';
import AddTownLeaflet from "../components/AddTownLeaflet";

const CreateTownPage = () => {
	const [guessedCoordinates, setGuessedCoordinates] = useState(null);
	const [townName, setTownName] = useState('');
	const [townDescription, setTownDescription] = useState('');
	const [userName, setUserName] = useState(''); // State to store the user's name

	const handleRetrieveUser = () => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			const user = JSON.parse(storedUser);
			setUserName(user.name); // Update the userName state with the retrieved user's name
		} else {
			alert('No user found in localStorage.');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!townName || !townDescription || !guessedCoordinates || guessedCoordinates.length < 2) {
			alert('Please complete all fields and select a full set of coordinates before submitting.');
			return;
		}

		const coordinatesModel = {
			topLeftCoord: {
				latitude: guessedCoordinates[0][0],
				longitude: guessedCoordinates[0][1],
			},
			botRightCoord: {
				latitude: guessedCoordinates[1][0],
				longitude: guessedCoordinates[1][1],
			},
		};

		const user = JSON.parse(localStorage.getItem('user'));

		const requestBody = {
			name: townName,
			description: townDescription,
			topLeftCoord: coordinatesModel.topLeftCoord,
			botRightCoord: coordinatesModel.botRightCoord,
			creatingUser_id: user._id,
			creatingUsername: user.name,
		};

		try {
			const response = await fetch('/createtown', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestBody),
			});

			if (!response.ok) {
				console.error('Network response was not ok.');
				return;
			}

			const result = await response.json();
			console.log('Town created successfully:', result);
			alert('Town created successfully!');

		} catch (error) {
			console.error('Failed to create town:', error);
			alert('Failed to create town. Please try again.');
		}
	};
	return (
		<div className="bg-webPrimary w-screen p-4">
			<div className="flex justify-center bg-webTertiary p-2 rounded-2xl mb-4">
				<h1 className="text-4xl font-bold">Create a New Town</h1>
			</div>
			{/*return to home page*/}
			<a href="/HomePage" className="px-4 py-2 font-bold text-white bg-red-500 hover:bg-red-700 rounded">
				Home
			</a>
			<button
				onClick={handleRetrieveUser}
				className="px-4 py-2 font-bold text-white bg-green-500 hover:bg-green-700 rounded">
				Show User Name
			</button>
			{userName && <p>User Name: {userName}</p>}
			<div className="flex flex-row items-stretch justify-center gap-4">
				<div className="flex-1 bg-webBackground p-4 flex flex-col justify-center items-center rounded-2xl border-2 border-black">
					<div className="w-full text-center ">
						<form onSubmit={handleSubmit} className="p-32 bg-webTertiary rounded-2xl ">
							<h2 className="text-3xl font-bold pb-8 m-4">Town Information</h2>
							<input
								className="mb-8 w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								id="town-name"
								type="text"
								placeholder="Town Name"
								value={townName}
								onChange={(e) => setTownName(e.target.value)}
							/>
							<textarea
								className="mb-8 w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								id="town-description"
								placeholder="Town Description"
								value={townDescription}
								onChange={(e) => setTownDescription(e.target.value)}
							/>
							<button
								className={`w-full px-4 py-2 font-bold text-white ${guessedCoordinates && guessedCoordinates.length === 2 ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500 cursor-not-allowed'}`}
								type="submit"
								disabled={!guessedCoordinates || guessedCoordinates.length < 2}
							>
								Submit
							</button>
						</form>
						{guessedCoordinates && (
							<div className="mb-4">
								<h3>Guessed Coordinates:</h3>
								<p>Top Left - Latitude: {guessedCoordinates[0][0].toFixed(4)}, Longitude: {guessedCoordinates[0][1].toFixed(4)}</p>
								<p>Bottom Right - Latitude: {guessedCoordinates[1][0].toFixed(4)},
									Longitude: {guessedCoordinates[1][1].toFixed(4)}</p>
							</div>
						)}
					</div>
				</div>

				<div className="flex-1">
					<AddTownLeaflet
						guessedCoordinates={guessedCoordinates}
						setGuessedCoordinates={setGuessedCoordinates}
					/>
				</div>
			</div>
		</div>
	);
};

export default CreateTownPage;
