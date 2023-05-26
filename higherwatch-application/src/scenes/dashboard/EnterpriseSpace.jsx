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
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BarChartIcon from "@mui/icons-material/BarChart";

const EnterpriseSpace = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isDarkMode = theme.palette.mode === "dark";
  const iconColor = isDarkMode ? colors.grey[100] : theme.palette.primary.main;

  return (
    <Box>
      {/* HEADER */}
      <Box m={2}>
        <Header title="Enterprise Space" subtitle="Manage your platform" />
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
        {/* Card 1: Manage Tasks */}
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <TaskAltIcon
              sx={{
                fontSize: 60,
                color: iconColor,
              }}
            />
            <Typography variant="h6" component="div">
              Manage Tasks
            </Typography>
            <Typography sx={{ mt: 1 }} color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              malesuada finibus dolor id sollicitudin.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small">
              Manage
            </Button>
          </CardActions>
        </Card>

        {/* Card 2: Show Statistics */}
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <BarChartIcon
              sx={{
                fontSize: 60,
                color: iconColor,
              }}
            />
            <Typography variant="h6" component="div">
              Show Statistics
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
      </Box>
    </Box>
  );
};

export default EnterpriseSpace;
