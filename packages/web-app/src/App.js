import * as React from 'react';
import GuessPage from './pages/GuessPage';
import './App.css';
import AccountPage from './pages/AccountPage';
import CreateTownPage from './pages/CreateTownPage';
import MyTowns from './pages/MyTowns';
import HomePage from './pages/HomePage';
import GamePage from "./pages/GamePage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './components/GameContext';


function App() {

	return (

		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AccountPage />} />
				<Route path="/GuessPage" element={
					<GameProvider>
						<GuessPage />
					</GameProvider>
				} />
				<Route path="/GamePage" element={<GamePage />} />
				<Route path="/HomePage" element={<HomePage />} />
				<Route path="/MyTowns" element={<MyTowns />} />
				<Route path="/CreateTownPage" element={<CreateTownPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
