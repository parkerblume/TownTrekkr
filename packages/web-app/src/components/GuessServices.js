
export const fetchImageByTown = async (townId) => {
	try {
		const response = await fetch('api/posts/getpostsbytown', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ townId }),
		});
		if (!response.ok) {
			console.error('Failed to fetch posts');
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
				return;
			}

			const imageBlob = await imageResponse.blob();
			const imageUrl = URL.createObjectURL(imageBlob);
			localStorage.setItem('imageData', JSON.stringify(randomPost));
			return imageUrl;
		} else {
			console.log('No posts found');
		}
	} catch (error) {
		console.error('Error fetching image:', error);
	}
};

export const makeGuess = async (guessDetails) => {
	try {
		const response = await fetch("/api/user/makeguess", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(guessDetails),
		});

		const data = await response.json();

		if (response.status === 200) {
			console.log("Guess saved successfully:", data);
			return data;
		} else {
			console.error("Failed to save guess:", data.error);
			return null;
		}
	} catch (error) {
		console.error("Error making guess:", error);
		return null;
	}
};

