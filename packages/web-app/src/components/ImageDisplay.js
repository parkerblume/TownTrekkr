import React, { useEffect, useState } from 'react';
import '../styles/Spinner.css';

const ImageDisplay = () => {
	const [imageUrl, setImageUrl] = useState('');

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				// Fetch the list of posts by town
				const response = await fetch('api/posts/getpostsbytown', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ townId: "660497f815daa8e29584bed5" }),
				});
				if (!response.ok) {
					console.error('Failed to fetch posts');
					return;
				}

				const posts = await response.json();

				if (posts.length > 0) {
					// Select a random post from the list
					const randomIndex = Math.floor(Math.random() * posts.length);
					const randomPost = posts[randomIndex];

					// Fetch the image using the fileId of the selected post
					const imageResponse = await fetch('api/posts/getimage', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ fileId: randomPost.fileId }),
					});

					if (!imageResponse.ok) {
						console.error('Failed to fetch image');
						return;
					}

					const imageBlob = await imageResponse.blob();
					const imageUrl = URL.createObjectURL(imageBlob);
					setImageUrl(imageUrl);

					// Save to local storage
					localStorage.setItem('imageUrl', imageUrl);
				}
			} catch (error) {
				console.error('Error fetching posts:', error);
			}
		};

		fetchPosts();
	}, []);

	return (
		<div className="ml-12 mt-9 mr-5 h-full overflow-hidden rounded-2xl border-2 border-black bg-gray-800">
			<div className="h-full rounded-4xl flex justify-center items-center">
				{imageUrl ? (
					<img src={imageUrl} alt="Selected Post" className="mx-auto h-full w-auto object-cover" />
				) : (
					<div className="spinner"></div>
				)}
			</div>
		</div>
	);
};

export default ImageDisplay;
