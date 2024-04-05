import * as React from 'react';
import GuessPage from './pages/GuessPage';
import './App.css';
import AccountPage from './pages/AccountPage';
import CreateTownPage from './pages/CreateTownPage';
import HomePage from './pages/HomePage';
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
				<Route path="/HomePage" element={<HomePage />} />
				<Route path="/CreateTownPage" element={<CreateTownPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
