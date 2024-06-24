import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import "./associatecard.css"; 

const EmployeeCard = ({ employee, deleteEmployee }) => {
  return (
    <div className="employee-card" key={employee._id}>
      <h4>EMPid: {employee.employeeid}</h4>
      <p>Name: {employee.name}</p>
      <p>Email: {employee.email}</p>
      <p>Tier: {employee.tier}</p>
      <p>Experience: {employee.experience} years</p>

      <div className="employee-card-actions" style={{ justifyContent: "flex-end" }}>
        <Link to={`/home/employee/edit/${employee._id}`} className="customedit btn-sm me-2">
          Edit
        </Link>
        <button className="customdelete btn-sm" onClick={() => deleteEmployee(employee._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

EmployeeCard.propTypes = {
  employee: PropTypes.object.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
};

export default EmployeeCard;
