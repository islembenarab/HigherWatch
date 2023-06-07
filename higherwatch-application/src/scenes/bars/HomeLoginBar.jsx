import {AppBar, Box, Button, IconButton, Toolbar} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import {Link} from "react-router-dom";
import React, {useContext} from "react";
import {useTheme} from "@mui/material/styles";
import {ColorModeContext} from "../../theme";

const HomeLoginBar = ()=>{
    const logoStyle = {
        height: '100%',
        width: '23%',
    };
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    return <AppBar  color="secondary">
        <Toolbar>
            <Box display="flex" justifyContent={"left"} >
                {/* University Icon */}
                <IconButton style={logoStyle} href={"/"}>
                    <img src={theme.palette.logo.main} alt="Logo"  width={"100%"} height={"100%"}/>
                </IconButton>
                {/* Replace with the university icon from Material-UI Icons */}
            </Box>
            <Box flexGrow={1}/>
            <Box display="flex" alignItems="center">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon/>
                    ) : (
                        <LightModeOutlinedIcon/>
                    )}
                </IconButton>
            </Box>
            <Button component={Link} to="/loginform" color="inherit">
                Login
            </Button>
        </Toolbar>
    </AppBar>;
}
export default HomeLoginBar;