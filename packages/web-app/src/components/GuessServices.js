

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

		let posts = await response.json();
		const userId = JSON.parse(localStorage.getItem('user')).id;

		// Fetch past guesses to filter out already guessed posts
		const pastGuessesResponse = await getPastGuesses(userId);
		// Make sure to access the guesses array inside the returned object
		const guessedPostIds = new Set(pastGuessesResponse.guesses.map(guess => guess.post));
		posts = posts.filter(post => !guessedPostIds.has(post._id));

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
			// Alert user if no posts are found or all posts have been guessed
			alert('No new posts available to guess in this town.');
			console.log('No posts found or all posts have been guessed');
		}
	} catch (error) {
		console.error('Error fetching image:', error);
	}
};



export const getPastGuesses = async (userid) => {
	try {
		const response = await fetch('/api/user/getguesses', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userid: userid }), // Ensure correct property name 'userid' is used based on your backend API requirement
		});

		if (!response.ok) {
			console.error('Failed to fetch past guesses');
			return { guesses: [] }; // Return an object with an empty array for guesses to ensure the caller can always access the guesses property
		}

		const data = await response.json();
		console.log('Past guesses fetched:', data); // Debug log to inspect fetched data
		return data; // Assuming the data structure is { guesses: [{ post: "...", score: ..., hasLiked: ...}, ...] }
	} catch (error) {
		console.error('Error fetching past guesses:', error);
		return { guesses: [] }; // Return an object with an empty array in case of an error
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

