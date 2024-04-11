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
	const [tooltipError, setTooltipError] = React.useState({ username: '', email: '', password: '', });

	const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const getPasswordError = (password) => {
		if (password.length < 8) return "Password must be at least 8 characters";
		if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
		if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
		if (!/\d/.test(password)) return "Password must contain at least one digit";
		if (!/[@$!%*?&]/.test(password)) return "Password must contain at least one special character (@$!%*?&)";
		return "";
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const email = event.target.email.value.trim().toLowerCase();
		const password = event.target.password.value;
		const username = event.target.username.value.trim();
		let hasError = false;

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
		} else {
			const passwordError = getPasswordError(password);
			if (passwordError) {
				setOpen(true);
				setTooltipError(prev => ({ ...prev, password: passwordError }));
				hasError = true;
				return;
			}
		}

		if (hasError) return;

		try {
			const response = await fetch('/api/user/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, email, password }),
			});

			if (!response.ok) {
				console.error('Signup failed');
				return;
			}

			const data = await response.json();
			if (data) {
				localStorage.setItem('user', JSON.stringify({
					id: data._id,
					name: data.name,
					email: data.email,
					verified: data.verified,
				}));
			}

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
			<form className="ml-6 w-5/6 mb-30.5 min-h-fit p-10 bg-stone-600 shadow-2xl rounded-2xl" onSubmit={handleSubmit}>
				{/* Username Field */}
				<div className="mb-6">
					<label htmlFor="username" className="mb-2 block font-medium text-white text-xl">Username</label>
					<Tooltip title={tooltipError.username} open={Boolean(tooltipError.username)} placement="top" arrow>
						<input name="username" id="username"
						       className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-4 focus:border-blue-500 focus:ring-blue-500 dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text:white dark:focus:border-blue-500 dark:focus:ring-blue-500"
						       placeholder="Choose your username"/>
					</Tooltip>
				</div>
				{/* Email Field */}
				<div className="mb-6">
					<label htmlFor="email" className="mb-2 block font-medium text-white text-xl">Email address</label>
					<Tooltip title={tooltipError.email} open={Boolean(tooltipError.email)} placement="top" arrow>
						<input type="email" name="email" id="email"
						       className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-4 focus:border-blue-500 focus:ring-blue-500 dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text:white dark:focus:border-blue-500 dark:focus:ring-blue-500"
						       placeholder="you@example.com"/>
					</Tooltip>
				</div>

				{/* Password Field */}
				<div className="mb-6">
					<label htmlFor="password" className="mb-2 block text-xl font-medium text-white">Password</label>
					<Tooltip title={tooltipError.password} open={Boolean(tooltipError.password)} placement="top" arrow>
						<input type="password" name="password" id="password"
						       className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-4 focus:border-blue-500 focus:ring-blue-500 dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text:white dark:focus:border-blue-500 dark:focus:ring-blue-500"
						       placeholder="••••••••"/>
					</Tooltip>
				</div>
				<button type="submit"
				        className="w-full rounded-lg bg-blue-700 px-4 text-center text-xl font-bold text-white py-2 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 sm:w-auto dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
				</button>
			</form>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
					Ensure all fields are correctly filled and password meets the criteria.
				</Alert>
			</Snackbar>
		</ThemeProvider>
	);
}

export default RegisterForm;
