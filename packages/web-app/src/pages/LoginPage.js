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
		const email = event.target.email.value;
		const password = event.target.password.value;
		let hasError = false;

		// Reset tooltip state on every submit
		setShowTooltip({ email: false, password: false });

		// Check for empty fields and show tooltip
		if (!email) {
			setShowTooltip(prev => ({ ...prev, email: true }));
			hasError = true;
		}
		if (!password) {
			setShowTooltip(prev => ({ ...prev, password: true }));
			hasError = true;
		}

		// If there's an error, stop form submission
		if (hasError) return;

		try {
			const response = await fetch('https://www.towntrekkr.com/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				throw new Error('Login failed');
			}

			const data = await response.json();
			console.log('Login successful:', data);
			navigate('/HomePage'); // Redirect to HomePage on success
		} catch (error) {
			console.error('Error logging in:', error);
			// Handle login failure (e.g., show an error message)
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<form className="ml-6 w-5/6 bg-webAccent p-10 " onSubmit={handleSubmit}>
				<div className="mb-6">
					<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
					<Tooltip title="Please fill out this field" open={showTooltip.email} placement="top" arrow>
						<input name="email" id="email"
						       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						       placeholder="john.doe@company.com"/>
					</Tooltip>
				</div>
				<div className="mb-6">
					<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
					<Tooltip title="Please fill out this field" open={showTooltip.password} placement="top" arrow>
						<input name="password" id="password"
						       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text:white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						       placeholder="•••••••••"/>
					</Tooltip>
				</div>
				<button type="submit"
				        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
				</button>
			</form>
		</ThemeProvider>
	);
}

export default LoginForm;
