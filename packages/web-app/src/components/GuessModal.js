import React from 'react';
import { useNavigate } from 'react-router-dom';

const GuessModal = ({ message }) => {
	const navigate = useNavigate();

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
			<div className="bg-white p-10 rounded-lg shadow-xl">
				<div className="mb-4">
					<p>{message}</p>
				</div>
				<button
					onClick={() => navigate('/MyTowns')}
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
				>
					Return to Town List
				</button>
			</div>
		</div>
	);
};

export default GuessModal;
