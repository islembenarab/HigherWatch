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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";

const DepartmentHeadSpace = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box>
      {/* HEADER */}
      <Box m={2}>
        <Header title="Department Head Space" subtitle="Manage your platform" />
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
        {/* Card 1: Create Project Demand */}
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <AddCircleOutlineIcon
              sx={{
                fontSize: 60,
                color: isDarkMode ? colors.grey[100] : colors.primary.main,
              }}
            />
            <Typography variant="h6" component="div" mt={2}>
              Create Project Demand
            </Typography>
            <Typography color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              malesuada finibus dolor id sollicitudin.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small">
              Create
            </Button>
          </CardActions>
        </Card>

        {/* Card 2: Consult Project Demands */}
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <AssignmentIcon
              sx={{
                fontSize: 60,
                color: isDarkMode ? colors.grey[100] : colors.primary.main,
              }}
            />
            <Typography variant="h6" component="div" mt={2}>
              Consult Project Demands
            </Typography>
            <Typography color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              malesuada finibus dolor id sollicitudin.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small">
              Consult
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default DepartmentHeadSpace;
