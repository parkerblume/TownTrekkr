import React, { useEffect, useState } from 'react';
import '../styles/Spinner.css';

const ImageDisplay = ({ trigger }) => {
	const [imageUrl, setImageUrl] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchImage() {
			setLoading(true);
			try {
				const response = await fetch('api/posts/getpostsbytown', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ townId: "660497f815daa8e29584bed5" }),
				});
				if (!response.ok) {
					console.error('Failed to fetch posts');
					setLoading(false);
					return;
				}

				const posts = await response.json();
				if (posts.length > 0) {
					const randomIndex = Math.floor(Math.random() * posts.length);
					const randomPost = posts[randomIndex];

					const imageResponse = await fetch('api/posts/getimage', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ fileId: randomPost.fileId }),
					});

					if (!imageResponse.ok) {
						console.error('Failed to fetch image');
						setLoading(false);
						return;
					}

					const imageBlob = await imageResponse.blob();
					const imageUrl = URL.createObjectURL(imageBlob);
					setImageUrl(imageUrl);
                    localStorage.setItem('imageData', JSON.stringify(randomPost));
				} else {
					console.log('No posts found');
				}
			} catch (error) {
				console.error('Error fetching image:', error);
			} finally {
				setLoading(false);
			}
		}

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
