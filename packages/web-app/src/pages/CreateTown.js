import React, { useState } from 'react';
import AddTownLeaflet from "../components/AddTownLeaflet";

const CreateTown = () => {
	const [guessedCoordinates, setGuessedCoordinates] = useState(null);

	return (
		<div>
			<AddTownLeaflet
				guessedCoordinates={guessedCoordinates}
				setGuessedCoordinates={setGuessedCoordinates}
			/>
			{/* Conditional rendering to display coordinates if they exist */}
			{guessedCoordinates && (
				<div style={{ marginTop: '20px' }}>
					<h3>Guessed Coordinates:</h3>
					<p>Corner 1 - Latitude: {guessedCoordinates[0][0].toFixed(4)}, Longitude: {guessedCoordinates[0][1].toFixed(4)}</p>
					<p>Corner 2 - Latitude: {guessedCoordinates[1][0].toFixed(4)}, Longitude: {guessedCoordinates[1][1].toFixed(4)}</p>
				</div>
			)}

		</div>
	);
};

export default CreateTown;
