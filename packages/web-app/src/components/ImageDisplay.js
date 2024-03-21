import React from 'react';

const ImageDisplay = () => {
	return (
		<div className="mx-20 mt-10 h-full overflow-hidden rounded-2xl border-2 border-black bg-white">
			<div className="h-full rounded-4xl">
				<img src="/running.jpg" alt="Placeholder" className="mx-auto h-full w-auto object-cover"/>
			</div>
		</div>
	);
};

export default ImageDisplay;
