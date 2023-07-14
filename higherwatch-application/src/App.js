import React, {Fragment, useState} from "react";
import {Route, Routes} from "react-router-dom";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import {ColorModeContext, useMode} from "./theme";
import Topbar from "./scenes/bars/Topbar";
import Sidebar from "./scenes/bars/Sidebar";
import Team from "./scenes/dashboard/AdminSpace/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import DepartmentHeadSpace from "./scenes/dashboard/DepartmentHeadSpace/DepartmentHeadSpace";
import Homepage from "./scenes/dashboard/HomePage";
import LoginForm from "./scenes/dashboard/LoginForm";
import HomeLoginBar from "./scenes/bars/HomeLoginBar";
import FormRegistration from "./scenes/dashboard/AdminSpace/formRegistration";
import CreateRole from "./scenes/dashboard/AdminSpace/CreateRole";
import MainDashboard from "./scenes/dashboard/MainDashboard";
import CreateStructure from "./scenes/dashboard/AdminSpace/CreateStructure";
import FooterApp from "./scenes/bars/footerApp";
import {RequireAuth} from "./security/PrivateRoute";
import CreateProject from "./scenes/dashboard/ServiceHeadSpace/CreateProject";
import CreateDemand from "./scenes/dashboard/DepartmentHeadSpace/CreateDemand";
import ConsultDemands from "./scenes/dashboard/DepartmentHeadSpace/ConsultDemands";
import ConsultDemandsDean from "./scenes/dashboard/FacultyDeanSpace/ConsultDemandsDean";
import ConsultDemandsTechnician from "./scenes/dashboard/ServiceTechnicianSpace/ConsultDemandsTechnician";
import CreateTechSheet from "./scenes/dashboard/ServiceTechnicianSpace/CreateTechSheet";
import ManageProjects from "./scenes/dashboard/ServiceHeadSpace/ManageProjects";
import Statistics from "./scenes/dashboard/ServiceHeadSpace/Statistics";
import CreateContract from "./scenes/dashboard/ServiceHeadSpace/CreateContract";
import ManageTasks from "./scenes/dashboard/EnterpriseSpace/ManageTasks";
import EvaluateProject from "./scenes/dashboard/TechnicalCommitteeSpace/EvaluateProject";
import StatisticsEnterprise from "./scenes/dashboard/EnterpriseSpace/StatisticsEnterprise";

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const currentPath = window.location.pathname;
    const hideSidebar =
        currentPath.toLowerCase() === "/loginform".toLowerCase() ||
        currentPath.toLowerCase() === "/".toLowerCase() ||
        currentPath.toLowerCase() === "/homepage".toLowerCase();
    const showTopbar = !hideSidebar;

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box display={"flex"} flexDirection={"column"}>
                    <Box display="flex" minHeight="100vh">
                        {!hideSidebar && (
                            <Sidebar isSidebar={isSidebar} sx={{flex: "0 0 auto"}}/>
                        )}
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                overflow: "hidden",
                            }}
                        >
                            {hideSidebar && <HomeLoginBar></HomeLoginBar>}
                            {showTopbar && (
                                <Topbar
                                    setIsSidebar={setIsSidebar}
                                    sx={{flex: "0 0 auto"}}
                                />
                            )}
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    position: "relative",
                                    width: "100%",
                                    overflow: "auto",
                                    maxWidth: "100vw",
                                }}
                            >
                                <Routes>
                                    <Fragment>
                                        <Route path="/Dashboard" element={<RequireAuth><MainDashboard/></RequireAuth>}/>
                                        <Route
                                            path="/DepartmentHeadSpace"
                                            element={<DepartmentHeadSpace/>}
                                        />
                                        <Route path="/Homepage" element={<Homepage/>}/>
                                        <Route path="/" element={<Homepage/>}/>
                                        <Route path="/LoginForm" element={<LoginForm/>}/>
                                        <Route path="/manageAccounts" element={<Team/>}/>
                                        <Route path="/contacts" element={<Contacts/>}/>
                                        <Route path="/invoices" element={<Invoices/>}/>
                                        <Route path="/bar" element={<Bar/>}/>
                                        <Route path="/pie" element={<Pie/>}/>
                                        <Route path="/line" element={<Line/>}/>
                                        <Route path="/faq" element={<FAQ/>}/>
                                        <Route path="/calendar" element={<Calendar/>}/>
                                        <Route path="/geography" element={<Geography/>}/>
                                        <Route path="/Registration" element={<FormRegistration/>}/>
                                        <Route path="/CreateRole" element={<CreateRole/>}/>
                                        <Route path="/CreateStructure" element={<CreateStructure/>}/>
                                        <Route path="/CreateProject" element={<CreateProject/>}/>
                                        <Route path="/CreateDemand" element={<CreateDemand/>}/>
                                        <Route path="/consultDemands" element={<ConsultDemands/>}/>
                                        <Route path="/demandsDean" element={<ConsultDemandsDean/>}/>
                                        <Route path="/demandsTechnician" element={<ConsultDemandsTechnician/>}/>
                                        <Route path="/createTechSheet" element={<CreateTechSheet/>}/>
                                        <Route path="/manageProjects" element={<ManageProjects/>}/>
                                        <Route path="/Statistics" element={<Statistics/>}/>
                                        <Route path="/createContract" element={<CreateContract/>}/>
                                        <Route path="/ManageTasks" element={<ManageTasks/>}/>
                                        <Route path="/evaluateProject" element={<EvaluateProject/>}/>
                                        <Route path="/StatisticsEnterprise" element={<StatisticsEnterprise/>}/>
                                    </Fragment>
                                </Routes>
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <FooterApp/>
                    </Box>
                </Box>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
