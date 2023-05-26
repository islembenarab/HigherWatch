import React from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DescriptionIcon from "@mui/icons-material/Description";

const ServiceTechnicianSpace = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      {/* HEADER */}
      <Box m={2}>
        <Header
          title="Service Technician Space"
          subtitle="Manage your platform"
        />
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
        {/* Card 1: Show List of Demands */}
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <ListAltIcon sx={{ fontSize: 60 }} color="primary" />
            <Typography variant="h6" component="div">
              Show List of Demands
            </Typography>
            <Typography sx={{ mt: 1 }} color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              malesuada finibus dolor id sollicitudin.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small">
              Show
            </Button>
          </CardActions>
        </Card>

        {/* Card 2: Announce Requirement Document */}
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <DescriptionIcon sx={{ fontSize: 60 }} color="primary" />
            <Typography variant="h6" component="div">
              Announce Requirement Document
            </Typography>
            <Typography sx={{ mt: 1 }} color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              malesuada finibus dolor id sollicitudin.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small">
              Announce
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default ServiceTechnicianSpace;
