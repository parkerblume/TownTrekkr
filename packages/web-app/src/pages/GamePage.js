import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Leaflet from '../components/leaflet';
import ImageDisplay from '../components/ImageDisplay';
import NavigationBar from '../components/NavigationBar';


const GamePage = () => {
	const [likeDislike, setLikeDislike] = useState('neither'); // 'like', 'dislike', 'neither'

	const handleLike = () => {
		setLikeDislike(likeDislike !== 'like' ? 'like' : 'neither');
	};

	const handleDislike = () => {
		setLikeDislike(likeDislike !== 'dislike' ? 'dislike' : 'neither');
	};

	return (
		<div className="flex min-h-screen w-screen flex-col bg-webPrimary">
			<NavigationBar />
			<div className="flex flex-grow flex-col">
				<div className="flex flex-grow flex-row justify-center">
					<div className="mb-2 flex w-1/2 flex-col">
						<ImageDisplay />
						<div id="thumbs-up" className="mt-3 mr-20 mb-8 flex justify-end space-x-2">
							<button
								onClick={handleLike}
								className={`p-2 rounded ${likeDislike === 'like' ? 'bg-green-500' : 'bg-gray-200'} w-12 h-12 flex items-center justify-center`}
							>
								<FontAwesomeIcon icon={faThumbsUp} color={likeDislike === 'like' ? 'white' : 'black'} size="lg" />
							</button>
							<button
								onClick={handleDislike}
								className={`p-2 rounded ${likeDislike === 'dislike' ? 'bg-red-500' : 'bg-gray-200'} w-12 h-12 flex items-center justify-center`}
							>
								<FontAwesomeIcon icon={faThumbsDown} color={likeDislike === 'dislike' ? 'white' : 'black'} size="lg" />
							</button>
						</div>
					</div>
					<div className="flex w-1/2 flex-grow flex-col pt-4 rounded-4xl">
						<Leaflet />
					</div>
				</div>
			</div>
		</div>
	);
};

export default GamePage;
