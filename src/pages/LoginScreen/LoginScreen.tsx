import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  InputBase,
  Link,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import theme from "../../styles/theme";

import "./LoginScreen.scss";
import CustomTextField from "../../components/customTextField/CustomTextField";
import { useNavigate } from "react-router-dom";

function LoginScreen(): JSX.Element {
  const navigate = useNavigate();

  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [remember, setRemember] = useState<boolean>(true);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    setFieldValue: Dispatch<SetStateAction<string>>
  ) => {
    setFieldValue(event.target.value);
  };

  return (
    <Box
      className="login"
      sx={{
        display: "flex",
        flexDirection: "row",
        margin: "26px 24px",
        width: "-webkit-fill-available",
        height: "100%",
        flexGrow: 1,
        backgroundColor: "white",
            
      }}
    >
      <div className="left">
        <div className="inner">
          <Typography
            variant="h1"
            fontFamily="Roboto"
            fontWeight="400"
            fontSize="45px"
            textAlign="center"
            color={theme.palette.primary.main}
            className="mx-6"
          >
            Login
          </Typography>
    
          <CustomTextField
            label="Email"
            type="email"
            onChange={(event) => handleInputChange(event, setEmail)}
            value={email}
          />
          <CustomTextField
            label="Password"
            type="password"
            onChange={(event) => handleInputChange(event, setPassword)}
            value={password}
          />

    
          <Box sx={{ width: "100%" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              sx={{
                mb: 1,
                color: "#fff !important",
                fontFamily: "Roboto",
                fontWeight: "400",
                fontSize: "24px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#AF1C23",
                },
              }}
              size="large"
            >
              Sign in
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>




    </Box>
  );
}

export default LoginScreen;
