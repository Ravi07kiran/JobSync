// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import "../sidenavbar/sidenavbar.css";
// import "./addassociates.css";
// import "./editassociate.css";

// const EditEmployee = () => {
//   const navigate = useNavigate();
//   const [employeeData, setEmployeeData] = useState({
//     employeeid: "",
//     name: "",
//     email: "",
//     tier: "",
//     experience: "",
//     skills: [],
//     location: ""
//   });

//   const { employeeId } = useParams();

//   useEffect(() => {
//     const fetchEmployeeData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:4000/employee/employee_s/${employeeId}`
//         );
//         setEmployeeData(response.data);
//       } catch (error) {
//         console.error("Error fetching employee data:", error);
//       }
//     };

//     fetchEmployeeData();
//   }, [employeeId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEmployeeData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSkillChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedSkills = employeeData.skills.map((skill, i) => 
//       i === index ? { ...skill, [name]: value } : skill
//     );
//     setEmployeeData((prevData) => ({
//       ...prevData,
//       skills: updatedSkills,
//     }));
//   };

//   const addSkill = () => {
//     setEmployeeData((prevData) => ({
//       ...prevData,
//       skills: [...prevData.skills, { name: "", proficiency: "" }],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `http://localhost:4000/employee/update_employee/${employeeId}`,
//         employeeData
//       );
//       navigate("/home/employee");
//     } catch (error) {
//       console.error("Error updating employee:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="addempcontainer">
//         <div className="addempcontent rounded border">
//           <h3 className="text-center">Edit Employee</h3>
//           <form className="addempform" onSubmit={handleSubmit}>
//             <div className="addempgroup">
//               <label htmlFor="inputEmployeeId" className="form-label">
//                 Employee ID
//               </label>
//               <input
//                 type="text"
//                 className="addemp form-control"
//                 id="inputEmployeeId"
//                 name="employeeid"
//                 required
//                 value={employeeData.employeeid}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="addempgroup">
//               <label htmlFor="inputName" className="form-label">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 className="addemp form-control"
//                 id="inputName"
//                 name="name"
//                 required
//                 value={employeeData.name}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="addempgroup">
//               <label htmlFor="inputEmail4" className="form-label">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className="addemp form-control"
//                 id="inputEmail4"
//                 name="email"
//                 required
//                 autoComplete="off"
//                 value={employeeData.email}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="addempgroup">
//               <label htmlFor="inputTier" className="form-label">
//                 Tier
//               </label>
//               <input
//                 type="number"
//                 className="addemp form-control"
//                 id="inputTier"
//                 name="tier"
//                 required
//                 autoComplete="off"
//                 value={employeeData.tier}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="addempgroup">
//               <label htmlFor="inputExperience" className="form-label">
//                 Experience
//               </label>
//               <input
//                 type="number"
//                 className="addemp form-control"
//                 id="inputExperience"
//                 name="experience"
//                 required
//                 autoComplete="off"
//                 value={employeeData.experience}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="addempgroup">
//               <label htmlFor="inputLocation" className="form-label">
//                 Location
//               </label>
//               <input
//                 type="text"
//                 className="addemp form-control"
//                 id="inputLocation"
//                 name="location"
//                 required
//                 value={employeeData.location}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="addempgroup">
//               <label className="form-label">Skills</label>
//               {employeeData.skills.map((skill, index) => (
//                 <div key={index} className="skill-group">
//                   <input
//                     type="text"
//                     className="addemp form-control skill-name"
//                     placeholder="Skill Name"
//                     name="name"
//                     value={skill.name}
//                     onChange={(e) => handleSkillChange(index, e)}
                    
//                   />
//                   <input
//                     type="number"
//                     className="addemp form-control skill-proficiency"
//                     placeholder="Proficiency"
//                     name="proficiency"
//                     value={skill.proficiency}
//                     min="1"
//                     max="3"
//                     onChange={(e) => handleSkillChange(index, e)}
                    
//                   />
                 
//                 </div>
//               ))}
              
//             </div>
//             <div className="editempgroup">
//             <button type="button" className="editemp-save" onClick={addSkill}>
//                 Add Skill
//               </button>
//               <button type="submit" className="editemp-save">
//                 Save
//               </button>
//               <button
//                 type="button"
//                 className="editemp-close"
//                 onClick={() => navigate("/home/employee")}
//               >
//                 Close
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditEmployee;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../sidenavbar/sidenavbar.css";
import "./addassociates.css";
import "./editassociate.css";

const EditEmployee = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    employeeid: "",
    name: "",
    email: "",
    tier: "",
    experience: "",
    skills: [],
    location: ""
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

  const handleSkillChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSkills = employeeData.skills.map((skill, i) => 
      i === index ? { ...skill, [name]: value } : skill
    );
    setEmployeeData((prevData) => ({
      ...prevData,
      skills: updatedSkills,
    }));
  };

  const addSkill = () => {
    setEmployeeData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, { name: "", proficiency: "" }],
    }));
  };

  const removeSkill = (index) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((_, i) => i !== index),
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
              <label htmlFor="inputEmployeeId" className="form-label">
                Employee ID
              </label>
              <input
                type="text"
                className="addemp form-control"
                id="inputEmployeeId"
                name="employeeid"
                required
                value={employeeData.employeeid}
                onChange={handleInputChange}
              />
            </div>
            <div className="addempgroup">
              <label htmlFor="inputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="addemp form-control"
                id="inputName"
                name="name"
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
                required
                autoComplete="off"
                value={employeeData.experience}
                onChange={handleInputChange}
              />
            </div>
            <div className="addempgroup">
              <label htmlFor="inputLocation" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="addemp form-control"
                id="inputLocation"
                name="location"
                required
                value={employeeData.location}
                onChange={handleInputChange}
              />
            </div>
            <div className="addempgroup">
              <label className="form-label">Skills</label>
              {employeeData.skills.map((skill, index) => (
                <div key={index} className="skill-group">
                  <input
                    type="text"
                    className="addemp form-control skill-name"
                    placeholder="Skill Name"
                    name="name"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, e)}
                  />
                  <input
                    type="number"
                    className="addemp form-control skill-proficiency"
                    placeholder="Proficiency"
                    name="proficiency"
                    value={skill.proficiency}
                    min="1"
                    max="3"
                    onChange={(e) => handleSkillChange(index, e)}
                  />
                  <button type="button" className="remove-skill-button" onClick={() => removeSkill(index)}>
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="editempgroup">
              <button type="button" className="editemp-save" onClick={addSkill}>
                Add Skill
              </button>
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
