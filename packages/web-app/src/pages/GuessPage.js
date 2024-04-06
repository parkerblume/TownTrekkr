import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faRedo } from '@fortawesome/free-solid-svg-icons';
import Leaflet from '../components/leaflet';
import { useGame } from '../components/GameContext';
import ImageDisplay from '../components/ImageDisplay';

const GuessPage = () => {
	const { score, trigger, resetGame, setScore, gameKey } = useGame();
	const [likeDislike, setLikeDislike] = useState('neither');

	const handleLike = () => {
		setLikeDislike(likeDislike !== 'like' ? 'like' : 'neither');
		// Optionally, update trigger here if you want new images on like/dislike
	};

	const handleDislike = () => {
		setLikeDislike(likeDislike !== 'dislike' ? 'dislike' : 'neither');
		// Optionally, update trigger here
	};

	return (
		<div className="flex min-h-screen w-screen flex-col bg-webPrimary">
			<div className="flex flex-grow flex-col">
				<div className="flex flex-grow flex-row justify-center">
					<div className="mb-2 flex w-1/2 flex-col">
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
					<div className="flex w-1/2 flex-grow flex-col pt-4 rounded-4xl">
						<Leaflet key={gameKey} />
					</div>
				</div>
			</div>
			<div className="pt-14">
				<div className="w-full flex justify-between items-center bg-gray-800 text-white fixed bottom-0">
					<div>Score: {score}</div>
					<button onClick={resetGame} className="p-2 bg-blue-500 rounded hover:bg-blue-700 transition duration-300">
						<FontAwesomeIcon icon={faRedo} size="lg"/> New Game
					</button>
				</div>
			</div>
		</div>
	);
};

export default GuessPage;
