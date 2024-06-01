import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../sidenavbar/sidenavbar.css";
import "./jobdesc.css";
import "./addjobdesc.css";

const AddCategory = () => {
  const navigate = useNavigate();
  const [jobdesctitle, setjobdesctitle] = useState("");
  const [jobdescDescription, setjobdescDescription] = useState("");
  const [jobdescrequiredSkills,setjobdescrequiredSkills]= useState([]);
  // const [jobdesckeywords,setjobdesckeywords]=useState([]);

  const handleSkillChange = (event) => {
    const selectedSkill = event.target.value;
    
    if (!jobdescrequiredSkills.includes(selectedSkill)) {
      setjobdescrequiredSkills([...jobdescrequiredSkills, selectedSkill]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/JobDescription/add_JobDescription",
        {
          name: jobdesctitle,
          description: jobdescDescription,
          skills: jobdescrequiredSkills,
          // keywords : jobdesckeywords,
        }
      );
      console.log(response.data);
      navigate("/home/category");
    } catch (error) {
      console.error(error);
      navigate("/home/category");

      
    }
  };

  return (
    <div>
      <div className="addcatcontainer">
        <div className="addcatcontent rounded border">
          <h3 className="text-center">Add Category</h3>
          <form className="addcatform" onSubmit={handleSubmit}>
            <div className="addcatgroup">
              <label htmlFor="name" className="form-label">
                <strong>Title:</strong>
              </label>
              <input
                type="text"
                className="addcat form-control"
                id="name"
                placeholder="Name"
                required
                value={jobdesctitle}
                onChange={(e) => setjobdesctitle(e.target.value)}
              />
            </div>
            <div className="addcatgroup">
              <label htmlFor="description" className="form-label">
                <strong>Description:</strong>
              </label>
              <textarea
                id="description"
                className="addcat form-control custom-scrollbar"
                placeholder="Jobdescription Description"
                required
                value={jobdescDescription}
                onChange={(e) => setjobdescDescription(e.target.value)}
                style={{ resize: "none" }}
              />
            </div>
            <div className="addcatgroup">
            <label htmlFor="skills"> Required skills:</label>
            <select
        id="skills"
        name="skills"
        multiple
        onChange={handleSkillChange}
        value={jobdescrequiredSkills}
        
      >
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node.js">Node.js</option>
        <option value="Python">Python</option>
        
      </select>
            </div>

           
           

            
            <div className="addcatbtngroup">
              <button type="submit" className="cat-save">
                Add
              </button>
              <button
                type="submit"
                className="cat-close"
                onClick={() => navigate("/home/category")}
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
