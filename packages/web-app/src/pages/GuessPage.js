import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faRedo } from '@fortawesome/free-solid-svg-icons';
import Leaflet from '../components/leaflet';
import { useGame } from '../components/GameContext';
import ImageDisplay from '../components/ImageDisplay';
import { useNavigate } from 'react-router-dom';

const GuessPage = () => {
	const { score, trigger, resetGame, gameKey, likeDislike, handleLike, handleDislike, postIndex, gameActive, setGameActive, showModal } = useGame();
	const navigate = useNavigate();
	const [scoreKey, setScoreKey] = useState(0);

	useEffect(() => {
		// Trigger re-render with animation by changing the key
		setScoreKey(prevKey => prevKey + 1);
	}, [score]);

	// if score miles is less than 1, display feet instead
	let newScore;
	if (score < 1) {
		newScore = (score * 5280).toFixed(2) + ' feet';
} else {
		newScore = score + ' miles';
	}

	let title = JSON.parse(localStorage.getItem('imageData')).title;

	return (
		<div className="flex min-h-screen w-screen flex-col bg-webPrimary">
			<div className="w-full flex justify-between items-center bg-webAccent text-white p-2 text-2xl font-bold">
				<button onClick={() => navigate('/GamePage')} className="p-2 bg-webAccent border-white border-4 rounded-2xl hover:bg-webSecondary transition duration-300">
					Back to Towns
				</button>
				<h1>Guessing Post: {title}</h1>
				<h1>Round {postIndex + 1}</h1>
			</div>
			<div className="flex flex-grow flex-col mb-20">
				<div className="flex flex-grow flex-row justify-center">
					<div className=" flex w-1/2 flex-col">
					<ImageDisplay trigger={trigger} />
						<div id="thumbs-up" className="mt-3 mr-20 mb-8 flex justify-end space-x-2">
							<button onClick={handleLike} className={`p-2 rounded ${likeDislike === 'like' ? 'bg-green-500' : 'bg-gray-200'} w-12 h-12 flex items-center justify-center`}>
								<FontAwesomeIcon icon={faThumbsUp} color={likeDislike === 'like' ? 'white' : 'black'} size="lg" />
							</button>
							<button onClick={handleDislike} className={`p-2 rounded ${likeDislike === 'dislike' ? 'bg-red-500' : 'bg-gray-200'} w-12 h-12 flex items-center justify-center`}>
								<FontAwesomeIcon icon={faThumbsDown} color={likeDislike === 'dislike' ? 'white' : 'black'} size="lg" />
							</button>
						</div>
					</div>
					<div className="flex w-1/2 flex-grow flex-col pt-2 rounded-4xl">
						<Leaflet key={gameKey} />
					</div>
				</div>
			</div>
			<div className="w-full flex justify-between items-center bg-gray-800 text-white fixed bottom-0 pt-4 p-3 text-2xl font-bold">
				<div key={scoreKey} className="score-animation">Distance: {newScore}</div>
				<button onClick={resetGame} className="p-2 bg-blue-500 rounded hover:bg-blue-700 transition duration-300">
					<FontAwesomeIcon icon={faRedo} size="lg"/> New Image
				</button>
			</div>
		</div>
	);
};

export default GuessPage;
