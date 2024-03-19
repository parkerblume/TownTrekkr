import React from 'react';

const ImageDisplay = () => {
  return (
    // <img src={`${process.env.PUBLIC_URL}/images/placeholder.jpg`} alt="Placeholder" style={{ width: '100%', height: '100%' }} />
	  <div className="m-5 border-2 bg-white">Image Display
		  <div className="rounded-4xl overflow-hidden">
			  <img src="https://www.w3schools.com/w3images/lights.jpg" alt="Placeholder" style={{width: '100%', height: '100%'}}/>
		  </div>
	  </div>
  );
};

export default ImageDisplay;
