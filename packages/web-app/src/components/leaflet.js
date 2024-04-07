import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import '../styles/Leaflet.css';
import GuessButton from './GuessButton';
import { useGame } from './GameContext';

const markerIcon = new Icon({
	iconUrl: require("../icons/Marker.png"),
	iconSize: [38, 38]
});

const Leaflet = () => {
	const [markerPosition, setMarkerPosition] = useState([28.6023, -81.2003]);
	const [guessedCoordinates, setGuessedCoordinates] = useState(null);
	const { likeDislike } = useGame();

	const user = JSON.parse(localStorage.getItem('user'));
	const town = JSON.parse(localStorage.getItem('selectedTown'));
	const imageData = JSON.parse(localStorage.getItem('imageData'));

	let likeState = 0;
	if( likeDislike === 'like' ) likeState = 1;
	else if( likeDislike === 'dislike' ) likeState = 0;
	// Assuming these values are available in your component,
	// replace them with actual data as needed.
	const userid = user.id;
	const postid = imageData._id;
	const score = "5000"; //Distance or Score depending on progress
	const hasliked = (likeState === 1)

	const handleMapClick = (e) => {
		const { lat, lng } = e.latlng;
		setMarkerPosition([lat, lng]);
	};

	const handleGuessClick = async () => {
		setGuessedCoordinates(markerPosition);

		try {
			const response = await fetch("/api/user/makeguess", {
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
