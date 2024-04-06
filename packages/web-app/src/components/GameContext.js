import React, {createContext, useCallback, useContext, useState} from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
	const [score, setScore] = useState(0);
	const [gameKey, setGameKey] = useState(0);
	const [trigger, setTrigger] = useState(0);
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
	const [town, setTown] = useState(JSON.parse(localStorage.getItem('selectedTown')) || null);

	// Define resetGame before including it in the value object
	const resetGame = useCallback(() => {
		setGameKey(prevKey => prevKey + 1);
		setScore(0);
		setTrigger(prevTrigger => prevTrigger + 1);
	}, []);

	const value = {
		score,
		setScore,
		user,
		setUser,
		gameKey,
		trigger,
		resetGame,
	};

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};


export const useGame = () => useContext(GameContext);
