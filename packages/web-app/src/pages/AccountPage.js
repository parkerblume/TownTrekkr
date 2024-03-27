import * as React from "react";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import LoginForm from "./LoginPage";
import RegisterForm from "./RegisterPage";
import NavigationBar from "../components/NavigationBar";
import classNames from 'classnames'; // Assuming you've added `classnames` to your project


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
					color: '#242105',
					opacity: 1.0,
					borderRadius: '20px',
					border: '3px solid #abc4ab',
					fontWeight: 'bold',
					'&:hover': {
						backgroundColor: '#969c8c',
					},
					'&.Mui-selected, &.Mui-selected:hover': {
						backgroundColor: '#abc4ab',
						shadow: '0px 0px 10px 5px #abc4ab',
						color: '#D9DFD6',
						opacity: 1.0,
					},
				},
			},
		},
	},
});

function AccountPage() {
	const [alignment, setAlignment] = useState('Login');

	const handleChange = (event, newAlignment) => {
		if (newAlignment !== null) {
			setAlignment(newAlignment);
		}
	};

	return (
		<div className="flex min-h-screen w-screen flex-col bg-custom-bg">
			<NavigationBar />
			<header className="h-12 w-full p-2 pl-7 bg-webSecondary">
				<h2 className="text-2xl font-bold text-webTertiary">Your Page Header</h2>
			</header>
			<div className="m-12 flex flex-grow items-center justify-center rounded-3xl bg-opacity-75 bg-webTertiary">
				<div className="flex w-full justify-between">
					<div className={classNames("w-1/2 flex flex-col items-center justify-start pt-32", {
						'toggle-animate': true,
						'form-slide-right': alignment === 'Register',
						'form-slide-left': alignment === 'Login',
					})}>
						<ThemeProvider theme={theme}>
							<ToggleButtonGroup
								value={alignment}
								exclusive
								onChange={handleChange}
								aria-label="Platform"
								sx={{width: 'auto', mb: 3}} // Maintain auto width for flexibility
							>
								<ToggleButton value="Login" style={{width: '120px'}}>Login</ToggleButton>
								<ToggleButton value="Register" style={{width: '120px'}}>Register</ToggleButton>
							</ToggleButtonGroup>
						</ThemeProvider>
						<div className="w-full flex justify-center "> {/* Adjusted for centering form */}
							{alignment === 'Login' ? (
								<LoginForm/>
							) : (
								<RegisterForm/>
							)}
						</div>
					</div>
					<div className={classNames("w-1/2 flex justify-center items-center bg-white bg-opacity-15 shadow-2xl m-2 rounded-2xl", {
						'toggle-animate': true,
						'image-slide-left': alignment === 'Register',
						'image-slide-right': alignment === 'Login',
					})}>
						<img src="../earth.png" alt="earth" style={{transform: 'scale(0.75)'}}/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AccountPage;
