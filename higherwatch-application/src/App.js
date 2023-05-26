import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import AdminSpace from "./scenes/dashboard/AdminSpace";
import DepartmentHeadSpace from "./scenes/dashboard/DepartmentHeadSpace";
import FacultyDeanSpace from "./scenes/dashboard/FacultyDeanSpace";
import ServiceTechnicianSpace from "./scenes/dashboard/ServiceTechnicianSpace";
import ServiceHeadSpace from "./scenes/dashboard/ServiceHeadSpace";
import EnterpriseSpace from "./scenes/dashboard/EnterpriseSpace";
import TechnicalCommitteeSpace from "./scenes/dashboard/TechnicalCommitteeSpace";
import Homepage from "./scenes/dashboard/HomePage";
import LoginForm from "./scenes/dashboard/LoginForm";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  const isHomepage = location.pathname === "/Homepage";
  const showTopbar = !isHomepage;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isHomepage && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {showTopbar && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route
                path="/DepartmentHeadSpace"
                element={<DepartmentHeadSpace />}
              />
              <Route path="/Homepage" element={<Homepage />} />
              <Route path="/LoginForm" element={<LoginForm />} />
              <Route path="/AdminSpace" element={<AdminSpace />} />
              <Route path="/FacultyDeanSpace" element={<FacultyDeanSpace />} />
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
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
