
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaUserCircle } from "react-icons/fa";
// import "./sidenavbar.css";
// // import noData from "../img/nodata.png";

// const SideNavbar = () => {
//   const [userId, setUserId] = useState(null);
//   const [employees, setEmployee] = useState([]);
//   const [name, setUserName] = useState("");
//   const [allEmployees, setAllEmployees] = useState(null);
//   const [employeeTotal, setEmployeeTotal] = useState(0);
//   const [salaryTotal, setSalaryTotal] = useState(0);

//   const employeeCount = () => {
//     axios
//       .get(`http://localhost:4000/employee/employee_count`)
//       .then((response) => {
//         if (response.data.Status) {
//           setEmployeeTotal(response.data.Result);
//         } else {
//           console.error("Failed to fetch employee count");
//         }
//       })
//       .catch((error) => {
//         console.error("Error");
//       });
//   };



//   useEffect(() => {
//     const storedUserId = sessionStorage.getItem("id");
//     const storedName = sessionStorage.getItem("name");

//     if (storedName) {
//       setUserName(capitalizeFirstLetter(storedName));
//     }
//     if (storedUserId) {
//       setUserId(storedUserId);
//       employeeCount(storedUserId);
     
//     }
//   }, []);

//   const capitalizeFirstLetter = (str) => {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   };

//   useEffect(() => {
//     employeeCount();
    
//   }, []);

//   //get employee
//   const fetchEmployee = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:4000/employee/employees`
//       );
//       if (response.data.employees && response.data.employees.length > 0) {
//         setAllEmployees(response.data.employees);
//         setEmployee(response.data.employees);
//       } else {
//         console.log("No employees found or empty response.");
//       }
//     } catch (error) {
//       console.error("Error");
//     }
//   };

//   useEffect(() => {
//     fetchEmployee();
//   }, [allEmployees]);

//   const employeesList = employees || [];

//   return (
//     <div>
//       <div>
//         <div className="container">
//           <div className="flex-container">
//             <div className="custom-box">
//               <div className="custom-headings">
                
//                 <h4>Total Employee</h4>
//               </div>
//               <hr />
//               <div className="flex-row">
//                 <h5>Total:</h5>
//                 <h5>{employeeTotal}</h5>
//               </div>
//             </div>

//             <div className="custom-box">
//               <div className="custom-heading">
//                 <h4>Mapped Employee</h4>
//               </div>
//               <hr />
//               <div className="flex-row">
//                 <h5>Total:</h5>
//                 <h5>{}</h5>
//               </div>
//             </div>

//             <div className="custom-box">
//               <div className="custom-heading">
//                 <h4>Unmapped Employees</h4>
//               </div>
//               <hr />
//               <div className="flex-row">
//                 <h5>Total:</h5>
//                 <h5>{}</h5>
//               </div>
//             </div>
//           </div>

//           <div className="empcontainer">
//             <div className="mt-4 custom-section">
//               <h3>List of Employees</h3>
//             </div>
//             <div className="emptable-container">
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Tire</th>
//                     <th>Expirence</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {employeesList.length > 0 ? (
//                     employeesList.map((e) => (
//                       <tr key={e._id}>
//                         <td>{e.name}</td>
//                         <td>{e.email}</td>
//                         <td>{e.tier}</td>
//                         <td>{e.experience}</td>
                       
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5">
//                         <div className="no-data-message">
//                           {/* <img src={noData} alt="" className="nodata" /> */}
//                           <p className="no-data-text">
//                             No employees found. Add new employees from employees
//                             page.
//                           </p>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideNavbar;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./sidenavbar.css";
import FlexContainer from "../cards/sidenavcard";

const SideNavbar = () => {
  const [userId, setUserId] = useState(null);
  const [employees, setEmployee] = useState([]);
  const [name, setUserName] = useState("");
  const [allEmployees, setAllEmployees] = useState(null);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);

  const employeeCount = () => {
    axios
      .get(`http://localhost:4000/employee/employee_count`)
      .then((response) => {
        if (response.data.Status) {
          setEmployeeTotal(response.data.Result);
        } else {
          console.error("Failed to fetch employee count");
        }
      })
      .catch((error) => {
        console.error("Error");
      });
  };

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("id");
    const storedName = sessionStorage.getItem("name");

    if (storedName) {
      setUserName(capitalizeFirstLetter(storedName));
    }
    if (storedUserId) {
      setUserId(storedUserId);
      employeeCount(storedUserId);
    }
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    employeeCount();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/employee/employees`
      );
      if (response.data.employees && response.data.employees.length > 0) {
        setAllEmployees(response.data.employees);
        setEmployee(response.data.employees);
      } else {
        console.log("No employees found or empty response.");
      }
    } catch (error) {
      console.error("Error");
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [allEmployees]);

  const employeesList = employees || [];

  return (
    <div>
      <div>
        <div className="container">
          <FlexContainer employeeTotal={employeeTotal} />

          <div className="empcontainer">
            <div className="mt-4 custom-section">
              <h3>List of Employees</h3>
            </div>
            <div className="emptable-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Tire</th>
                    <th>Experience</th>
                  </tr>
                </thead>
                <tbody>
                  {employeesList.length > 0 ? (
                    employeesList.map((e) => (
                      <tr key={e._id}>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.tier}</td>
                        <td>{e.experience}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">
                        <div className="no-data-message">
                          {/* <img src={noData} alt="" className="nodata" /> */}
                          <p className="no-data-text">
                            No employees found. Add new employees from employees
                            page.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
