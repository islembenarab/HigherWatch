import React from "react";
import {Box, Button, Card, CardActions, CardContent, Typography, useTheme,} from "@mui/material";
import {tokens} from "../../theme";
import Header from "../../components/Header";
import ListAltIcon from "@mui/icons-material/ListAlt";

const FacultyDeanSpace = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
            <ListAltIcon sx={{ fontSize: 60, color: colors.primary[500] }} />
            <Typography variant="h6" component="div" mt={2}>
              Show List of Demands
            </Typography>
            <Typography color="text.secondary">
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

export default FacultyDeanSpace;
