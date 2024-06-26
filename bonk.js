// router.get("/jobdescription/:jobdescriptionId/matched_employees", async (req, res) => {
//   try {
//     const jobDescription = await JobDescription.findById(req.params.jobdescriptionId);
//     if (!jobDescription) {
//       return res.status(404).json({ message: "JobDescription not found" });
//     }

//     const employees = await employee.find({});
//     const matchedEmployees = employees.filter(emp => {

//       const requiredSkills = jobDescription.requiredSkills.flat();
//       return (
//         requiredSkills.every(reqSkill =>
//           emp.skills.some(empSkill => empSkill.name === reqSkill)
//         ) &&
//         emp.location === jobDescription.job_location
//       );
//     });

//     res.status(200).json({ matchedEmployees });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

<div className="emptable-container">
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>ID</th>
      </tr>
    </thead>
    <tbody>
      {matchingProfiles.length > 0 ? (
        matchingProfiles.map((employee, index) => (
          <tr key={index}>
            <td>{employee.name}</td>
            <td>{employee.empid}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="2">No matching profiles found</td>
        </tr>
      )}
    </tbody>
  </table>
</div>
