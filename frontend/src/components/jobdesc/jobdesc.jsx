import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
// import noData from "../img/nodata.png";
import "../sidenavbar/sidenavbar.css";
import "./jobdesc.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./update.jsx";

const Category = () => {

  const [jobdescriptions, setjobdescriptions] = useState([]);
  const [alljobdescriptions, setalljobdescriptions] = useState(null);
  // Add editingIndex state
  const [jobdesctitle, setjobdesctitle] = useState("");
  const [jobdescDescription, setjobdescDescription] = useState("");
  const [jobdescrequiredSkills, setjobdescrequiredSkills] = useState([]);
  const [jobdescriptionId, setSelectedId] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  //get categories
  const fetchjobdecs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/Jobdescription/JobDescriptions`
      );
      if (response.data.JobDescriptions && response.data.JobDescriptions.length > 0) {
        setalljobdescriptions(response.data.JobDescriptions);
        setjobdescriptions(response.data.JobDescriptions);
      } else {
        console.log("No categories found or empty response.");
      }
    } catch (error) {
      console.error("Error");
    }
  };

  useEffect(() => {
    fetchjobdecs();
  }, [alljobdescriptions]);
  // Check if categories is defined before mapping
  const jobdescriptionsList = jobdescriptions || [];

  const handleDelete = async (jobdescriptionId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/Jobdescription/delete_JobDescription/${jobdescriptionId}`
      );

      if (response.data.Status) {
        const updatedjobdescriptions = jobdescriptions.filter(
          (jobdescription) => jobdescription._id !== jobdescriptionId
        );
        setjobdescriptions(updatedjobdescriptions);
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

  //for update
  const handleOpenUpdateModal = (jobdescriptionId,jobdesctitle , jobdescDescription,jobdescrequiredSkills) => {
    setSelectedId(jobdescriptionId);
    setjobdesctitle(jobdesctitle);
    setjobdescDescription(jobdescDescription);
    setjobdescrequiredSkills(jobdescrequiredSkills);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedId(null);
    setjobdesctitle("");
    setjobdescDescription("");
    setjobdescrequiredSkills([]);
    setIsUpdateModalOpen(false);
  };

  //update
  const handleUpdate = async (
    jobdescriptionId,
    updatedTitle,
    updatedDescription,
    updatedskills
  ) => {
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
        const updatedjobdescriptions = jobdescriptionId.map((jobdescription) =>
          jobdescription._id === jobdescriptionId
            ? {
                ...jobdescription,
                title: response.data.updatedjobdescription.title,
                description: response.data.updatedjobdescription.description,
                requiredSkills: response.data.updatedskills.requiredSkills
              }
            : jobdescription
        );
        setjobdescDescription(updatedjobdescriptions);
        toast.success("Updated successfully!");
        handleCloseUpdateModal(); // Close the update modal
      } else {
        toast.success("Updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in updating. Please try again.");
    }
  };

  return (
    <div>
      <div>
        <div class="custom-container">
          <ToastContainer />
          <div className="catheader">
            <h3> Jobdescription List</h3>
          </div>
          <div className="catcenter">
            <div class="custom-content">
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
    <h3>{jobdescription.title}</h3>
    <p>{jobdescription.description}</p>
    <h3>{jobdescription.skills}</h3>
    <div className="button-container">
      <button
        title="Update"
        onClick={() =>
          handleOpenUpdateModal(
            jobdescription._id,
            jobdescription.title,
            jobdescription.description,
            jobdescription.skills
          )
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
                 title={jobdesctitle}
                 description={jobdescDescription}
                 skills={jobdescrequiredSkills}
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
    </div>
  );
};

export default Category;