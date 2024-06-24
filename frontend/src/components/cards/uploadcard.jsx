import React from 'react';
import PropTypes from 'prop-types';
// import './uploadcard.css'; 
const UploadCard = ({ selectedFile, handleFileChange, handleFileUpload, uploadMessage }) => {
  return (
    <div className="uploadCard">
      <h1 className="uploadTitle">Associate Uploader</h1>
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
  );
};

UploadCard.propTypes = {
  selectedFile: PropTypes.object,
  handleFileChange: PropTypes.func.isRequired,
  handleFileUpload: PropTypes.func.isRequired,
  uploadMessage: PropTypes.string.isRequired,
};

export default UploadCard;
