import React, { useState } from 'react';
import axios from 'axios';
import './Uploader.css'; 

const Uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('csvFile', selectedFile);

    try {
      const response = await axios.post("http://localhost:4000/upload/Uploader", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadMessage(response.data.message);
    } catch (err) {
      console.error('Error uploading file:', err);
      setUploadMessage('Error uploading CSV data');
    }
  };

  return (
    <div className="uploaderContainer">
      <div className="uploadCard">
        <h1 className="uploadTitle">Associate uploader</h1>
        <input
          type="file"
          name="csvFile"
          onChange={handleFileChange}
          className="inputFileStyle"
        />
        <button
          onClick={handleFileUpload}
          disabled={!selectedFile}
          className="uploadButton"
        >
          Upload
        </button>
        <p className="uploadMessage">{uploadMessage}</p>
      </div>
    </div>
  );
};

export default Uploader;
