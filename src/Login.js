import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import HeliosAlert from "./components/Alert";
import { InitialTransition } from "./components/Transition";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        HeliosDevelopment
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [alertContent, setAlertContent] = useState("");

  const loginUser = async (credentials) => {
    return fetch("https://heliosjserver.herokuapp.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  };

  const handleSubmit = async (event) => {
    <InitialTransition />;
    event.preventDefault();
    const json = await loginUser({
      username,
      password,
    });
    if (json.status === "NO_USER") {
      setAlertContent("Dieser Nutzername konnte nicht gefunden werden!");
      setAlertType("error");
      setShowAlert(true);
    } else if (json.status === "CHECK_PASS") {
      setAlertContent("Ungültiges Password");
      setAlertType("error");
      setShowAlert(true);
    } else if (json.status === "UNKN") {
      setAlertContent("Unbekannter Fehler beim einloggen!");
      setAlertType("error");
      setShowAlert(true);
    } else if (json.status === "OK") {
      setAlertContent("Wilkommen " + json.username + "!");
      setAlertType("success");
      setShowAlert(true);
      setToken(json.token);
    } else {
      setAlertContent("Unbekannter Fehler beim einloggen!");
      setAlertType("error");
      setShowAlert(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Bitte Einloggen
          </Typography>
          {showAlert && <HeliosAlert text={alertContent} type={alertType} />}
          <Box
            className="login-wrapper"
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Benutzername"
              name="name"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Einloggen
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
