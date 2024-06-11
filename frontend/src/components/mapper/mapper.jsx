import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import "../sidenavbar/sidenavbar.css";
import "./mapper.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./update.jsx";

const Mapper = () => {
  const [jobdescriptions, setJobdescriptions] = useState([]);
  const [allJobdescriptions, setAllJobdescriptions] = useState(null);
  const [jobdescPosition, setJobdescPosition] = useState("");
  const [jobdescLocation, setJobdescLocation] = useState("");
  const [jobdescId, setJobdescId] = useState("");
  const [jobdescDescription, setJobdescDescription] = useState("");
  const [jobdescRequiredSkills, setJobdescRequiredSkills] = useState([]);
  const [jobdescRecruiterName, setJobdescRecruiterName] = useState("");
  const [jobdescRecruiterMail, setJobdescRecruiterMail] = useState("");
  const [jobdescriptionId, setSelectedId] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const fetchJobdescs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/Jobdescription/JobDescriptions`
      );
      if (response.data.JobDescriptions && response.data.JobDescriptions.length > 0) {
        setAllJobdescriptions(response.data.JobDescriptions);
        setJobdescriptions(response.data.JobDescriptions);
      } else {
        console.log("No job descriptions found or empty response.");
      }
    } catch (error) {
      console.error("Error fetching job descriptions", error);
    }
  };

  useEffect(() => {
    fetchJobdescs();
  }, [allJobdescriptions]);

  const jobdescriptionsList = jobdescriptions || [];

  const handleOpenUpdateModal = (jobdescription = {}) => {
    const {
      _id = '',
      position = '',
      job_location = '',
      job_Id = '',
      description = '',
      requiredSkills = [],
      recruiter_name = '',
      recruiter_email = '',
    } = jobdescription;

    setSelectedId(_id);
    setJobdescPosition(position);
    setJobdescLocation(job_location);
    setJobdescId(job_Id);
    setJobdescDescription(description);
    setJobdescRequiredSkills(requiredSkills.map((skill) => ({ value: skill, label: skill })));
    setJobdescRecruiterName(recruiter_name);
    setJobdescRecruiterMail(recruiter_email);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedId(null);
    setJobdescPosition('');
    setJobdescLocation('');
    setJobdescId('');
    setJobdescDescription('');
    setJobdescRequiredSkills([]);
    setJobdescRecruiterName('');
    setJobdescRecruiterMail('');
    setIsUpdateModalOpen(false);
  };

  const handleUpdate = async (
    jobdescriptionId,
    updatedPosition,
    updatedJobLocation,
    updatedJobId,
    updatedDescription,
    updatedSkills,
    updatedRecruiterName,
    updatedRecruiterEmail
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/Jobdescription/update_JobDescription/${jobdescriptionId}`,
        {
          position: updatedPosition,
          job_location: updatedJobLocation,
          job_Id: updatedJobId,
          description: updatedDescription,
          requiredSkills: updatedSkills.map(skill => skill.value),
          recruiter_name: updatedRecruiterName,
          recruiter_email: updatedRecruiterEmail
        }
      );
      console.log('Server response:', response.data);

      if (response.data.updatedJobDescription) {
        const updatedJobDescriptions = jobdescriptions.map(jobdescription =>
          jobdescription._id === jobdescriptionId
            ? response.data.updatedJobDescription
            : jobdescription
        );
        setJobdescriptions(updatedJobDescriptions);
        toast.success("Updated successfully!");
        handleCloseUpdateModal();
      } else {
        toast.error("Error in updating. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in updating. Please try again.");
    }
  };

  return (
    <div>
      <div className="custom-container">
        <ToastContainer />
        <div className="catheader">
          <h3>Jobdescription Mapper</h3>
        </div>
        <div className="catcenter">
        </div>
        {jobdescriptionsList.length > 0 ? (
          <div className="task-cards-container">
            <div className="task-cards">
              {jobdescriptionsList.map((jobdescription) => (
                <JobDescriptionItem
                  key={jobdescription._id}
                  jobdescription={jobdescription}
                  onUpdate={handleOpenUpdateModal}
                />
              ))}

              {isUpdateModalOpen && (
                <Update
                  jobdescriptionId={jobdescriptionId}
                  onClose={handleCloseUpdateModal}
                  onUpdate={handleUpdate}
                  position={jobdescPosition}
                  job_location={jobdescLocation}
                  job_Id={jobdescId}
                  description={jobdescDescription}
                  skills={jobdescRequiredSkills}
                  recruiter_name={jobdescRecruiterName}
                  recruiter_email={jobdescRecruiterMail}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="no-data-message">
            <p className="no-data-text">
              No job descriptions found. Add new descriptions to display in the list.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const JobDescriptionItem = ({ jobdescription, onDelete, onUpdate }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="task-card" onClick={handleClick}>
      <h4>{jobdescription.position}</h4>
      <p>{jobdescription.job_location}</p>
      <p>{jobdescription.job_Id}</p>
      <p>
        {jobdescription.requiredSkills?.length > 0 ? (
          jobdescription.requiredSkills.join(', ')
        ) : (
          <span>No skills Mentioned</span>
        )}
      </p>

      {showDetails && (
        <DetailsCard jobdescription={jobdescription} onClose={handleClick} />
      )}
    </div>
  );
};

const DetailsCard = ({ jobdescription, onClose }) => {
  const [matchingProfiles, setMatchingProfiles] = useState([]);
  const [mapped, setMapped] = useState(false);

  useEffect(() => {
    const fetchMatchedEmployees = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/Jobdescription/jobdescription/${jobdescription._id}/matched_employees`
        );
        if (response.data.matchedEmployees && response.data.matchedEmployees.length > 0) {
          setMatchingProfiles(response.data.matchedEmployees);
        } else {
          console.log("No matching employees found.");
        }
      } catch (error) {
        console.error("Error fetching matched employees:", error);
      }
    };

    fetchMatchedEmployees();
  }, [jobdescription]);

  return (
    <div className="details-card">
      <ToastContainer />
      <div className="details-header">
        <div className="details-header-left">
          <h2>{jobdescription.position}</h2>
          <p>Location: {jobdescription.job_location}</p>
          <p>Skills:</p>
          <ul>
            {jobdescription.requiredSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className="details-header-right">
          <p>{jobdescription.description}</p>
        </div>
      </div>
      <div className="top-profiles">
        <h3>Top Matching Profiles</h3>
        <div className="top-profiles-row">
          {matchingProfiles.length > 0 ? (
            matchingProfiles.map((employee, index) => (
              <div className="profile-card" key={index}>
                <p><strong>Name:</strong> {employee.name}</p>
                <p><strong>EMPID:</strong>{employee.employeeid}</p>
              </div>
            ))
          ) : (
            <p>No matching profiles found</p>
          )}
        </div>
      </div>
      <button className="close-button" onClick={onClose}>Close</button>
    </div>
  );
};



export default Mapper;
