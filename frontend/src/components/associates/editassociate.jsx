import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../sidenavbar/sidenavbar.css";
import "./addassociates.css";
import "./editassociate.css";

const EditEmployee = () => {

  
 

  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    experience: "",
    tier: ""
  });

  const { employeeId } = useParams();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/employee/employee_s/${employeeId}`
        );
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:4000/employee/update_employee/${employeeId}`,
        employeeData
      );
      navigate("/home/employee");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div>
      <div className="addempcontainer">
        <div className="addempcontent rounded border">
          <h3 className="text-center">Edit Employee</h3>
          <form className="addempform" onSubmit={handleSubmit}>
            <div className="addempgroup">
              <label htmlFor="inputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="addemp form-control"
                id="inputName"
                name="name"
                placeholder={employeeData.name}
                required
                value={employeeData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="addempgroup">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
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
              <label htmlFor="inputTier" className="form-label">
                Tier
              </label>
              <input
                type="number"
                className="addemp form-control"
                id="inputTier"
                name="tier"
                placeholder="Enter Tier"
                required
                autoComplete="off"
                value={employeeData.tier}
                onChange={handleInputChange}
              />
            </div>
            <div className="addempgroup">
              <label htmlFor="inputExperience" className="form-label">
                Experience
              </label>
              <input
                type="number"
                className="addemp form-control"
                id="inputExperience"
                name="experience"
                placeholder="Enter Experience"
                required
                autoComplete="off"
                value={employeeData.experience}
                onChange={handleInputChange}
              />
            </div>
            <div className="editempgroup">
              <button type="submit" className="editemp-save">
                Save
              </button>
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

export default EditEmployee;
