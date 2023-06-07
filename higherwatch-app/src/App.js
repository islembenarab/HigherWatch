import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './assets/bootstrap/css/bootstrap.min.css';
import './assets/css/untitled.css';
import './assets/js/bs-init.js';
import './assets/js/bold-and-bright.js';
import Sidebar from './Sidebar';
import Login from './login';
import Register from './Register';
import Homepage from './Homepage';
import ForgotPasswordForm from './ForgotPasswordForm';
import AdminSpaceRoles from './AdminSpaceRoles';
import DepartmentHeadSpace1 from './DepartmentHeadSpace1';
import DepartmentHeadSpaceDemand from './DepartmentHeadSpaceDemand';
import FacultyDeanSpace1 from './FacultyDeanSpace1';
import ServiceTechnicianSpace1 from './ServiceTechnicianSpace1';
import ServiceHeadSpace1 from './ServiceHeadSpace1';
import TechnicalCommitteeSpace1 from './TechnicalCommitteeSpace1';
import EnterpriseSpace1 from './EnterpriseSpace1';
import './Card.css';
import AdminSpace from './Dashboards/AdminSpace';
import Dashboard from './Dashboards/DashboardTemplate';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import Topbar from './scences/global/Topbar';

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    const location = useLocation();
    const isHomepage = location.pathname === '/Homepage';
    const showTopbar = !isHomepage;

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    {!isHomepage && <Sidebar isSidebar={isSidebar} />}
                    <main className="content">
                        {showTopbar && <Topbar setIsSidebar={setIsSidebar} />}
                        <Router>
                            <Routes>
                                <Route path="/" element={<Homepage />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/AdminSpace1" element={<Sidebar><AdminSpace /></Sidebar>} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/Register" element={<Register />} />
                                <Route path="/ForgotPasswordForm" element={<ForgotPasswordForm />} />
                                <Route path="/AdminSpaceRoles" element={<Sidebar><AdminSpaceRoles /></Sidebar>} />
                                <Route path="/DepartmentHeadSpace1" element={<Sidebar><DepartmentHeadSpace1 /></Sidebar>} />
                                <Route path="/DepartmentHeadSpaceDemand" element={<Sidebar><DepartmentHeadSpaceDemand /></Sidebar>} />
                                <Route path="/FacultyDeanSpace1" element={<Sidebar><FacultyDeanSpace1 /></Sidebar>} />
                                <Route path="/ServiceTechnicianSpace1" element={<Sidebar><ServiceTechnicianSpace1 /></Sidebar>} />
                                <Route path="/ServiceHeadSpace1" element={<Sidebar><ServiceHeadSpace1 /></Sidebar>} />
                                <Route path="/TechnicalCommitteeSpace1" element={<Sidebar><TechnicalCommitteeSpace1 /></Sidebar>} />
                                <Route path="/EnterpriseSpace1" element={<Sidebar><EnterpriseSpace1 /></Sidebar>} />
                            </Routes>
                        </Router>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
