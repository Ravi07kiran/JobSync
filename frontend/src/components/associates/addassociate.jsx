import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./addassociates.css";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  // Add employee
  const submitForm = async (e) => {
    e.preventDefault();
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      tier: e.target.tier.value,
      experience: e.target.experience.value
    };
  
    try {
      const response = await axios.post("http://localhost:4000/employee/add_employee", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
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
              <label htmlFor="inputName" className="form-label">Name</label>
              <input
                type="text"
                className="addemp form-control"
                id="inputName"
                name="name"
                placeholder="Enter Name"
                required
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
              />
            </div>
            <div className="editempgroup">
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
