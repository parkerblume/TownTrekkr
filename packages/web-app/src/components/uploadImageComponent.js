// FileUploadComponent.js
import React, { useState } from 'react';

const FileUploadComponent = () => {
  const [message, setMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await fetch('http://localhost:5000/upload', {
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

export default FileUploadComponent;