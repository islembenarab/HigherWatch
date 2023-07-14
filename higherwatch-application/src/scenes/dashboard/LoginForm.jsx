import React, {useEffect, useState} from "react";
import {Box, Button, Grid, IconButton, Paper, TextField, Typography,} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import Header from "../../components/Header";
import api from "../../api/api";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogIn = async (event) => {
        event.preventDefault();
        console.log(email,password)
        api.post('/accounts/api/auth/signIn', {email, password})
            .then((response) => {
                // Store the JWT token in local storage
                localStorage.setItem('token', response.data.token);

                // Redirect to the home page or a protected route
                localStorage.setItem('user', JSON.stringify(response.data.user));
                window.location.href="/dashboard"
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });
    };
    // State to manage animation class
    const [animate, setAnimate] = useState(false);

    // Add animation class after the component has mounted
    useEffect(() => {
        setAnimate(true);
    }, []);
    return (
        <Box display={"flex"} justifyContent={"center"}>

            <Box className={animate ? "animated-header" : ""}>
                <Box mt={10}>
                    <Header title="Platform for Project Management"/>
                </Box>
                <Box>
                    <Paper elevation={3} sx={{p: 3}}>
                        <Typography variant="h4" align="center" mb={3}>
                            Login Form
                        </Typography>
                        <Grid item xs={12} md={6}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                height="100%"
                            >
                                <IconButton>
                                    <AccountCircle/>
                                </IconButton>
                            </Box>
                        </Grid>
                        <form onSubmit={handleLogIn}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="email"
                                label="Email"
                                value={email} // Use 'password' directly instead of 'setPassword'
                                onChange={(e) => setEmail(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="password"
                                label="Password"
                                value={password} // Use 'password' directly instead of 'setPassword'
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                            />
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color={"primary"}
                                sx={{mt: 3}}
                            >
                                Login
                            </Button>
                        </form>
                    </Paper>

                </Box>
            </Box>
        </Box>

    )
        ;
};

export default LoginForm;
