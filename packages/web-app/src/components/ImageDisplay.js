import React, { useEffect, useState } from 'react';
import '../styles/Spinner.css';
import {fetchImageByTown} from './GuessServices';

const ImageDisplay = ({ trigger }) => {
	const [imageUrl, setImageUrl] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchImage = async () => {
			setLoading(true);
			const imageUrl = await fetchImageByTown("660497f815daa8e29584bed5");
			if (imageUrl) {
				setImageUrl(imageUrl);
			}
			setLoading(false);
		};

		fetchImage();
	}, [trigger]);

	return (
		<div className="ml-12 mt-9 mr-5 h-full overflow-hidden rounded-2xl border-2 border-black bg-gray-800">
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
