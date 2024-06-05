import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "React", label: "React" },
  { value: "Vue", label: "Vue" },
  { value: "Angular", label: "Angular" },
  { value: "Java", label: "Java" }
];

function UserSkills() {
  const [skills, setSkills] = useState([]);

  const handleChange = (skills) => {
    setSkills(skills || []);
  };

  return (
    <>
      <h2>Please select all your skills</h2>
      <form>
        <Select
          options={options}
          onChange={handleChange}
          value={skills}
          isMulti
        />
        <button>Next</button>
      </form>
    </>
  );
}

export default UserSkills;
