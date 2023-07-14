import React, {useContext} from "react";
import {Avatar, Box, IconButton, useTheme} from "@mui/material";
import {ColorModeContext, tokens} from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SearchIcon from "@mui/icons-material/Search";


const Topbar = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const user = JSON.parse(localStorage.getItem("user"));
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/"
    }

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
        >
            {/* SEARCH BAR */}
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
                alignItems="center"
                px={2}
            >
                <SearchIcon sx={{mr: 1}}/>
                <InputBase placeholder="Search"/>
            </Box>

            {/* USER AVATAR AND LOGOUT */}
            <Box display="flex" alignItems="center">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon/>
                    ) : (
                        <LightModeOutlinedIcon/>
                    )}
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon/>
                </IconButton>
                <Avatar
                    alt="User Avatar"
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        mr: 1,
                        cursor: "pointer",
                    }}
                >
                    {user?.firstName ? `${user.firstName.charAt(0).toUpperCase()}${user.firstName.charAt(1).toUpperCase()}` : ''}
                </Avatar>
                <IconButton>
                    <ExitToAppIcon onClick={logout}/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default Topbar;
