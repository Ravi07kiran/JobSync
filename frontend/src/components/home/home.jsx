import React, {  } from "react";
import SideNavbar from "../sidenavbar/sidenavbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <SideNavbar />
    </div>
  );
};

export default Home;
