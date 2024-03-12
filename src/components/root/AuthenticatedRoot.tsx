import { Outlet, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "../../assets/img/logo.png";
import "./AuthenticatedRoot.scss";
import theme from "../../styles/theme";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
export default function AuthenticatedRoot() {
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
            <img width="165px" src={logo} />
          </div>
         
          <div className="column space " style={{color:"red",  alignItems:"center", display:"flex", justifyContent:"end"}} >
            
          <NavLink to="/setting" style={{ marginRight: '10px' }}>
              <SettingsOutlinedIcon style={{fontSize:"20pt"}} />
            </NavLink>
            
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
    </>
  );
}
