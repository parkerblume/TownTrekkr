import * as React from "react";
import { useNavigate } from "react-router-dom";
import {Alert, Snackbar} from "@mui/material";

function RegisterForm() {
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);

	const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	const handleSubmit = async (event) => {
		event.preventDefault();
		const email = event.target.email.value;
		const password = event.target.password.value;
		const username = event.target.username.value;

		if (!strongPasswordRegex.test(password)) {
			setOpen(true); // Open the snackbar
			return;
		}

		try {
			const response = await fetch('https://www.towntrekkr.com/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password, username }),
			});

			if (!response.ok) {
				throw new Error('Signup failed');
			}

			const data = await response.json();
			console.log('Signup successful:', data);
			navigate('/HomePage');
		} catch (error) {
			console.error('Error signing up:', error);
			// Handle signup failure (e.g., show an error message)
		}
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};


	return (
		<>
			<form className="w-1/2" onSubmit={handleSubmit}>
				<div className="mb-6">
					<label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User name</label>
					<input type="username" name="username" id="username"
					       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					       placeholder="helloworld!" required/>
				</div>
				<div className="mb-6">
					<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
					<input type="email" name="email" id="email"
					       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					       placeholder="john.doe@company.com" required/>
				</div>
				<div className="mb-6">
					<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
					<input type="password" name="password" id="password"
					       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					       placeholder="•••••••••" required/>
				</div>
				<button type="submit"
				        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
				</button>
			</form>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
					Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.
				</Alert>
			</Snackbar>
		</>
	);
}

export default RegisterForm;


