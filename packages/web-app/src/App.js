import * as React from 'react';
import GuessPage from './pages/GuessPage';
import './App.css';
import AccountPage from './pages/AccountPage';
import CreateTownPage from './pages/CreateTownPage';
import MyTowns from './pages/MyTowns';
import HomePage from './pages/HomePage';
import PasswordPage from './pages/PasswordPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

	return (

		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AccountPage />} />
				<Route path="/GuessPage" element={<GuessPage />} />
				<Route path="/HomePage" element={<HomePage />} />
				<Route path="/MyTowns" element={<MyTowns />} />
				<Route path="/CreateTownPage" element={<CreateTownPage />} />
				<Route path="/ResetPassword/:token" element={<PasswordPage/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
