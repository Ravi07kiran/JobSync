const express = require("express");
const router = express.Router();
const employee = require("../model/employee");
const userModel = require("../model/signups");


router.get("/employees", async (req, res) => {
  try {
    const employees = await employee.find({});
    if (employees.length > 0) {
      res.status(200).json({ employees });
    } else {
      res.status(404).json({ message: "No employees found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/employee_s/:employeeId", async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    if (!employeeId) {
      return res.status(400).json({ error: "Invalid or missing employee ID" });
    }
    const emp = await employee.findOne({ _id: employeeId });
    if (emp) {
      res.status(200).json(emp);
    } else {
      console.log("Employee not found for employeeId:", employeeId);
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error("Error fetching employee:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

router.post("/add_employee", async (req, res) => {
  try {
    const { employeeid, name, email, experience, tier, skills, location } = req.body;

    if (!employeeid || !name || !email || !experience || !tier  || !skills || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newEmployee = new employee({ employeeid, name, email, experience, tier, skills, location });
    await newEmployee.save();

    res.status(200).json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.delete("/delete_employee/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    if (!employeeId) {
      return res.status(400).json({ error: "Invalid employee ID" });
    }
    const result = await employee.findByIdAndDelete(employeeId);
    if (result) {
      res
        .status(200)
        .json({ Status: true, Message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ Status: false, Error: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Status: false, Error: "Internal Server Error" });
  }
});

router.get("/employee_count", async (req, res) => {
  try {
    const employeeCount = await employee.countDocuments({});
    res.json({ Status: true, Result: employeeCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Status: false, Error: "Internal Server Error" });
  }
});


router.put("/update_employee/:id", async (req, res) => {
  const { id } = req.params;
  const { employeeid, name, email, tier, experience, skills, location } = req.body;
  try {
    const updatedEmployee = await employee.findByIdAndUpdate(
      id,
      { employeeid, name, email, tier, experience, skills, location },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;