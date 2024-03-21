import {createTheme, ThemeProvider} from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import LoginForm from "./LoginPage";
import RegisterForm from "./RegisterPage";
import * as React from "react";
import {useState} from "react";
import NavigationBar from "../components/NavigationBar";


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
					color: '#242105', // assuming default text color
					opacity: 1.0, // Default opacity
					borderRadius: '20px',
					border: '3px solid #abc4ab',
					fontWeight: 'bold',
					width: '50%', // Set each button to take up 50% of the width
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

function AccountPage() {
	const [alignment, setAlignment] = useState('Login'); // Default to one option being selected

	const handleChange = (event, newAlignment) => {
		// Prevent deselecting all buttons by checking if newAlignment is not null
		if (newAlignment !== null) {
			setAlignment(newAlignment);
		}
	};

	return (
		<div className="flex min-h-screen w-screen flex-col bg-custom-bg">
			<NavigationBar />
			<header className="h-12 w-full p-2 pl-7 bg-webSecondary">
				<h2 className="text-2xl font-bold text-webTertiary">idk what to put here</h2>
			</header>
			<div className="m-12 flex flex-grow flex-col items-center justify-start rounded-3xl bg-opacity-75 pb-12 bg-webTertiary">
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
				<div id="forms" className="flex w-full">
					<div className="w-1/2 p-4 pt-20"> {/* Adjusted width to 50% */}
						{alignment === 'Login' ? (
							<LoginForm/>
						) : (
							<RegisterForm/>
						)}
					</div>
					<div className="flex w-3/5 items-center justify-center">
						<img src="../earth.png" alt="earth" style={{transform: 'scale(0.75)'}}/>
					</div>
				</div>


			</div>
		</div>
	);
}

export default AccountPage;
