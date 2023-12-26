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
import googleIcon from "../../assets/img/icons/google.svg";
import facebookIcon from "../../assets/img/icons/facebook.svg";
import tickIcon from "../../assets/img/icons/tick.svg";
import infinity from "../../assets/img/icons/infinity.svg";

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
        backgroundColor: "#FFF",
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
            Sign in
          </Typography>
          <Box className="socials">
            <div className="icon">
              <img src={googleIcon} width="34px"></img>
            </div>
            <div className="icon">
              <img src={facebookIcon} width="34px"></img>
            </div>
          </Box>
          <Typography
            variant="h1"
            fontFamily="Roboto"
            fontWeight="400"
            fontSize="28px"
            textAlign="center"
            color={theme.palette.text.secondary}
            className="mx-6"
          >
            or use your account
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

          <FormControlLabel
            sx={{
              alignSelf: "flex-start",
              marginLeft: "0px",
            }}
            onClick={() =>
              setRemember((prev) => {
                return !prev;
              })
            }
            control={
              <div className={`custom-checkbox`}>
                {true && (
                  <img
                    src={tickIcon}
                    className={`tick-icon ${remember ? "checked" : ""}`}
                  />
                )}
              </div>
            }
            label="Remember"
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
                <Link
                  href="#"
                  sx={{
                    color: "#999999 !important",
                    textDecoration: "none",
                  }}
                  variant="body1"
                >
                  Forgot your password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
      <div className="right">
        <div className="inner">
          <Typography
            variant="h1"
            fontFamily="Roboto"
            fontWeight="400"
            fontSize="45px"
            textAlign="center"
            color="#fff"
          >
            Hello there
          </Typography>
          <Typography
            variant="h1"
            fontFamily="Roboto"
            fontWeight="400"
            fontSize="24px"
            lineHeight="32px"
            textAlign="center"
            color="#fff"
          >
            Enter your personal details and start your journey with us
          </Typography>
          <Button
            variant="contained"
            disableElevation
            sx={{
              textTransform: "capitalize",
              backgroundColor: "#fff",
              mt: "10px",
              p: "10px 30px",
              fontSize: "16px",
              fontWeight: "16px",
              color: "#000 !important",
              transition: "opacity 0.3s",
              width: "212px",
              height: "40px",
              ":hover": {
                opacity: 0.7,
                backgroundColor: "white",
              },
            }}
            className="mr-10px"
            onClick={()=> navigate("/signup")}
          >
            Sign up
          </Button>
          <img src={infinity} />
        </div>
      </div>
    </Box>
  );
}

export default LoginScreen;
