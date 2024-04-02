// GuessButton.js
import React from "react";

const GuessButton = ({ handleGuessClick }) => (
	<button className="relative m-5 w-1/2 min-w-fit rounded-3xl p-2 bg-webSecondary text-webPrimary" onClick={handleGuessClick}>
		<div className="relative min-w-fit rounded-2xl p-11 text-3xl font-bold text-white bg-webAccent">
			Guess Coordinates
		</div>
	</button>
);

export default GuessButton;
