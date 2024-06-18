import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./addassociates.css";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [employeeData, setEmployeeData] = useState({
    employeeid: "",
    name: "",
    email: "",
    tier: "",
    experience: "",
    skills: [{ name: "", proficiency: "" }],
    location: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSkills = employeeData.skills.map((skill, i) =>
      i === index ? { ...skill, [name]: value } : skill
    );
    setEmployeeData((prevData) => ({
      ...prevData,
      skills: updatedSkills,
    }));
  };

  const addSkill = () => {
    setEmployeeData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, { name: "", proficiency: "" }],
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/employee/add_employee",
        employeeData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      navigate("/home/employee");
    } catch (error) {
      console.error("Error adding employee:", error);
      setErrorMessage("Failed to add employee. Please try again later.");
    }
  };

  return (
    <div>
      <div className="addempcontainer">
        <div className="addempcontent rounded border">
          <h3 className="text-center">Add Employee</h3>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form className="addempform" onSubmit={submitForm}>
            <div className="addempgroup">
              <label htmlFor="inputEmployeeId" className="form-label">
                Employee ID
              </label>
              <input
                type="text"
                className="addemp form-control"
                id="inputEmployeeId"
                name="employeeid"
                required
                value={employeeData.employeeid}
                onChange={handleInputChange}
              />
            </div>
            <div className="addempgroup">
              <label htmlFor="inputName" className="form-label">Name</label>
              <input
                type="text"
                className="addemp form-control"
                id="inputName"
                name="name"
                placeholder="Enter Name"
                required
                value={employeeData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="addempgroup">
              <label htmlFor="inputEmail4" className="form-label">Email</label>
              <input
                type="email"
                className="addemp form-control"
                id="inputEmail4"
                name="email"
                placeholder="Enter Email"
                required
                autoComplete="off"
                value={employeeData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="addempgroup">
              <label htmlFor="inputTier" className="form-label">Tier</label>
              <input
                type="text"
                className="addemp form-control"
                id="inputTier"
                name="tier"
                placeholder="Enter Tier 0-5"
                required
                autoComplete="off"
                value={employeeData.tier}
                onChange={handleInputChange}
              />
            </div>
            <div className="addempgroup">
              <label htmlFor="inputExperience" className="form-label">Experience</label>
              <input
                type="text"
                className="addemp form-control"
                id="inputExperience"
                name="experience"
                placeholder="Enter in years"
                required
                autoComplete="off"
                value={employeeData.experience}
                onChange={handleInputChange}
              />
            </div>
            <div className="addempgroup">
              <label htmlFor="inputLocation" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="addemp form-control"
                id="inputLocation"
                name="location"
                placeholder="Enter Location"
                required
                value={employeeData.location}
                onChange={handleInputChange}
              />
            </div>
            <div className="addempgroup">
              <label className="form-label">Skills</label>
              {employeeData.skills.map((skill, index) => (
                <div key={index} className="skill-group">
                  <input
                    type="text"
                    className="addemp form-control skill-name"
                    placeholder="Skill Name"
                    name="name"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, e)}
                  />
                  <input
                    type="number"
                    className="addemp form-control skill-proficiency"
                    placeholder="Proficiency (1-5)"
                    name="proficiency"
                    value={skill.proficiency}
                    min="1"
                    max="3"
                    onChange={(e) => handleSkillChange(index, e)}
                  />
                </div>
              ))}
            </div>
            <div className="editempgroup">
            <button type="button" className="editemp-save" onClick={addSkill}>
                Add Skill
              </button>
              <button type="submit" className="editemp-save">Add</button>
              <button
                type="button"
                className="editemp-close"
                onClick={() => navigate("/home/employee")}
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

export default AddEmployee;
