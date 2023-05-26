import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './assets/bootstrap/css/bootstrap.min.css';
import './assets/css/untitled.css';
import './assets/js/bs-init.js';
import './assets/js/bold-and-bright.js';
import Sidebar from "./Sidebar";
import { useEffect } from 'react';
import Login from './login';
import Register from "./Register";
import Homepage from "./Homepage";
import ForgotPasswordForm from './ForgotPasswordForm';
import AdminSpace1 from "./AdminSpace1";
import AdminSpaceRoles from "./AdminSpaceRoles";
import DepartmentHeadSpace1 from "./DepartmentHeadSpace1";
import DepartmentHeadSpaceDemand from "./DepartmentHeadSpaceDemand";
import FacultyDeanSpace1 from "./FacultyDeanSpace1";
import ServiceTechnicianSpace1 from "./ServiceTechnicianSpace1";
import ServiceHeadSpace1 from "./ServiceHeadSpace1";
import TechnicalCommitteeSpace1 from "./TechnicalCommitteeSpace1";
import EnterpriseSpace1 from "./EnterpriseSpace1";
import {Card} from "./Card";
import "./Card.css"
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/AdminSpace1" element={<Sidebar><AdminSpace1 /></Sidebar>} />
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
    );
}

export default App;
