const express = require("express");
const router = express.Router();
const JobDescription = require("../model/JobDescription");
const userModel = require("../model/signups");

// Get JobDescriptions
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

// Add JobDescription
router.post("/add_JobDescription", async (req, res) => {
  try {
    const { title, description, requiredSkills } = req.body;
    const newJobDescription = new JobDescription({
      title,
      description,
      requiredSkills,
      
    });
    await newJobDescription.save();
    res.status(200).json({ JobDescription: newJobDescription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete JobDescription
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

// Update JobDescription
router.put("/update_JobDescription/:jobdescriptionId", async (req, res) => {
  const { jobdescriptionId } = req.params;
  const { title, description, requiredSkills } = req.body;

  try {
    const updatedJobDescription = await JobDescription.findByIdAndUpdate(
      jobdescriptionId,
      { title, description, requiredSkills },
      { new: true }
    );

    if (!updatedJobDescription) {
      return res.status(404).json({ message: "JobDescription not found" });
    }

    res.status(200).json({ updatedJobDescription });
  } catch (error) {
    console.error("Error updating JobDescription:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
