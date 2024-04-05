import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
	const [score, setScore] = useState(0);
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

	const value = {
		score,
		setScore,
		user,
		setUser,
	};

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => useContext(GameContext);
