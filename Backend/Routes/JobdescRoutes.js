const express = require("express");
const router = express.Router();
const JobDescription = require("../model/JobDescription");
const userModel = require("../model/signups");
const employee = require("../model/employee");

router.get("/JobDescriptions", async (req, res) => {
  try {
    const jobDescriptions = await JobDescription.find({});
    if (jobDescriptions.length > 0) {
      res.status(200).json({ JobDescriptions: jobDescriptions });
    } else {
      res.status(404).json({ message: "No job descriptions found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/add_JobDescription", async (req, res) => {
  try {
    const { position, job_location, job_Id, description, requiredSkills, recruiter_name, recruiter_email } = req.body;

    const newJobDescription = new JobDescription({
      position,
      job_location,
      job_Id,
      description,
      requiredSkills,
      recruiter_name,
      recruiter_email
    });
    
    await newJobDescription.save();
    res.status(200).json({ JobDescription: newJobDescription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.delete("/delete_JobDescription/:jobdescriptionId", async (req, res) => {
  try {
    const deletedJobDescription = await JobDescription.findByIdAndDelete(
      req.params.jobdescriptionId
    );

    if (!deletedJobDescription) {
      return res
        .status(404)
        .json({ Status: false, Error: "JobDescription not found" });
    }

    return res.json({ Status: true, Result: deletedJobDescription });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ Status: false, Error: "Internal Server Error" });
  }
});

router.put('/update_JobDescription/:jobdescriptionId', async (req, res) => {
  const { jobdescriptionId } = req.params;
  const updateData = req.body;

  try {
    
    if (updateData.requiredSkills) {
      updateData.requiredSkills = updateData.requiredSkills.map(skill => skill.value || skill);
    }

    const updatedJobDescription = await JobDescription.findByIdAndUpdate(
      jobdescriptionId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedJobDescription) {
      return res.status(404).json({ message: 'JobDescription not found' });
    }

    res.status(200).json({ updatedJobDescription });
  } catch (error) {
    console.error('Error updating JobDescription:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get("/jobdescription/:jobdescriptionId/matched_employees", async (req, res) => {
  try {
    const jobDescription = await JobDescription.findById(req.params.jobdescriptionId);
    if (!jobDescription) {
      return res.status(404).json({ message: "JobDescription not found" });
    }

    const employees = await employee.find({});
    const matchedEmployees = employees.filter((emp) => {

      const hasMatchingSkill = emp.skills.some((empSkill) =>
        jobDescription.requiredSkills.includes(empSkill.name)
      );

      return hasMatchingSkill && emp.location === jobDescription.job_location;
    });

    res.status(200).json({ matchedEmployees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.post("/jobdescription/map_employee_to_job", async (req, res) => {
  const { jobId, employeeId } = req.body;

  try {
    const jobDescription = await JobDescription.findById(jobId);
    const emp = await employee.findById(employeeId);

    if (!jobDescription || !emp) {
      return res.status(404).json({ message: "JobDescription or employee not found" });
    }

    if (jobDescription.matchedEmployees.includes(employeeId)) {
      return res.status(400).json({ message: "Employee is already mapped to this job description" });
    }

    jobDescription.matchedEmployees.push(employeeId);
    await jobDescription.save();

    jobDescription.mapped = true;
    await jobDescription.save();

    res.status(200).json({ success: true, mappingDetails: `Employee ${emp.name} mapped to Job: ${jobDescription.position}` });
  } catch (error) {
    console.error("Error mapping employee to job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




module.exports = router;