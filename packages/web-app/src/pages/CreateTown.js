import React, { useState } from 'react';
import AddTownLeaflet from "../components/AddTownLeaflet";
// import TownController from "server/api/controllers/townController";

const CreateTown = () => {
	const [guessedCoordinates, setGuessedCoordinates] = useState(null);
	const [townName, setTownName] = useState('');
	const [townDescription, setTownDescription] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!townName || !townDescription) {
			alert('Please fill in town information before submitting.');
			return; // Stop the submission
		}
		// Assuming guessedCoordinates[0] is topLeft and guessedCoordinates[1] is botRight
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

		console.log(townName, townDescription, coordinatesModel);
		// TownController.createTown(townName, townDescription, coordinatesModel);
	};

	return (
		<div className="bg-webPrimary w-screen p-4">
			<div className="flex justify-center bg-webTertiary p-2 rounded-2xl mb-4">
				<h1 className="text-4xl font-bold">Create a New Town</h1>
			</div>
			<div className="flex flex-row items-start justify-center gap-4">
				<div className="flex-1 bg-webBackground h-screen p-4">
					{guessedCoordinates && (
						<div className="mb-4">
							<h3>Guessed Coordinates:</h3>
							<p>Top Left - Latitude: {guessedCoordinates[0][0].toFixed(4)}, Longitude: {guessedCoordinates[0][1].toFixed(4)}</p>
							<p>Bottom Right - Latitude: {guessedCoordinates[1][0].toFixed(4)}, Longitude: {guessedCoordinates[1][1].toFixed(4)}</p>
						</div>
					)}
					<form onSubmit={handleSubmit} className="max-w-xs">
						<input
							className="mb-4 w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
							id="town-name"
							type="text"
							placeholder="Town Name"
							value={townName}
							onChange={(e) => setTownName(e.target.value)}
						/>
						<textarea
							className="mb-4 w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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

export default CreateTown;
