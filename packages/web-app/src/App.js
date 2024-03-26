import * as React from 'react';
import HomePage from './pages/HomePage';
import './App.css';
import AccountPage from './pages/AccountPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AccountPage />} />
				<Route path="/HomePage" element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
