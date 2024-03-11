import * as React from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		// Assuming 'username' is derived from 'first_name' and 'last_name' for this example
		const email = event.target.email.value;
		const password = event.target.password.value;
		const username = event.target.username.value; // Adjust this according to your requirements

		try {
			const response = await fetch('https://www.towntrekkr.com/api/signup', {
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
			navigate('/HomePage'); // Redirect to HomePage on success
		} catch (error) {
			console.error('Error signing up:', error);
			// Handle signup failure (e.g., show an error message)
		}
	};

	return (
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
	);
}

export default RegisterForm;


