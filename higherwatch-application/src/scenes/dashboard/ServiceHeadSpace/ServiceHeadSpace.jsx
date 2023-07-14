import React from "react";
import {Box, Button, Card, CardActions, CardContent, Typography, useTheme,} from "@mui/material";
import {tokens} from "../../../theme";
import Header from "../../../components/Header";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import BarChartIcon from "@mui/icons-material/BarChart";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import {useNavigate} from "react-router-dom";

const ServiceHeadSpace = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()
  const handleCreate =() =>{
    navigate("/CreateProject");
    window.scrollTo(0, 0);
  }
  const handleManageProjects=()=>{
    navigate("/manageProjects");
    window.scrollTo(0, 0);
  }
  const handleStatistics=()=>{
    navigate("/Statistics");
    window.scrollTo(0, 0);
  }
  const handleCreateContract=()=>{
    navigate("/createContract");
    window.scrollTo(0, 0);
  }
  return (
    <Box>
      {/* HEADER */}
      <Box m={2}>
        <Header title="Service Head Space" subtitle="Manage your platform" />
      </Box>

      {/* CARD GRID */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gap="20px"
        mt={4}
        mb={4}
        mx={2} // Add horizontal margin
        my={2} // Add vertical margin
      >
        {/* Card 1: Create the Contract */}
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <DescriptionIcon sx={{ fontSize: 60 }} color="primary" />
            <Typography variant="h6" component="div">
              Create the Contract
            </Typography>
            <Typography sx={{ mt: 1 }} color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              malesuada finibus dolor id sollicitudin.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small" onClick={handleCreateContract}>
              Create
            </Button>
          </CardActions>
        </Card>

        {/* Card 2: Manage Projects */}
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <AssignmentTurnedInIcon sx={{ fontSize: 60 }} color="primary" />
            <Typography variant="h6" component="div">
              Manage Projects
            </Typography>
            <Typography sx={{ mt: 1 }} color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              malesuada finibus dolor id sollicitudin.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small" onClick={handleManageProjects}>
              Manage
            </Button>
          </CardActions>
        </Card>
     {/* Card 3: Add Project */}
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <NoteAddIcon sx={{ fontSize: 60 }} color="primary" />
            <Typography variant="h6" component="div">
              Plan Project
            </Typography>
            <Typography sx={{ mt: 1 }} color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              malesuada finibus dolor id sollicitudin.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small" onClick={handleCreate}>
              Add Project
            </Button>
          </CardActions>
        </Card>

        {/* Card 4: Show Statistics */}
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <BarChartIcon sx={{ fontSize: 60 }} color="primary" />
            <Typography variant="h6" component="div">
              Show Statistics
            </Typography>
            <Typography sx={{ mt: 1 }} color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              malesuada finibus dolor id sollicitudin.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small" onClick={handleStatistics}>
              Show
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default ServiceHeadSpace;
