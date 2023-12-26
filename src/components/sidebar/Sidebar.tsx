import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import profilePic from "../../assets/img/profile-pic.png";
import theme from "../../styles/theme";
import NavList from "./NavList";
import './Sidebar.scss'

export default function Sidebar() {

  
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "0px",
          minHeight: "100%",
          width: "100%",
         
        }}
      >
        {/* <img width="120px" src={profilePic} /> */}
        {/* <Typography
          variant="h1"
          fontFamily="Roboto"
          fontWeight="400"
          fontSize="22px"
          marginBottom="2px"
          marginTop="8px"
          color={theme.palette.text.primary}
        >
          John
        </Typography>
        <Typography
          variant="h1"
          fontFamily="Roboto"
          fontWeight="500"
          fontSize="14px"
          color={theme.palette.text.primary}
        >
          Callwise
        </Typography> */}
        <NavList />
      </Box>
    </>
  );
}
