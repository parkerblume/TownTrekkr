import React from 'react';

const ImageDisplay = () => {
	return (
		<div className="m-10 border-2 border-black rounded-2xl bg-white h-full ml-28 mr-14 mb-24 overflow-hidden">
			<div className="rounded-4xl h-full">
				<img src="/running.jpg" alt="Placeholder" className="w-auto h-full object-cover mx-auto"/>
			</div>
		</div>
	);
};

export default ImageDisplay;
