import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "../../assets/img/logo.png";
import "./AuthenticatedRoot.scss";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import theme from "../../styles/theme";
import liveCall from "../../assets/img/icons/live-call.svg";
import completedCall from "../../assets/img/icons/completed-call.svg";
import searchIcon from "../../assets/img/icons/search.svg";
import personIcon from "../../assets/img/icons/person.svg";
import chevronDown from "../../assets/img/icons/chevron-down.svg";
import Sidebar from "../sidebar/Sidebar";

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
          <div className="column icon-box flex justify-between">
            <Box className="flex flex-row justify-center gap-x-3">
              {/* <img width="26px" src={liveCall} /> */}
              <Box className="flex flex-col justify-center">
                {/* <Typography
                  variant="h1"
                  fontFamily="Montserrat"
                  fontWeight="400"
                  fontSize="14px"
                  marginBottom="2px"
                  color={theme.palette.success.main}
                >
                  26
                </Typography>
                <Typography
                  variant="h1"
                  fontFamily="Montserrat"
                  fontWeight="400"
                  fontSize="12px"
                  color={theme.palette.text.primary}
                >
                  Live
                </Typography> */}
              </Box>
            </Box>
            <Box className="flex flex-row justify-center gap-x-3">
              {/* <img width="26px" src={completedCall} /> */}
              {/* <Box className="flex flex-col justify-center">
                <Typography
                  variant="h1"
                  fontFamily="Montserrat"
                  fontWeight="400"
                  fontSize="14px"
                  marginBottom="2px"
                  color="#3375EC"
                >
                  657
                </Typography>
                <Typography
                  variant="h1"
                  fontFamily="Montserrat"
                  fontWeight="400"
                  fontSize="12px"
                  color={theme.palette.text.primary}
                >
                  Completed
                </Typography>
              </Box> */}
            </Box>
          </div>
          <div className="column space" />
          <div className="column settings flex justify-end align-center">
            <Box className="flex justify-end align-center gap-x-4">
              {/* <img width="22px" src={personIcon} />
              <img width="14px" src={chevronDown} /> */}
            </Box>
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
            {/* Track your calls and optimize your business with ease - Powered by */}
            Call Analytics Tool By ML Team
          </Typography>
        </Box>
      </Box>
    </>
  );
}
