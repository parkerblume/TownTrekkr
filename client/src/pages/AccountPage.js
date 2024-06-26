import * as React from "react";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import LoginForm from "./LoginPage";
import RegisterForm from "./RegisterPage";
import classNames from 'classnames';
import SpinningGlobe from "../components/SpinningGlobe";

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
					width: '12.5rem', // Equivalent to 200px, scales with base font size
					height: '3.75rem', // Equivalent to 60px
					fontSize: '1.25rem', // Use rem for font sizes
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
			setIsImageAnimating(true);
			setAlignment(newAlignment);

			setTimeout(() => {
				setCurrentForm(newAlignment);
				setIsFormAnimating(false);
			}, 300);

			setTimeout(() => {
				setIsImageAnimating(false); // End image animation
			}, 600);
		}
	};

	return (
		<div className="flex h-full w-screen flex-col bg-custom-bg bg-cover bg-center ">
			<nav className="flex flex-row items-center justify-center w-full h-10vh bg-webAccent text-webSecondary ">
				<h1 className="text-5xl p-4 font-londrina-solid">Town Trekkr</h1>
			</nav>
			<div className="m-10 flex mb-24 flex-grow items-center justify-center rounded-3xl bg-opacity-70 bg-webTertiary backdrop-blur-sm">
				<div className="flex w-full h-max justify-between">
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
								sx={{width: 'auto', mb: 3, fontWeight: 'bold', fontSize: '3rem'}}
							>
								<ToggleButton value="Login" style={{width: '200px', height: '60px', fontSize: '1.25rem'}}>Login</ToggleButton>
								<ToggleButton value="Register" style={{width: '200px', height: '60px', fontSize: '1.25rem'}}>Register</ToggleButton>
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
						<SpinningGlobe/>
					</div>


				</div>
			</div>
		</div>
	);
}

export default AccountPage;
