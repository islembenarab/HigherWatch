import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./scenes/bars/Topbar";
import Sidebar from "./scenes/bars/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import AdminSpace from "./scenes/dashboard/AdminSpace/AdminSpace";
import DepartmentHeadSpace from "./scenes/dashboard/DepartmentHeadSpace";
import FacultyDeanSpace from "./scenes/dashboard/FacultyDeanSpace";
import ServiceTechnicianSpace from "./scenes/dashboard/ServiceTechnicianSpace";
import ServiceHeadSpace from "./scenes/dashboard/ServiceHeadSpace";
import EnterpriseSpace from "./scenes/dashboard/EnterpriseSpace";
import TechnicalCommitteeSpace from "./scenes/dashboard/TechnicalCommitteeSpace";
import Homepage from "./scenes/dashboard/HomePage";
import LoginForm from "./scenes/dashboard/LoginForm";
import HomeLoginBar from "./scenes/bars/HomeLoginBar";
import FooterApp from "./scenes/bars/footerApp";
import FormRegistration from "./scenes/dashboard/AdminSpace/formRegistration";
import CreateRole from "./scenes/dashboard/AdminSpace/CreateRole";

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const currentPath = window.location.pathname;
    const hideSidebar =
        currentPath.toLowerCase() === "/loginform" ||
        currentPath.toLowerCase() === "/" ||
        currentPath.toLowerCase() === "/homepage";
    const showTopbar = !hideSidebar;

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box display="flex" minHeight="100vh" >
                    {!hideSidebar && (
                        <Sidebar isSidebar={isSidebar} sx={{ flex: "0 0 auto" }} />
                    )}
                    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column"  }}>
                        {hideSidebar && <HomeLoginBar></HomeLoginBar>}
                        {showTopbar && (
                            <Topbar setIsSidebar={setIsSidebar} sx={{ flex: "0 0 auto" }} />
                        )}
                        <Box sx={{ flexGrow: 1, position: "relative" }} alignItems={"center"} maxWidth="100vw">
                            <Routes>
                                <Route path="/Dashboard" element={<Dashboard />} />
                                <Route
                                    path="/DepartmentHeadSpace"
                                    element={<DepartmentHeadSpace />}
                                />
                                <Route path="/Homepage" element={<Homepage />} />
                                <Route path="/" element={<Homepage />} />
                                <Route path="/LoginForm" element={<LoginForm />} />
                                <Route path="/AdminSpace" element={<AdminSpace />} />
                                <Route
                                    path="/FacultyDeanSpace"
                                    element={<FacultyDeanSpace />}
                                />
                                <Route
                                    path="/TechnicalCommitteeSpace"
                                    element={<TechnicalCommitteeSpace />}
                                />
                                <Route path="/EnterpriseSpace" element={<EnterpriseSpace />} />
                                <Route path="/ServiceHeadSpace" element={<ServiceHeadSpace />} />
                                <Route
                                    path="/ServiceTechnicianSpace"
                                    element={<ServiceTechnicianSpace />}
                                />
                                <Route path="/manageAccounts" element={<Team />} />
                                <Route path="/contacts" element={<Contacts />} />
                                <Route path="/invoices" element={<Invoices />} />
                                <Route path="/bar" element={<Bar />} />
                                <Route path="/pie" element={<Pie />} />
                                <Route path="/line" element={<Line />} />
                                <Route path="/faq" element={<FAQ />} />
                                <Route path="/calendar" element={<Calendar />} />
                                <Route path="/geography" element={<Geography />} />
                                <Route path="/Registration" element={<FormRegistration />} />
                                <Route path="/CreateRole" element={<CreateRole/>}/>
                            </Routes>
                        </Box>

                    </Box>
                </Box>
                <footer className="footer">
                    <FooterApp />
                </footer>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
