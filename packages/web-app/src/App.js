import * as React from 'react';
import GuessPage from './pages/GuessPage';
import './App.css';
import AccountPage from './pages/AccountPage';
import CreateTown from './pages/CreateTown';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

	return (

		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AccountPage />} />
				<Route path="/GuessPage" element={<GuessPage />} />
				<Route path="/CreateTown" element={<CreateTown />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
