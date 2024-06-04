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
  const [jobdesctitle, setJobdesctitle] = useState("");
  const [jobdescDescription, setJobdescDescription] = useState("");
  const [jobdescrequiredSkills, setJobdescrequiredSkills] = useState([]);
  const [jobdescriptionId, setSelectedId] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const fetchJobdecs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/Jobdescription/JobDescriptions`
      );
      if (response.data.JobDescriptions && response.data.JobDescriptions.length > 0) {
        setAllJobdescriptions(response.data.JobDescriptions);
        setJobdescriptions(response.data.JobDescriptions);
      } else {
        console.log("No categories found or empty response.");
      }
    } catch (error) {
      console.error("Error");
    }
  };

  useEffect(() => {
    fetchJobdecs();
  }, [allJobdescriptions]);

  const jobdescriptionsList = jobdescriptions || [];

  const handleDelete = async (jobdescriptionId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/Jobdescription/delete_JobDescription/${jobdescriptionId}`
      );

      if (response.data.Status) {
        const updatedJobdescriptions = jobdescriptions.filter(
          (jobdescription) => jobdescription._id !== jobdescriptionId
        );
        setJobdescriptions(updatedJobdescriptions);
        toast.success("Deleted successfully!");
      } else {
        console.error("Failed to delete category");
        toast.error("Error in deleting. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in deleting. Please try again.");
    }
  };

  const handleOpenUpdateModal = (jobdescriptionId, jobdesctitle, jobdescDescription, jobdescrequiredSkills) => {
    setSelectedId(jobdescriptionId);
    setJobdesctitle(jobdesctitle);
    setJobdescDescription(jobdescDescription);
    setJobdescrequiredSkills(jobdescrequiredSkills);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedId(null);
    setJobdesctitle("");
    setJobdescDescription("");
    setJobdescrequiredSkills([]);
    setIsUpdateModalOpen(false);
  };

  const handleUpdate = async (jobdescriptionId, updatedTitle, updatedDescription, updatedskills) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/Jobdescription/update_JobDescription/${jobdescriptionId}`,
        {
          title: updatedTitle,
          description: updatedDescription,
          requiredSkills: updatedskills
        }
      );
      if (response.data.updatedjobdescription) {
        const updatedJobdescriptions = jobdescriptions.map((jobdescription) =>
          jobdescription._id === jobdescriptionId
            ? {
                ...jobdescription,
                title: response.data.updatedjobdescription.title,
                description: response.data.updatedjobdescription.description,
                requiredSkills: response.data.updatedjobdescription.requiredSkills
              }
            : jobdescription
        );
        setJobdescriptions(updatedJobdescriptions);
        toast.success("Updated successfully!");
        handleCloseUpdateModal();
      } else {
        toast.error("Failed to update. Please try again.");
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
          <h3>Jobdescription List</h3>
        </div>
        <div className="catcenter">
          <div className="custom-content">
            {/* <div className="categorytask">
              <Link to="/home/Mapper/add" className="custom-btn btn-9">
                Add Jobdescription
              </Link>
            </div> */}
          </div>
        </div>
        {jobdescriptionsList.length > 0 ? (
          <div className="task-cards-container">
            <div className="task-cards">
              {jobdescriptionsList.map((jobdescription) => (
                <JobDescriptionItem
                  key={jobdescription._id}
                  jobdescription={jobdescription}
                  onDelete={handleDelete}
                  onUpdate={handleOpenUpdateModal}
                />
              ))}

              {isUpdateModalOpen && (
                <Update
                  jobdescriptionId={jobdescriptionId}
                  onClose={handleCloseUpdateModal}
                  onUpdate={handleUpdate}
                  title={jobdesctitle}
                  description={jobdescDescription}
                  skills={jobdescrequiredSkills}
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
      <h3>{jobdescription.title}</h3>
      <p>{jobdescription.description}</p>
      <ul>
        {jobdescription.requiredSkills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
 
      {showDetails && (
        <DetailsCard jobdescription={jobdescription} onClose={handleClick} />
      )}
    </div>
  );
};

const DetailsCard = ({ jobdescription, onClose }) => {
  return (
    <div className="details-card">
      <h2>{jobdescription.title}</h2>
      <p>{jobdescription.description}</p>
      <h3>Required Skills</h3>
      <ul>
        {jobdescription.requiredSkills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Mapper;
