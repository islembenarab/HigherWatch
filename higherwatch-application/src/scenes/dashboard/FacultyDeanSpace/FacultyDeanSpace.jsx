import React from "react";
import {Box, Button, Card, CardActions, CardContent, Typography, useTheme,} from "@mui/material";
import {tokens} from "../../../theme";
import Header from "../../../components/Header";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {useNavigate} from "react-router-dom";

const FacultyDeanSpace = () => {
  const navigate = useNavigate()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDarkMode = theme.palette.mode === "dark";
  const iconColor = isDarkMode ? colors.grey[100] : theme.palette.primary.main;
  const handleConsultDemandsDean=()=>{
    navigate("/demandsDean");
    window.scrollTo(0, 0);
  }
  return (
    <Box>
      {/* HEADER */}
      <Box m={2}>
        <Header title="Faculty Dean Space" subtitle="Manage your platform" />
      </Box>

      {/* CARD */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Card sx={{ width: 700 }}>
          <CardContent>
            <ListAltIcon sx={{ fontSize: 60, color: iconColor }} />
            <Typography variant="h6" component="div" mt={2}>
              Show List of Demands
            </Typography>
            <Typography color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              malesuada finibus dolor id sollicitudin.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small" onClick={handleConsultDemandsDean}>
              Show
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default FacultyDeanSpace;
