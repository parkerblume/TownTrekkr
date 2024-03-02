import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const markerIcon = new Icon({
    iconUrl: require("../icons/Marker.png"),
    iconSize: [38, 38] // size of the icon
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
    const map = useMapEvents({
      click: handleMapClick,
    });

    return null;
  };

  return (
    <div>
      <MapContainer center={[28.6023, -81.2003]} zoom={15}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AddMarkerToMap />
        <Marker position={markerPosition} icon={markerIcon}>
        </Marker>
      </MapContainer>

      <button onClick={handleGuessClick}>Guess Coordinates</button>

      {guessedCoordinates && (
        <div>
          <h3>Guessed Coordinates:</h3>
          <p>Latitude: {guessedCoordinates[0]}</p>
          <p>Longitude: {guessedCoordinates[1]}</p>
        </div>
      )}
    </div>
  );
};

export default Leaflet;
