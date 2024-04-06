import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faRedo } from '@fortawesome/free-solid-svg-icons';
import Leaflet from '../components/leaflet';
import ImageDisplay from '../components/ImageDisplay';
import NavigationBar from '../components/NavigationBar';

const GuessPage = () => {
	const [likeDislike, setLikeDislike] = useState('neither'); // 'like', 'dislike', 'neither'
	const [score, setScore] = useState(0); // Temporary score value
	const [gameKey, setGameKey] = useState(0); // Used to reset the game

	const handleLike = () => {
		setLikeDislike(likeDislike !== 'like' ? 'like' : 'neither');
	};

	const handleDislike = () => {
		setLikeDislike(likeDislike !== 'dislike' ? 'dislike' : 'neither');
	};

	const resetGame = useCallback(() => {
		setGameKey(prevKey => prevKey + 1); // Increment key to force re-render and reset
		setScore(0); // Reset score or set new score as needed
		// Add any other state resets here
	}, []);

	return (
		<div className="flex min-h-screen w-screen flex-col bg-webPrimary">
			<NavigationBar />
			<div className="flex flex-grow flex-col">
				<div className="flex flex-grow flex-row justify-center">
					<div className="mb-2 flex w-1/2 flex-col">
						<ImageDisplay />
						<div id="thumbs-up" className="mt-3 mr-20 mb-8 flex justify-end space-x-2">
							<button onClick={handleLike} className={`p-2 rounded ${likeDislike === 'like' ? 'bg-green-500' : 'bg-gray-200'} w-12 h-12 flex items-center justify-center`}>
								<FontAwesomeIcon icon={faThumbsUp} color={likeDislike === 'like' ? 'white' : 'black'} size="lg" />
							</button>
							<button onClick={handleDislike} className={`p-2 rounded ${likeDislike === 'dislike' ? 'bg-red-500' : 'bg-gray-200'} w-12 h-12 flex items-center justify-center`}>
								<FontAwesomeIcon icon={faThumbsDown} color={likeDislike === 'dislike' ? 'white' : 'black'} size="lg" />
							</button>
						</div>
					</div>
					<div className="flex w-1/2 flex-grow flex-col pt-4 rounded-4xl">
						<Leaflet key={gameKey} />
					</div>
				</div>
			</div>
			<div className="w-full p-4 flex justify-between items-center bg-gray-800 text-white fixed bottom-0">
				<div>Score: {score}</div>
				<button onClick={resetGame} className="p-2 bg-blue-500 rounded hover:bg-blue-700 transition duration-300">
					<FontAwesomeIcon icon={faRedo} size="lg" /> New Game
				</button>
			</div>
		</div>
	);
};

export default GuessPage;
