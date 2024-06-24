import React, { useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
// import './jobupdate.css';

const options = [
  { value: 'React', label: 'React' },
  { value: 'Vue', label: 'Vue' },
  { value: 'Angular', label: 'Angular' },
  { value: 'Java', label: 'Java' },
  { value: "Dotnet", label: "Dotnet" },
  { value: "Python", label: "Python" }
];

const UpdateContent = ({
  jobdescriptionId,
  position,
  job_location,
  job_Id,
  description,
  skills,
  recruiter_name,
  recruiter_email,
  onUpdate,
  onClose
}) => {
  const [updatedPosition, setUpdatedPosition] = useState(position);
  const [updatedJobLocation, setUpdatedJobLocation] = useState(job_location);
  const [updatedJobId, setUpdatedJobId] = useState(job_Id);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedSkills, setUpdatedSkills] = useState(
    skills.map(skill => ({ value: skill.value, label: skill.label }))
  );
  const [updatedRecruiterName, setUpdatedRecruiterName] = useState(recruiter_name);
  const [updatedRecruiterEmail, setUpdatedRecruiterEmail] = useState(recruiter_email);

  const handleUpdate = () => {
    onUpdate(
      jobdescriptionId,
      updatedPosition,
      updatedJobLocation,
      updatedJobId,
      updatedDescription,
      updatedSkills,
      updatedRecruiterName,
      updatedRecruiterEmail
    );
  };

  const handleChange = (skills) => {
    setUpdatedSkills(skills.map(skill => ({ value: skill.value, label: skill.label })));
  };

  return (
    <div className="update-content">
      <h3 className="updatetext">Update Job Description</h3>
      <input
        type="text"
        className="todo-input"
        placeholder="Position"
        value={updatedPosition}
        onChange={(e) => setUpdatedPosition(e.target.value)}
      />
      <input
        type="text"
        className="todo-input"
        placeholder="Location"
        value={updatedJobLocation}
        onChange={(e) => setUpdatedJobLocation(e.target.value)}
      />
      <input
        type="text"
        className="todo-input"
        placeholder="Job ID"
        value={updatedJobId}
        onChange={(e) => setUpdatedJobId(e.target.value)}
      />
      <textarea
        className="todo custom-scrollbar"
        placeholder="Description"
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
      />
      <Select
        id="skills"
        name="skills"
        options={options} 
        onChange={handleChange}
        value={updatedSkills}
        isMulti
      />
      <input
        type="text"
        className="todo-input"
        placeholder="Recruiter Name"
        value={updatedRecruiterName}
        onChange={(e) => setUpdatedRecruiterName(e.target.value)}
      />
      <input
        type="email"
        className="todo-input"
        placeholder="Recruiter Email"
        value={updatedRecruiterEmail}
        onChange={(e) => setUpdatedRecruiterEmail(e.target.value)}
      />
      <div className="btns2">
        <button className="btnup" onClick={handleUpdate}>
          Update
        </button>
        <button className="btns" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

UpdateContent.propTypes = {
  jobdescriptionId: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  job_location: PropTypes.string.isRequired,
  job_Id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  recruiter_name: PropTypes.string.isRequired,
  recruiter_email: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateContent;
