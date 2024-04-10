import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Rectangle, Polyline, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import '../styles/Leaflet.css';
import GuessButton from './GuessButton';
import { useGame } from './GameContext';
import { makeGuess } from './GuessServices';

const markerIcon = new Icon({
	iconUrl: require("../icons/Marker.png"),
	iconSize: [38, 38]
});

const actualLocationIcon = new Icon({
  iconUrl: require("../icons/ActualLocationMarker.png"), // Add your actual location marker icon here
  iconSize: [38, 38]
});

const Leaflet = () => {
	const [markerPosition, setMarkerPosition] = useState([28.6023, -81.2003]);
    const [actualLocation, setActualLocation] = useState(null); // To store the actual location
	const [guessedCoordinates, setGuessedCoordinates] = useState(null);
	const [showGuessButton, setShowGuessButton] = useState(true);
	const [line,setLine] = useState([]);
	const [guessMade, setGuessMade] = useState(false);

	const { likeDislike, resetGame, score, setScore, showNextButton, setShowNextButton } = useGame();
	const [hasClicked, setHasClicked] = useState(false);

	const user = JSON.parse(localStorage.getItem('user'));
	const imageData = JSON.parse(localStorage.getItem('imageData'));
	const selectedTown = JSON.parse(localStorage.getItem('selectedTown'));


	let likeState = 0;
	if( likeDislike === 'like' ) likeState = 1;
	else if( likeDislike === 'dislike' ) likeState = 0;
	const userid = user.id;
	const postid = imageData._id;
	const hasliked = (likeState === 1)

	const townBounds = [
		[selectedTown.topLeftLat, selectedTown.topLeftLong], // Top left
		[selectedTown.botRightLat, selectedTown.botRightLong] // Bottom right
	];

	const mapCenter = [
		(selectedTown.topLeftLat + selectedTown.botRightLat) / 2,
		(selectedTown.topLeftLong + selectedTown.botRightLong) / 2
	];

	const handleMapClick = (e) => {
		const { lat, lng } = e.latlng;
		const withinLatBounds = lat >= selectedTown.botRightLat && lat <= selectedTown.topLeftLat;
		const withinLngBounds = lng >= selectedTown.topLeftLong && lng <= selectedTown.botRightLong;
		console.log("Clicked position:", lat, lng);

		if (withinLatBounds && withinLngBounds) {
			setMarkerPosition([lat, lng]);
			setHasClicked(true);
		}
	};

	const handleGuessClick = async () => {
		if (!hasClicked) return;
		setActualLocation([imageData.coordinateX, imageData.coordinateY]);
		setGuessedCoordinates(markerPosition);
		// Calculate distance between marker and actual location
		let imageLocation = [imageData.coordinateX, imageData.coordinateY];
		let distance = Math.sqrt((imageLocation[0] - markerPosition[0]) ** 2 + (imageLocation[1] - markerPosition[1]) ** 2);
		distance = distance * 69.0;
		setScore(distance);
		const guessDetails = { userid, postid, score , hasliked };
		const data = await makeGuess(guessDetails);
		if (data) {
			console.log("Guess saved successfully:", data);
			setShowNextButton(true);
			setShowGuessButton(false);
			setGuessMade(true)
			setLine([markerPosition, [imageData.coordinateX, imageData.coordinateY]]);
		}

	};

	const AddMarkerToMap = () => {
		useMapEvents({
			click: handleMapClick,
		});

		return null;
	};

	return (
		<div className="mr-12 flex flex-col items-center">
			<MapContainer
				center={mapCenter}
				zoom={15}
				style={{width: '100%'}}
				className="flex rounded-2xl border-2 border-black map-container"
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<AddMarkerToMap/>
				<Marker position={markerPosition} icon={markerIcon}/>
				{guessMade && actualLocation && <Marker position={actualLocation} icon={actualLocationIcon}/>}
				{guessMade && line.length > 0 && <Polyline positions={line} color="blue" dashArray="5, 10"/>}
				<Rectangle bounds={townBounds} color="#5F8575"
				           fillColor="#FFEEFF"
				           fillOpacity={0.4}
				           opacity={0.9}/>
			</MapContainer>
			{showGuessButton && <div className="flex flex-row items-center gap-4">
				<GuessButton handleGuessClick={handleGuessClick}/>
			</div>}
		</div>
	);
};

export default Leaflet;
