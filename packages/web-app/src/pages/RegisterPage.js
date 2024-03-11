import * as React from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		navigate('/HomePage'); // Redirect to TempHomePage
	};

	return (
	<form className="w-1/2" onSubmit={handleSubmit}>
			<div className="grid gap-6 mb-6 md:grid-cols-2">
				<div>
					<label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
						name</label>
					<input type="text" id="first_name"
					       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					       placeholder="John" required/>
				</div>
				<div>
					<label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
					<input type="text" id="last_name"
					       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					       placeholder="Doe" required/>
				</div>
			</div>
			<div className="mb-6">
				<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
				<input type="email" id="email"
				       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				       placeholder="john.doe@company.com" required/>
			</div>
			<div className="mb-6">
				<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
				<input type="password" id="password"
				       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				       placeholder="•••••••••" required/>
			</div>
			{/*<div className="mb-6">*/}
			{/*	<label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm*/}
			{/*		password</label>*/}
			{/*	<input type="password" id="confirm_password"*/}
			{/*	       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"*/}
			{/*	       placeholder="•••••••••" required/>*/}
			{/*</div>*/}
			<button type="submit"
			        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
			</button>
		</form>
	);
}

export default RegisterForm;


