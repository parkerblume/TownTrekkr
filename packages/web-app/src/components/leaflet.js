import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import '../styles/Leaflet.css';
import GuessButton from './GuessButton';

const markerIcon = new Icon({
	iconUrl: require("../icons/Marker.png"),
	iconSize: [38, 38]
});

const Leaflet = () => {
	const [markerPosition, setMarkerPosition] = useState([28.6023, -81.2003]);
	const [guessedCoordinates, setGuessedCoordinates] = useState(null);

	// Assuming these values are available in your component,
	// replace them with actual data as needed.
	const userid = "USER_ID_HERE";
	const postid = "POST_ID_HERE";
	const score = "5000"; // This should be a number or calculated based on some logic.
	const hasliked = false; // Example value, replace with actual logic.

	const handleMapClick = (e) => {
		const { lat, lng } = e.latlng;
		setMarkerPosition([lat, lng]);
	};

	const handleGuessClick = async () => {
		setGuessedCoordinates(markerPosition);

		try {
			const response = await fetch("/api/guess", { // Replace "/api/guess" with your actual API endpoint
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userid,
					postid,
					score,
					hasliked,
				}),
			});

			const data = await response.json();

			if (response.status === 200) {
				// Handle success
				console.log("Guess saved successfully:", data);
			} else {
				// Handle failure
				console.error("Failed to save guess:", data.error);
			}
		} catch (error) {
			console.error("Error making guess:", error);
		}
	};

	const AddMarkerToMap = () => {
		useMapEvents({
			click: handleMapClick,
		});

		return null;
	};

	return (
		<div className="m-5 mr-12 flex flex-col items-center">
			<MapContainer
				center={[28.6023, -81.2003]}
				zoom={15}
				style={{ width: '100%'}} /* Ensure the map has a defined size */
				className="flex rounded-2xl border-2 border-black map-container" /* Add 'map-container' class */
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<AddMarkerToMap/>
				<Marker position={markerPosition} icon={markerIcon}/>
			</MapContainer>
			<div className="flex flex-row items-center gap-4">
				<GuessButton handleGuessClick={handleGuessClick} /> {/* Use the GuessButton component */}

				{guessedCoordinates && (
					<div className="text-xl">
						<h3>Guessed Coordinates:</h3>
						<p>Latitude: {guessedCoordinates[0]}</p>
						<p>Longitude: {guessedCoordinates[1]}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Leaflet;
