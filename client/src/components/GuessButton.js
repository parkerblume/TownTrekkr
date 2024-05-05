// GuessButton.js
import React from "react";

const GuessButton = ({ handleGuessClick }) => (
	<button className="relative m-3 w-1/2 min-w-full rounded-3xl p-2 bg-webSecondary text-webPrimary " onClick={handleGuessClick}>
		<div className="relative min-w-fit rounded-2xl p-2 text-2xl font-bold text-white bg-webAccent">
			Guess Coordinates
		</div>
	</button>
);

export default GuessButton;
