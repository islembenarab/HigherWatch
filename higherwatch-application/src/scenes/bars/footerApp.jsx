import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import React from "react";

const FooterApp = ()=>{

    return<AppBar color="inherit" sx={{ mt: "auto", top: "auto", bottom: 0 }}>
        <Toolbar>
            <Box flexGrow={1}>
                <Typography variant="body2" color="textSecondary">
                    &copy;HigherWatch. All rights reserved.
                </Typography>
            </Box>
            <Box display="flex" alignItems="center">
                <Typography variant="body2" color="textSecondary">
                    Powered by Your Company
                </Typography>
            </Box>
        </Toolbar>
    </AppBar>;
}
export default FooterApp;