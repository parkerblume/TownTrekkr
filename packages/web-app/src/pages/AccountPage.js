import * as React from "react";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import LoginForm from "./LoginPage";
import RegisterForm from "./RegisterPage";
import classNames from 'classnames';
import SpinningGlobe from "../components/SpinningGlobe";
import NavigationBar from '../components/NavigationBar';

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
	const [currentForm, setCurrentForm] = useState('Login');
	const [isFormAnimating, setIsFormAnimating] = useState(false);
	const [isImageAnimating, setIsImageAnimating] = useState(false);

	const handleChange = (event, newAlignment) => {
		if (newAlignment !== null && newAlignment !== alignment) {
			setIsFormAnimating(true);
			setIsImageAnimating(true); // Start image animation
			setAlignment(newAlignment);

			// Wait for 500ms to swap the form (for the form animation)
			setTimeout(() => {
				setCurrentForm(newAlignment);
				setIsFormAnimating(false);
			}, 300); // Form animation duration

			// Use a different timeout for the image opacity animation if needed
			setTimeout(() => {
				setIsImageAnimating(false); // End image animation
			}, 600); // Adjust this duration for the image opacity animation
		}
	};

	return (
		<div className="flex min-h-screen w-screen flex-col bg-custom-bg">
			<NavigationBar />
			<div className="m-12 flex flex-grow items-center justify-center rounded-3xl bg-opacity-70 bg-webTertiary backdrop-blur-sm">
				<div className="flex w-full h-screen justify-between">
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
						<div className="w-full flex justify-center">
							{currentForm === 'Login' ? (
								<LoginForm/>
							) : (
								<RegisterForm/>
							)}
						</div>
					</div>
					<div className={classNames("w-1/2 flex justify-center items-center shadow-2xl m-2 rounded-2xl image-opacity", {
						'toggle-animate': true,
						'image-slide-left': alignment === 'Register',
						'image-slide-right': alignment === 'Login',
						'opacity-animate': isImageAnimating, // This class should only be added when animating
					})}>
						<SpinningGlobe />
					</div>


				</div>
			</div>
		</div>
	);
}

export default AccountPage;
