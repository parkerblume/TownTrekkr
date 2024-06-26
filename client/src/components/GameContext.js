import React, {createContext, useCallback, useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './GuessModal';
import GuessModal from "./GuessModal";

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
	const [modalMessage, setModalMessage] = useState('');
	const [showNextButton, setShowNextButton] = useState(false);

	// Function to open the modal with a specific message
	const showModal = (message) => {
		setModalMessage(message);
	};

	// Function to hide the modal
	const hideModal = () => {
		setModalMessage('');
	};

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
			showModal('Congratulations! You have completed this round.');
		}
		setGameKey(prevKey => prevKey + 1);
		setTrigger(prevTrigger => prevTrigger + 1);
		setLikeDislike('neither'); // Reset like/dislike on game reset
		setShowNextButton(false);
		console.log("hide button", showNextButton);
	}, [postIndex, showNextButton]);

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
		showModal,
		hideModal,
		modalMessage,
		showNextButton,
		setShowNextButton,
	};

	return <GameContext.Provider value={value}>
		{children}
		{modalMessage && <GuessModal message={modalMessage} />}
	</GameContext.Provider>
};


export const useGame = () => useContext(GameContext);
