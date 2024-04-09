import React, { useEffect, useState } from 'react';
import '../styles/Spinner.css';
import {fetchImageByTown} from './GuessServices';
import { useGame } from './GameContext';

const ImageDisplay = ({ trigger }) => {
	const [imageUrl, setImageUrl] = useState('');
	const [loading, setLoading] = useState(true);
	const { town, user, showModal } = useGame();

	useEffect(() => {
		const fetchImage = async () => {
			setLoading(true);
			try {
				let imageUrl = await fetchImageByTown(town._id);
				if(!imageUrl){
					showModal('No more posts to guess in this town. Please select another town.');
				}
				setImageUrl(imageUrl);
			} catch (error) {
				console.error('Failed to fetch image:', error);
			}
			setLoading(false);
		};

		fetchImage();
	}, [trigger]);

	return (
		<div className="ml-12 mt-2 mr-5 h-full overflow-hidden rounded-2xl border-2 border-black bg-gray-800">
			<div className="h-full rounded-4xl flex justify-center items-center">
				{loading ? (
					<div className="spinner"></div>
				) : (
				<img src={imageUrl} alt="Selected Post" className="mx-auto h-full w-auto object-cover" />
				)}
			</div>
		</div>

	);
};

export default ImageDisplay;
