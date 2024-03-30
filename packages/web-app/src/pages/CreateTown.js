import React, { useState } from 'react';
import AddTownLeaflet from "../components/AddTownLeaflet";

const CreateTown = () => {
	const [guessedCoordinates, setGuessedCoordinates] = useState(null);
	const [townName, setTownName] = useState('');
	const [townDescription, setTownDescription] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(townName, townDescription, guessedCoordinates);
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
							<p>Corner 1 - Latitude: {guessedCoordinates[0][0].toFixed(4)}, Longitude: {guessedCoordinates[0][1].toFixed(4)}</p>
							<p>Corner 2 - Latitude: {guessedCoordinates[1][0].toFixed(4)}, Longitude: {guessedCoordinates[1][1].toFixed(4)}</p>
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
							className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
							type="submit"
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
