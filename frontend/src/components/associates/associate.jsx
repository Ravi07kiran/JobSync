import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./associate.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeCard from "../cards/associatecard";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  // Get employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:4000/employee/employees", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.employees && response.data.employees.length > 0) {
        setEmployees(response.data.employees);
      } else {
        console.log("No employees found or empty response.");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Delete employee
  const deleteEmployee = async (employeeId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/employee/delete_employee/${employeeId}`
      );

      if (response.data.Status) {
        const updatedEmployees = employees.filter((e) => e._id !== employeeId);
        setEmployees(updatedEmployees);
        toast.success("Deleted successfully!");
      } else {
        alert(response.data.Error);
        toast.error("Error in deleting. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Error in deleting. Please try again.");
    }
  };

  return (
    <div>
      <div className="empcontainer">
        <ToastContainer />
        <div className="empheader">
          <h3>Employees</h3>
        </div>
        <div className="empcenter">
          <div className="empcustom-content">
            <div className="emptask">
              <Link to="/home/employee/add" className="emp-btn btn-9">
                <span>Add Employee</span>
              </Link>
            </div>
          </div>
        </div>
        {employees.length > 0 ? (
          <div className="employee-card-container">
            {employees.map((employee) => (
              <EmployeeCard key={employee._id} employee={employee} deleteEmployee={deleteEmployee} />
            ))}
          </div>
        ) : (
          <div className="no-data-message">
            <p className="no-data-text">No employees found. Add new employees to display in the list.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;

