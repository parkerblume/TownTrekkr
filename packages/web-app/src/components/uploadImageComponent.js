// FileUploadComponent.js
import React, { useState } from 'react';

const PostUploadComponent = () => {
  const [message, setMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      console.log(process.env.REACT_APP_API_URL)
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, { // if local use https://localhost/
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('File uploaded successfully!');
      } else {
        setMessage('File upload failed.');
      }
    } catch (error) {
      setMessage('Error during file upload.');
      console.error('Error during file upload:', error);
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <input type="file" name="image" accept="image/*" required />
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default PostUploadComponent;