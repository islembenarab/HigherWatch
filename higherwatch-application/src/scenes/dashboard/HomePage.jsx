import React, {useEffect, useState} from "react";
import {AppBar, Box, Button, Container, Grid, Toolbar, Typography,} from "@mui/material";
import {Link} from "react-router-dom";
import Header from "../../components/Header";
import WorkIcon from "@mui/icons-material/Work";
import image from "../../scenes/dashboard/IT.png";
import "./Homepage.css"; // Import custom CSS file for animations

const Homepage = () => {


  // State to manage animation class
  const [animate, setAnimate] = useState(false);

  // Add animation class after the component has mounted
  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <Box>
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
                  to="/loginform"
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

    </Box>
  );
};

export default Homepage;
