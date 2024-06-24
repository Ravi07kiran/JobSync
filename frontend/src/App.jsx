import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import FirstPage from "./components/firstpage/firstpage";
import Signup from "./components/signup/signup";
import Login from "./components/login/login";
import Forgot from "./components/login/forgotpass";
import Reset from "./components/login/resetpass";
import Home from "./components/home/home";
import Users from "./components/users/user";
import AddUsers from "./components/users/adduser";
import Employees from "./components/associates/associate";
import AddEmployee from "./components/associates/addassociate";
import EditEmployee from "./components/associates/editassociate";
import Category from "./components/jobdesc/jobdesc";
import AddCategory from "./components/jobdesc/addjobdesc";
import Profile from "./components/profile/profile";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./store";
import ProtectedRoute from "./components/ProtectRoute/ProtectedRoute";
import Choose from "./components/choose/choose";
import Uploader from "./components/uploader/uploader";
import Mapper from "./components/mapper/mapper";

import ContextMenu from "./components/context/ContextMenu";
import "./components/context/ContextMenu.css";

function App() {
  const dispatch = useDispatch();
  const [contextMenu, setContextMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login(id));
    }
  }, [dispatch]);

  const handleClose = () => {
    setContextMenu(null);
  };
 
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  };
  const contextMenuOptions = [
    { label: 'Home', onClick: () => {}, path: '/home' },
    { label: 'Profile', onClick: () => {}, path: '/home/profile' },
    { label: 'Logout', onClick: logout, path: '/login' },
  ];

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FirstPage />}></Route>
        <Route path="/choose" element={<Choose />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgotpass" element={<Forgot />}></Route>
        <Route path="/Uploader" element={<Uploader />}></Route>
        <Route path="/mapper" element={<Mapper />}></Route>
        <Route path="/resetpass/:id/:token" element={<Reset />}></Route>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home/user"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home/user/add"
          element={
            <ProtectedRoute>
              <AddUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home/employee"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home/employee/add"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home/employee/edit/:employeeId"
          element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home/Jobdescription"
          element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home/Uploader"
          element={
            <ProtectedRoute>
              <Uploader />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home/mapper"
          element={
            <ProtectedRoute>
              <Mapper />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home/Jobdescription/add"
          element={
            <ProtectedRoute>
              <AddCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      {location.pathname !== '/login' && (
        <ContextMenu
          options={contextMenuOptions}
          onClose={handleClose}
          navigate={navigate}
        />
      )}
    </div>
  );
}

const WrappedApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default WrappedApp;
