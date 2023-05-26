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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TechnicalCommitteeSpace = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      {/* HEADER */}
      <Box m={2}>
        <Header
          title="Technical Committee Space"
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
        {/* Card: Evaluate Projects */}
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <CheckCircleIcon sx={{ fontSize: 60 }} color="primary" />
            <Typography variant="h6" component="div">
              Evaluate Projects
            </Typography>
            <Typography sx={{ mt: 1 }} color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              malesuada finibus dolor id sollicitudin.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small">
              Evaluate
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default TechnicalCommitteeSpace;
