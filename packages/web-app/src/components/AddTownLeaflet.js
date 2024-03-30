import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Rectangle, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import '../styles/Leaflet.css';

// Define the marker icon with anchor at the bottom center
const markerIcon = new L.Icon({
	iconUrl: require("../icons/Marker.png"),
	iconSize: [38, 38],
	iconAnchor: [19, 38]
});

const Leaflet = () => {
	const [markerPositions, setMarkerPositions] = useState([]);
	const [rectangleBounds, setRectangleBounds] = useState(null);
	const [guessedCoordinates, setGuessedCoordinates] = useState(null);

	// Update the position of a marker and subsequently the rectangle bounds
	const updateMarkerPosition = (index, newPosition) => {
		const updatedPositions = [...markerPositions];
		updatedPositions[index] = newPosition;
		setMarkerPositions(updatedPositions);
	};

	// Update rectangle bounds when markerPositions changes
	useEffect(() => {
		if (markerPositions.length === 2) {
			setRectangleBounds([markerPositions[0], markerPositions[1]]);
		}
	}, [markerPositions]);

	// Handle clicks on the map to add markers
	const handleMapClick = (e) => {
		const { lat, lng } = e.latlng;
		if (markerPositions.length < 2) {
			setMarkerPositions([...markerPositions, [lat, lng]]);
		} else {
			setMarkerPositions([[lat, lng]]);
		}
	};

	// Component to enable clicking on the map to place markers
	const AddMarkerToClick = () => {
		useMapEvents({
			click: handleMapClick,
		});

		return null;
	};

	// Handle "guess" action
	const handleGuessClick = () => {
		setGuessedCoordinates(rectangleBounds);
	};

	return (
		<div className="m-5 mr-12 flex flex-col items-center">
			<MapContainer
				center={[28.6023, -81.2003]}
				zoom={15}
				style={{ width: '100%' }}
				className="flex rounded-2xl border-2 border-black map-container"
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<AddMarkerToClick/>
				{markerPositions.map((position, idx) => (
					<Marker
						key={idx}
						position={position}
						icon={markerIcon}
						draggable={true}
						eventHandlers={{
							drag: (e) => {
								const { lat, lng } = e.target.getLatLng();
								updateMarkerPosition(idx, [lat, lng]);
							},
						}}
					/>
				))}
				{rectangleBounds && (
					<Rectangle
						bounds={rectangleBounds}
						color="#AE927E"
						fillColor="#EAD7C7"
						fillOpacity={0.4}
						opacity={0.9}

					/>
				)}
			</MapContainer>
			{/*<div className="flex flex-row items-center gap-4 mt-4">*/}
			{/*	<GuessButton handleGuessClick={handleGuessClick} />*/}
			{/*	{guessedCoordinates && (*/}
			{/*		<div className="text-xl">*/}
			{/*			<h3>Guessed Coordinates:</h3>*/}
			{/*			<p>Corner 1 - Latitude: {guessedCoordinates[0][0].toFixed(4)}, Longitude: {guessedCoordinates[0][1].toFixed(4)}</p>*/}
			{/*			<p>Corner 2 - Latitude: {guessedCoordinates[1][0].toFixed(4)}, Longitude: {guessedCoordinates[1][1].toFixed(4)}</p>*/}
			{/*		</div>*/}
			{/*	)}*/}
			{/*</div>*/}
		</div>
	);
};

export default Leaflet;
