const express = require('express');
const router = express.Router();
const Employee = require('../model/Employee');
const JobDescription = require('../model/JobDescription');

// Scoring function
const calculateScore = (employee, jobDescription) => {
  let score = 0;

  // Calculate proficiency score
  jobDescription.requiredSkills.forEach(skill => {
    if (employee.skills[skill]) {
      score += employee.skills[skill]; // Assume proficiency is a numeric value
    }
  });

  // Calculate certification score
  jobDescription.requiredCertifications.forEach(cert => {
    if (employee.certifications.includes(cert)) {
      score += 20; // Arbitrary score for having a required certification
    }
  });

  // Calculate training score
  ['beginner', 'intermediate', 'advanced'].forEach(level => {
    if (employee.training[level]) {
      score += employee.training[level]; // Assume training is a numeric value (e.g., 0-100)
    }
  });

  // Add capstone project score
  score += employee.capstoneProjectScore;

  return score;
};

// Get top 5 employees for each job description
router.get('/mapJobDescriptionsToEmployees', async (req, res) => {
  try {
    const jobDescriptions = await JobDescription.find({});
    const employees = await Employee.find({});

    const mapping = {};

    jobDescriptions.forEach(jd => {
      const employeeScores = employees.map(emp => ({
        employee: emp,
        score: calculateScore(emp, jd)
      }));

      // Sort employees by score in descending order and select top 5
      employeeScores.sort((a, b) => b.score - a.score);
      mapping[jd._id] = employeeScores.slice(0, 5).map(item => item.employee);
    });

    res.status(200).json(mapping);
  } catch (error) {
    console.error('Error mapping job descriptions to employees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
