import * as React from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
	components: {
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					backgroundColor: '#55a25a', // Dark green
					color: 'white',
					fontSize: '0.875rem',
				},
			},
		},
	},
});


function LoginForm() {
	const navigate = useNavigate();
	const [showTooltip, setShowTooltip] = React.useState({ email: false, password: false });

	const handleSubmit = async (event) => {
		event.preventDefault();
		const email = event.target.email.value.trim().toLowerCase(); // Normalize email input
		const password = event.target.password.value; // Password input remains unchanged
		let hasError = false;

		setShowTooltip({ email: false, password: false }); // Reset tooltip state on every submit

		if (!email) {
			setShowTooltip(prev => ({ ...prev, email: true }));
			hasError = true;
		}
		if (!password) {
			setShowTooltip(prev => ({ ...prev, password: true }));
			hasError = true;
		}

		if (hasError) return;

		try {
			const response = await fetch('/api/user/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				console.error('Login failed');
				return;
			}

			const data = await response.json();
			if (data && data.id) {
				localStorage.setItem('user', JSON.stringify({
					id: data.id,
					name: data.username,
					email: data.email,
					verified: data.verified,
				}));
			}

			navigate('/HomePage');
		} catch (error) {
			console.error('Error logging in:', error);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<form className="ml-6 w-5/6 mb-60 p-10 bg-stone-600 shadow-2xl rounded-2xl" onSubmit={handleSubmit}>
				<div className="mb-6">
					<label htmlFor="email" className="mb-2 block font-medium text-white text-xl">Email address</label>
					<Tooltip title="Please fill out this field" open={showTooltip.email} placement="top" arrow>
						<input type="email" name="email" id="email"
						       className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-4 focus:border-blue-500 focus:ring-blue-500 dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text:white dark:focus:border-blue-500 dark:focus:ring-blue-500"
						       placeholder="john.doe@company.com"/>
					</Tooltip>
				</div>
				<div className="mb-6">
					<label htmlFor="password" className="mb-2 block text-xl font-medium text-white">Password</label>
					<Tooltip title="Please fill out this field" open={showTooltip.password} placement="top" arrow>
						<input type="password" name="password" id="password" // Obscure password input
						       className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-4 focus:border-blue-500 focus:ring-blue-500 dark:text:white dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-blue-500 dark:focus:ring-blue-500"
						       placeholder="•••••••••"/>
					</Tooltip>
				</div>
				<button type="submit"
				        className="w-full rounded-lg bg-blue-700 px-4 text-center text-xl font-bold text-white py-2 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 sm:w-auto dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
				</button>
			</form>
		</ThemeProvider>
	);
}

export default LoginForm;
