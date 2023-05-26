import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Header from "../../components/Header";
import WorkIcon from "@mui/icons-material/Work";
import image from "../../scenes/dashboard/IT.png";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // Import the university icon from Material-UI Icons
import "./Homepage.css"; // Import custom CSS file for animations

const Homepage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  // State to manage animation class
  const [animate, setAnimate] = useState(false);

  // Add animation class after the component has mounted
  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <Box>
      {/* TOP BAR */}
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Box display="flex" alignItems="center">
            {/* University Icon */}
            <AccountBalanceIcon fontSize="large" />{" "}
            {/* Replace with the university icon from Material-UI Icons */}
            <Typography variant="h6" component="div" ml={1}>
              HigherWatch
            </Typography>
          </Box>
          <Box flexGrow={1} />
          <Box display="flex" alignItems="center">
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
          </Box>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* HEADER */}
      <Box mt={10} mx={5} className={animate ? "animated-header" : ""}>
        <Header title="Platform for Project Management" />
      </Box>

      {/* MAIN CONTENT */}
      <Container>
        <Grid container spacing={2}>
          {/* Left Half */}
          <Grid item xs={12} sm={6}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              className={animate ? "animated-pop-up" : ""}
            >
              <Box textAlign="center">
                <WorkIcon sx={{ fontSize: 80, color: "grey" }} />
                <Typography variant="h4" component="div" mt={2}>
                  Manage and Monitor Your Projects
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/login"
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right Half */}
          <Grid item xs={12} sm={6}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              className={animate ? "animated-pop-up" : ""}
            >
              <img src={image} alt="Image" style={{ maxWidth: "100%" }} />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* FOOTER BAR */}
      <AppBar color="inherit" sx={{ mt: "auto", top: "auto", bottom: 0 }}>
        <Toolbar>
          <Box flexGrow={1}>
            <Typography variant="body2" color="textSecondary">
              &copy;HigherWatch. All rights reserved.
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" color="textSecondary">
              Powered by Your Company
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Homepage;
