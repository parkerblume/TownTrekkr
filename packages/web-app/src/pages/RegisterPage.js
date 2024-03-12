import * as React from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Tooltip, Alert, Snackbar } from "@mui/material";

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

function RegisterForm() {
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
	const [tooltipError, setTooltipError] = React.useState({
		username: '',
		email: '',
		password: '',
	});

	const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const handleSubmit = async (event) => {
		event.preventDefault();
		const email = event.target.email.value;
		const password = event.target.password.value;
		const username = event.target.username.value;
		let hasError = false;

		// Reset tooltip errors on every submit
		setTooltipError({ username: '', email: '', password: '' });

		if (!username) {
			setTooltipError(prev => ({ ...prev, username: "Username is required" }));
			hasError = true;
		}
		if (!email) {
			setTooltipError(prev => ({ ...prev, email: "Email is required" }));
			hasError = true;
		} else if (!emailRegex.test(email)) {
			setTooltipError(prev => ({ ...prev, email: "Invalid email format" }));
			hasError = true;
		}
		if (!password) {
			setTooltipError(prev => ({ ...prev, password: "Password is required" }));
			hasError = true;
		} else if (!strongPasswordRegex.test(password)) {
			setOpen(true); // Open the snackbar with a general message
			setTooltipError(prev => ({ ...prev, password: "Password does not meet criteria" }));
			hasError = true;
			return;
		}

		if (hasError) return;

		try {
			const response = await fetch('https://www.towntrekkr.com/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, email, password }),
			});

			if (!response.ok) {
				throw new Error('Signup failed');
			}

			const data = await response.json();
			console.log('Signup successful:', data);
			navigate('/HomePage');
		} catch (error) {
			console.error('Error signing up:', error);
		}
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return (
		<ThemeProvider theme={theme}>
			<form className="w-1/2" onSubmit={handleSubmit}>
				{/* Username Field */}
				<div className="mb-6">
					<label htmlFor="username" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Username</label>
					<Tooltip title={tooltipError.username} open={Boolean(tooltipError.username)} placement="top" arrow>
						<input name="username" id="username"
						       className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 p-2.5 focus:border-blue-500 focus:ring-blue-500 dark:text:white dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-blue-500 dark:focus:ring-blue-500"
						       placeholder="username!" />
					</Tooltip>
				</div>
				{/* Email Field */}
				<div className="mb-6">
					<label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Email address</label>
					<Tooltip title={tooltipError.email} open={Boolean(tooltipError.email)} placement="top" arrow>
						<input name="email" id="email"
						       className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 p-2.5 focus:border-blue-500 focus:ring-blue-500 dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text:white dark:focus:border-blue-500 dark:focus:ring-blue-500"
						       placeholder="john.doe@company.com"/>
					</Tooltip>
				</div>
				{/* Password Field */}
				<div className="mb-6">
					<label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Password</label>
					<Tooltip title={tooltipError.password} open={Boolean(tooltipError.password)} placement="top" arrow>
						<input name="password" id="password"
						       className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 p-2.5 focus:border-blue-500 focus:ring-blue-500 dark:text:white dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-blue-500 dark:focus:ring-blue-500"
						       placeholder="•••••••••"/>
					</Tooltip>
				</div>
				<button type="submit"
				        className="w-full rounded-lg bg-blue-700 px-5 text-center text-sm font-medium text-white py-2.5 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 sm:w-auto dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
				</button>
			</form>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
					Ensure all fields are correctly filled and password meets the criteria.
				</Alert>
			</Snackbar>
		</ThemeProvider>
	);
}

export default RegisterForm;
