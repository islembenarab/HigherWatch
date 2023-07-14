import {Box, Button, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import {useEffect, useState} from "react";
import AdminSpace from "./AdminSpace/AdminSpace";
import DepartmentHeadSpace from "./DepartmentHeadSpace/DepartmentHeadSpace";
import FacultyDeanSpace from "./FacultyDeanSpace/FacultyDeanSpace";
import ServiceTechnicianSpace from "./ServiceTechnicianSpace/ServiceTechnicianSpace";
import ServiceHeadSpace from "./ServiceHeadSpace/ServiceHeadSpace";
import TechnicalCommitteeSpace from "./TechnicalCommitteeSpace/TechnicalCommitteeSpace";
import EnterpriseSpace from "./EnterpriseSpace/EnterpriseSpace";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        const authorities = user.authorities.map((authority) => authority.authority);
        setRoles(authorities);
    }, []);
    const renderRoleSpace = (roles) => {
        roles.sort((a, b) => {
            const order = ["ADMIN", "DEPARTMENT_HEAD", "FACULTY_DEAN", "SERVICE_TECHNICIAN", "SERVICE_HEAD", "TECHNICAL_COMITTEE", "ENTERPRISE"];
            return order.indexOf(a) - order.indexOf(b);
        });
        return roles.map((role) => {
            switch (role) {
                case "ADMIN":
                    return <AdminSpace />;
                case "DEPARTMENT_HEAD":
                    return <DepartmentHeadSpace />;
                case "FACULTY_DEAN":
                    return <FacultyDeanSpace />;
                case "SERVICE_TECHNICIAN":
                    return <ServiceTechnicianSpace />;
                case "SERVICE_HEAD":
                    return <ServiceHeadSpace />;
                case "TECHNICAL_COMITTEE":
                    return <TechnicalCommitteeSpace />;
                case "ENTERPRISE":
                    return <EnterpriseSpace />;
                default:
                    return null;
            }
        });
    };

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">


                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlinedIcon sx={{mr: "10px"}}/>
                        Download Reports
                    </Button>
                </Box>
            </Box>

            {/* GRID & CHARTS */}
            {renderRoleSpace(roles)}
        </Box>
    );
};

export default Dashboard;
