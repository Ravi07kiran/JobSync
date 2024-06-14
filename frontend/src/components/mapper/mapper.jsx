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
  const [mappedEmployees, setMappedEmployees] = useState(new Set()); // Use Set to keep track of mapped employees

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

  const handleMapToJob = async (employeeId) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/Jobdescription/Jobdescription/map_employee_to_job`,
        {
          jobId: jobdescription._id,
          employeeId: employeeId,
        }
      );
      if (response.data.success) {
        // Update mappedEmployees set to include the newly mapped employee
        setMappedEmployees(new Set(mappedEmployees).add(employeeId));

        toast.success(`Successfully mapped employee to job: ${response.data.mappingDetails}`);
        // You can update UI or perform additional actions after successful mapping
      } else {
        toast.error('Failed to map employee to job. Please try again.');
      }
    } catch (error) {
      console.error('Error mapping employee to job:', error);
      toast.error('Failed to map employee to job. Please try again.');
    }
  };

  const isMapped = (employeeId) => {
    return mappedEmployees.has(employeeId);
  };

  return (
    <div className="details-card">
      <ToastContainer />
      <div className="details-header">
        <h2>{jobdescription.position}</h2>
        <p>Location: {jobdescription.job_location}</p>
        <p>Skills: {jobdescription.requiredSkills.join(', ')}</p>
      </div>
      <div className="top-profiles">
        <h3>Top Matching Profiles</h3>
        <div className="employee-table">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {matchingProfiles.length > 0 ? (
                matchingProfiles.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.name}</td>
                    <td>{employee.employeeid}</td>
                    <td>
                      {isMapped(employee._id) ? (
                        <span>Mapped</span>
                      ) : (
                        <button onClick={() => handleMapToJob(employee._id)}>Map</button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No matching profiles found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <button className="close-button" onClick={onClose}>Close</button>
    </div>
  );
};
export default Mapper;
