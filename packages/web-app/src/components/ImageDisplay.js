import React from 'react';

const ImageDisplay = () => {
  return (
    <img src={`${process.env.PUBLIC_URL}/images/placeholder.jpg`} alt="Placeholder" style={{ width: '100%', height: '100%' }} />
  );
};

export default ImageDisplay;
