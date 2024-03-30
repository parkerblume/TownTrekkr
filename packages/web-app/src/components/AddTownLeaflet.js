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

const AddTownLeaflet = ({ setGuessedCoordinates }) => {
	const [markerPositions, setMarkerPositions] = useState([]);
	const [rectangleBounds, setRectangleBounds] = useState(null);

	useEffect(() => {
		if (markerPositions.length === 2) {
			const newBounds = [markerPositions[0], markerPositions[1]];
			setRectangleBounds(newBounds);
			setGuessedCoordinates(newBounds);
		}
	}, [markerPositions, setGuessedCoordinates]);

	const handleMapClick = (e) => {
		const { lat, lng } = e.latlng;
		const newPositions = markerPositions.length === 2 ? [[lat, lng]] : [...markerPositions, [lat, lng]];
		setMarkerPositions(newPositions);
	};

	const updateMarkerPosition = (index, newPosition) => {
		const updatedPositions = [...markerPositions];
		updatedPositions[index] = newPosition;
		setMarkerPositions(updatedPositions);
		// Update rectangle bounds and guessedCoordinates as markers are moved
		if (updatedPositions.length === 2) {
			setRectangleBounds([updatedPositions[0], updatedPositions[1]]);
			setGuessedCoordinates([updatedPositions[0], updatedPositions[1]]);
		}
	};

	const AddMarkerToClick = () => {
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
		</div>
	);
};

export default AddTownLeaflet;
