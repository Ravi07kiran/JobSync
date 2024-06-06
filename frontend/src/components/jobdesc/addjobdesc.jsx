import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../sidenavbar/sidenavbar.css";
import "./jobdesc.css";
import "./addjobdesc.css";

const options = [
  { value: "React", label: "React" },
  { value: "Vue", label: "Vue" },
  { value: "Angular", label: "Angular" },
  { value: "Java", label: "Java" }
];

const AddCategory = () => {
  const navigate = useNavigate();
  
  const [jobdescposition,setjobdescposition]=useState("");
  const [jobdesclocation,setjobdesclocation]=useState("");
  const [jobdescId, setjobdescId] = useState("");
  const [jobdescdescription, setjobdescdescription] = useState("");
  const [jobdescrequiredSkills, setjobdescrequiredSkills] = useState([]);
  const [jobdescrecruitername, setjobdescrecruitername]=useState("");
  const [jobdescrecruitermail, setjobdescrecruitermail]=useState("");

  const handleChange = (jobdescrequiredSkills) => {
    setjobdescrequiredSkills(jobdescrequiredSkills || []);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = jobdescrequiredSkills.map(skill => skill.value);
      const response = await axios.post(
        "http://localhost:4000/JobDescription/add_JobDescription",
        {
          position: jobdescposition, 
          job_location:jobdesclocation,
          job_Id: jobdescId,
          description: jobdescdescription,
          requiredSkills: skillsArray,
          recruiter_name:jobdescrecruitername,
          recruiter_email:jobdescrecruitermail,
        }
      );
      console.log(response.data);
      navigate("/home/Jobdescription");
    } catch (error) {
      console.error(error);
      navigate("/home/Jobdescription");
    }
  };

  return (
    <div>
      <div className="addcatcontainer">
        <div className="addcatcontent rounded border">
          <h3 className="text-center">Add Job Description</h3>
          <form className="addcatform" onSubmit={handleSubmit}>
            
          <div className="addcatgroup">
              <label htmlFor="Id" className="form-label">
                <strong>Job ID:</strong>
              </label>
              <input
                type="text"
                className="addcat form-control"
                id="Id" // Ensure the id matches the 'htmlFor' attribute
                placeholder="Id"
                required
                value={jobdescId}
                onChange={(e) => setjobdescId(e.target.value)}
              />
            </div>
             <div className="addcatgroup">
              <label htmlFor="position" className="form-label">
                <strong>Position:</strong>
              </label>
              <input
                type="text"
                className="addcat form-control"
                id="position" // Ensure the id matches the 'htmlFor' attribute
                placeholder="position"
                required
                value={jobdescposition}
                onChange={(e) => setjobdescposition(e.target.value)}
              />
            </div>
            <div className="addcatgroup">
              <label htmlFor="location" className="form-label">
                <strong>Location:</strong>
              </label>
              <input
                type="text"
                className="addcat form-control"
                id="location" // Ensure the id matches the 'htmlFor' attribute
                placeholder="location"
                required
                value={jobdesclocation}
                onChange={(e) => setjobdesclocation(e.target.value)}
              />
            </div>
            
            <div className="addcatgroup">
              <label htmlFor="description" className="form-label">
                <strong>Description:</strong>
              </label>
              <textarea
                id="description"
                className="addcat form-control custom-scrollbar"
                placeholder="Description"
                required
                value={jobdescdescription}
                onChange={(e) => setjobdescdescription(e.target.value)}
                style={{ resize: "none" }}
              />
            </div>
           
            <div className="addcatgroup">
              <label htmlFor="skills" className="form-label">
                <strong>Requiredskills:</strong>
              </label>
              <Select
              id="skills"
              name="skills"
              options={options}
              onChange={handleChange}
             value={jobdescrequiredSkills}
             isMulti
            />
            </div>
            
            <div className="addcatgroup">
              <label htmlFor="recruitername" className="form-label">
                <strong>Recruitername:</strong>
              </label>
              <input
                type="text"
                className="addcat form-control"
                id="recruitername"
                placeholder="recruitername"
                required
                value={jobdescrecruitername}
                onChange={(e) => setjobdescrecruitername(e.target.value)}
              />
            </div>

            <div className="addcatgroup">
              <label htmlFor="recruiteremail" className="form-label">
                <strong>Recruiter-mail:</strong>
              </label>
              <input
                type="email"
                className="addcat form-control"
                id="recruiteremail" // Ensure the id matches the 'htmlFor' attribute
                placeholder="recruiteremail"
                required
                value={jobdescrecruitermail}
                onChange={(e) =>setjobdescrecruitermail(e.target.value)}
              />
            </div>
            <div className="addcatbtngroup">
              <button type="submit" className="cat-save">
                Add
              </button>
              <button
                type="button" // Changed type to "button" to prevent form submission on close
                className="cat-close"
                onClick={() => navigate("/home/Jobdescription")}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;