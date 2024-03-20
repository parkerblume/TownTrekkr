import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { colors } from '../styles/commonStyles';
import '../styles/Leaflet.css';

const markerIcon = new Icon({
  iconUrl: require("../icons/Marker.png"),
  iconSize: [38, 38]
});

const Leaflet = () => {
  const [markerPosition, setMarkerPosition] = useState([28.6023, -81.2003]);
  const [guessedCoordinates, setGuessedCoordinates] = useState(null);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setMarkerPosition([lat, lng]);
  };

  const handleGuessClick = () => {
    setGuessedCoordinates(markerPosition);
  };

  const AddMarkerToMap = () => {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  };

  return (
	  <div className="flex flex-col items-center m-5">
		  <MapContainer
			  center={[28.6023, -81.2003]}
			  zoom={15}
			  style={{ width: '100%'}} /* Ensure the map has a defined size */
			  className="flex border-2 border-black rounded-2xl map-container " /* Add 'map-container' class */
		  >
			  <TileLayer
				  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			  />
			  <AddMarkerToMap/>
			  <Marker position={markerPosition} icon={markerIcon}/>
		  </MapContainer>
		  <div className="flex flex-row gap-4 items-center">
			  <button className="relative min-w-fit bg-webSecondary text-webPrimary w-1/2 p-2 m-5 rounded-3xl" onClick={handleGuessClick}>
				  <div className="relative min-w-fit bg-webAccent text-white font-bold p-11 rounded-2xl text-3xl">
					  Guess Coordinates
				  </div>
			  </button>

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
