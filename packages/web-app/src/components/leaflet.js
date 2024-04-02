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
			  <button className="relative m-5 w-1/2 min-w-fit rounded-3xl p-2 bg-webSecondary text-webPrimary" onClick={handleGuessClick}>
				  <div className="relative min-w-fit rounded-2xl p-11 text-3xl font-bold text-white bg-webAccent">
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
