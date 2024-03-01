import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './App.css';
import {useState} from "react";


const theme = createTheme({
	palette: {
		selectForm: {
			main: '#ABC4AB',
			light: '#d2f3d2',
			dark: '#969c8c',
			contrastText: '#242105',
		},
	},
	components: {
		MuiToggleButton: {
			styleOverrides: {
				root: {
					// Default state
					backgroundColor: 'ABC4AB', // or any default color
					color: '#242105', // assuming default text color
					opacity: 1.0, // Default opacity
					borderRadius: '20px',
					border: '3px solid #abc4ab',
					fontWeight: 'bold',
					'&:hover': {
						backgroundColor: '#969c8c', // Light color for hover state
					},
					'&.Mui-selected, &.Mui-selected:hover': {
						backgroundColor: '#abc4ab', // Main color for selected state
						shadow: '0px 0px 10px 5px #abc4ab',
						color: '#D9DFD6', // Contrast text color for legibility
						opacity: 1.0, // Full opacity for selected state
					},
				},
			},
		},
	},
});

function App() {
	const [alignment, setAlignment] = useState('Login'); // Default to one option being selected

	const handleChange = (event, newAlignment) => {
		// Prevent deselecting all buttons by checking if newAlignment is not null
		if (newAlignment !== null) {
			setAlignment(newAlignment);
		}
	};

	return (
		<div className="h-screen w-screen bg-webBackground">
			<header className="h-14 w-full p-2 py-3 bg-webTertiary">
				<h1 className="text-4xl font-bold text-webPrimary">Town Trekker</h1>
			</header>
			<header className="h-12 w-full p-2 pl-7 bg-webSecondary">
				<h2 className="text-2xl font-bold text-webTertiary">idk what to put here</h2>
			</header>
			<div className="m-12 flex flex-col items-center justify-start rounded-3xl pb-52 opacity-75 bg-webTertiary">
				<div className="mt-6">
					<ThemeProvider theme={theme}>
						<ToggleButtonGroup
							value={alignment}
							exclusive
							onChange={handleChange}
							aria-label="Platform"
						>
							<ToggleButton value="Login">Login</ToggleButton>
							<ToggleButton value="Register">Register</ToggleButton>
						</ToggleButtonGroup>
					</ThemeProvider>
				</div>
				<div className="flex flex-row">
					<div className="w-1/2 h-96 bg-webPrimary rounded-tl-3xl"></div>
					<div className="w-1/2 h-96 bg-webPrimary rounded-tr-3xl"></div>

				</div>
			</div>
		</div>
	);
}

export default App;