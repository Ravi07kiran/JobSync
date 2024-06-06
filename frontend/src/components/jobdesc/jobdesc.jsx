import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import "../sidenavbar/sidenavbar.css";
import "./jobdesc.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./update.jsx";const Category = () => {
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
        console.log("No categories found or empty response.");
      }
    } catch (error) {
      console.error("Error fetching job descriptions", error);
    }
  };

  useEffect(() => {
    fetchJobdescs();
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
          <h3>Jobdescription List</h3>
        </div>
        <div className="catcenter">
          <div className="custom-content">
            <div className="categorytask">
              <Link to="/home/Jobdescription/add" className="custom-btn btn-9">
                Add Jobdescription
              </Link>
            </div>
          </div>
        </div>
        {jobdescriptionsList.length > 0 ? (
          <div className="task-cards-container">
            <div className="task-cards">
              {jobdescriptionsList.map((jobdescription) => (
                <div className="task-card" key={jobdescription._id}>
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
                  <div className="button-container">
                    <button
                      title="Update"
                      onClick={() =>
                        handleOpenUpdateModal(jobdescription)
                      }
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleDelete(jobdescription._id)}
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
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
            {/* <img src={noData} alt="" className="nodata" /> */}
            <p className="no-data-text">
              No jobdescDescription found. Add new categories to display in the list.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
