import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import logo from "../../assets/img/logo.png";
import "./AuthenticatedRoot.scss";

export default function AuthenticatedRoot() {
  const navigate = useNavigate();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false); // State to control the visibility of the logout confirmation

  // Retrieve the user's role from localStorage
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Remove logged in flag
    localStorage.removeItem('accessToken'); // Remove token
    localStorage.removeItem('userRole'); // Remove user role
    navigate('/login'); // Redirect to login page
    setOpenLogoutDialog(false); // Close the dialog
  };

  // Toggle the logout confirmation dialog
  const toggleLogoutDialog = () => {
    setOpenLogoutDialog(!openLogoutDialog);
  };

  return (
    <>
      <Box
        className="AuthenticatedRoot"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <header>
          <div className="column flex flex-col justify-center">
            <img width="165px" src={logo} alt="Logo" />
          </div>
          <div className="" style={{color:"red", alignItems:"center", display:"flex", justifyContent:"space-between"}} >
            {/* Conditionally render the NavLink to /setting if userRole is 'Admin' */}
            {userRole === 'Admin' ? (
              <NavLink to="/setting" style={{ marginRight: '10px' }}>
                <SettingsOutlinedIcon style={{fontSize:"20pt"}} />
              </NavLink>
            ):<></>}
            <Button onClick={toggleLogoutDialog} style={{color: 'inherit', textTransform: 'none'}}>
              <ExitToAppIcon style={{fontSize:"20pt"}} /> Logout
            </Button>
          </div>
        </header>
        <div className="main-layout">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="main-content">
            <Outlet />
          </div>
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingY: "18px",
          }}
        >
          <Typography className="title-medium text-[var(--greyColor)]">
            Call Analytics Tool By ML Team
          </Typography>
        </Box>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onClose={toggleLogoutDialog}>
        <DialogTitle>{"Logout"}</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleLogoutDialog} color="primary">
            No
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
