import React from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const LoginForm = () => {
  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" align="center" mb={3}>
              Login Form
            </Typography>
            <form>
              <TextField
                fullWidth
                variant="outlined"
                type="email"
                label="Email"
                margin="normal"
              />
              <TextField
                fullWidth
                variant="outlined"
                type="password"
                label="Password"
                margin="normal"
              />
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                sx={{ mt: 3 }}
              >
                Login
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <IconButton sx={{ fontSize: "5rem" }}>
              <AccountCircle />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
