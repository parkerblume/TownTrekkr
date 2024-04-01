import React, { useEffect, useState } from 'react';
import '../styles/Spinner.css';

// Currently pulls a random image from the server
const ImageDisplay = () => {
	const [imageUrl, setImageUrl] = useState('');

	useEffect(() => {
		const fetchPosts = async () => {
			let posts = [];
			try {
				const response = await fetch('/getposts'); // Make sure the URL matches your API endpoint
				if (!response.ok) {
					console.error('Failed to fetch posts');
					return;
				}

				posts = await response.json();
			} catch (error) {
				console.error('Error fetching posts:', error);
			}

			// Select a random post if posts are available
			if (posts.length > 0) {
				const randomIndex = Math.floor(Math.random() * posts.length);
				const randomPost = posts[randomIndex];
				setImageUrl(randomPost.imageUrl);
			}
		};

		fetchPosts();
	}, []);


	return (
		<div className="ml-12 mt-9 mr-5 h-full overflow-hidden rounded-2xl border-2 border-black bg-gray-800">
			<div className="h-full rounded-4xl flex justify-center items-center">
				{imageUrl ? (
					<img src={imageUrl} alt="Selected Post" className="mx-auto h-full w-auto object-cover"/>
				) : (
					<div className="spinner"></div> // This spinner is centered by flexbox
				)}
			</div>
		</div>
	);
};

export default ImageDisplay;
