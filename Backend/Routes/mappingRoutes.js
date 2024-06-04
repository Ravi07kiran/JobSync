const express = require("express");
const router = express.Router();
const Employee = require("../model/employee");
const JobDescription = require("../model/JobDescription");

// Mapping Logic Endpoint
router.post("/map_employees_to_jobs", async (req, res) => {
  try {
    const jobDescriptions = await JobDescription.find({});
    const employees = await Employee.find({});

    jobDescriptions.forEach(async (jd) => {
      const matchingEmployees = employees.filter(employee => {
        // Check location match
        const isLocationMatch = employee.location === jd.location;

        // Check skills match with proficiency level 3 or above
        const areSkillsMatching = jd.requiredSkills.every(skill => {
          return employee.skills.some(empSkill => 
            empSkill.name === skill && empSkill.proficiency >= 3
          );
        });

        // Employee matches if both location and skills match
        return isLocationMatch && areSkillsMatching;
      });

      // Update the JobDescription with matched employees
      jd.matchedEmployees = matchingEmployees.map(emp => emp._id);
      await jd.save();
    });

    res.status(200).json({ message: "Mapping completed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
