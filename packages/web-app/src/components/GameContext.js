import React, {createContext, useCallback, useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate('/GamePage');
	};

	const [score, setScore] = useState(0);
	const [gameKey, setGameKey] = useState(0);
	const [trigger, setTrigger] = useState(0);
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
	const [town, setTown] = useState(JSON.parse(localStorage.getItem('selectedTown')) || null);
	const [likeDislike, setLikeDislike] = useState('neither');
	const [postIndex , setPostIndex] = useState(0);

	const handleLike = useCallback(() => {
		setLikeDislike(likeDislike !== 'like' ? 'like' : 'neither');
	}, [likeDislike]);

	const handleDislike = useCallback(() => {
		setLikeDislike(likeDislike !== 'dislike' ? 'dislike' : 'neither');
	}, [likeDislike]);

	const resetGame = useCallback(() => {
		if( postIndex < 4){
			setPostIndex(postIndex + 1);
		}
		else{
			alert('All rounds completed!');
			handleNavigate();
		}
		setGameKey(prevKey => prevKey + 1);
		setTrigger(prevTrigger => prevTrigger + 1);
		setLikeDislike('neither'); // Reset like/dislike on game reset
	}, [postIndex]);

	const value = {
		score,
		setScore,
		user,
		town,
		setUser,
		gameKey,
		trigger,
		resetGame,
		likeDislike,
		handleLike,
		handleDislike,
		postIndex,
		setPostIndex,
	};

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};


export const useGame = () => useContext(GameContext);
