import React, { useState } from 'react';
import axios from 'axios';
import './Uploader.css'; 
import UploadCard from '../cards/uploadcard'; 

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
      <UploadCard
        selectedFile={selectedFile}
        handleFileChange={handleFileChange}
        handleFileUpload={handleFileUpload}
        uploadMessage={uploadMessage}
      />
    </div>
  );
};

export default Uploader;
