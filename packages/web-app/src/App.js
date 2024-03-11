import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from 'react';
import HomePage from './pages/HomePage';
import './App.css';
import {useState} from "react";
import LoginForm from './pages/LoginPage'; // Import the LoginForm component
import RegisterForm from './pages/RegisterPage'; // Import the RegisterForm component
import myImage from './5176230.png';
import AccountPage from './pages/AccountPage';
import TempHomePage from './pages/TempHomePage';
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
