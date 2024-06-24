import React from "react";
import PropTypes from "prop-types";
// import "./sidenavcard.css";

const FlexContainer = ({ employeeTotal }) => {
  return (
    <div className="flex-container">
      <div className="custom-box">
        <div className="custom-headings">
          <h4>Total Employee</h4>
        </div>
        <hr />
        <div className="flex-row">
          <h5>Total:</h5>
          <h5>{employeeTotal}</h5>
        </div>
      </div>

      <div className="custom-box">
        <div className="custom-heading">
          <h4>Mapped Employee</h4>
        </div>
        <hr />
        <div className="flex-row">
          <h5>Total:</h5>
          <h5>{}</h5>
        </div>
      </div>

      <div className="custom-box">
        <div className="custom-heading">
          <h4>Unmapped Employees</h4>
        </div>
        <hr />
        <div className="flex-row">
          <h5>Total:</h5>
          <h5>{}</h5>
        </div>
      </div>
    </div>
  );
};

FlexContainer.propTypes = {
  employeeTotal: PropTypes.number.isRequired
};

export default FlexContainer;
