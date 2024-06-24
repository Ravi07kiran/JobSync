import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import PropTypes from "prop-types";
// import "./jobdesccard.css"; 
const JobDescriptionCard = ({ jobdescription, handleOpenUpdateModal, handleDelete }) => {
  return (
    <div className="task-card" key={jobdescription._id}>
      <h4>{jobdescription.position}</h4>
      <p>{jobdescription.job_location}</p>
      <p>{jobdescription.job_Id}</p>
      <p>
        {jobdescription.requiredSkills?.length > 0 ? (
          jobdescription.requiredSkills.join(", ")
        ) : (
          <span>No skills Mentioned</span>
        )}
      </p>
      <div className="button-container">
        <button title="Update" onClick={() => handleOpenUpdateModal(jobdescription)}>
          <FaRegEdit />
        </button>
        <button title="Delete" onClick={() => handleDelete(jobdescription._id)}>
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
};

JobDescriptionCard.propTypes = {
  jobdescription: PropTypes.object.isRequired,
  handleOpenUpdateModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default JobDescriptionCard;
