import React, {useEffect, useState} from "react";
import {Menu, MenuItem, ProSidebar} from "react-pro-sidebar";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import {tokens} from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';



const Item = ({title, to, icon, selected, setSelected}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to}/>
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selected, setSelected] = useState("Dashboard");
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            const authorities = user.authorities.map((authority) => authority.authority);
            authorities.sort((a, b) => {
                const order = ["ADMIN", "DEPARTMENT_HEAD", "FACULTY_DEAN", "SERVICE_TECHNICIAN", "SERVICE_HEAD", "TECHNICAL_COMITTEE", "ENTERPRISE"];
                return order.indexOf(a) - order.indexOf(b);
            });
            setRoles(authorities);
        }
    }, []);

    const getSidebarItems = (roles) => {
        // Define the sidebar items for each actor

        const sidebarItems = {
            ADMIN:  {name: "Admin", value:[
                {title: 'Manage Accounts', to: '/manageAccounts',icon: <SupervisorAccountOutlinedIcon/>},
                {title: 'Add Roles', to: '/CreateRole' ,icon: <AssignmentIndOutlinedIcon/> },
                {title: 'Add Entities', to: '/CreateStructure' ,icon: <AccountBalanceOutlinedIcon/>},
                {title: 'Register Users', to: '/Registration' ,icon: <PersonAddOutlinedIcon/>},
            ]},
            DEPARTMENT_HEAD: {name: "Department Head", value:[
                {title: 'Consult Demand List', to: '/consultDemands',icon: <AssignmentOutlinedIcon/>},
                {title: 'Submit Project Demands', to: '/CreateDemand',icon: <AddCircleOutlineIcon/>},
            ]},
            FACULTY_DEAN:  {name: "Faculty Dean", value:[
                {title: 'Consult Project Demands', to: '/demandsDean',icon: <ListAltOutlinedIcon/>},
            ]},
            SERVICE_TECHNICIAN:  {name: "Service Tech", value:[
                {title: 'Consult Demands', to: '/demandsTechnician',icon: <ListAltOutlinedIcon/>},
                {title: 'Announce Requirement Document', to: '/createTechSheet',icon: <DescriptionOutlinedIcon/>},
            ]},
            SERVICE_HEAD:  {name: "Service Head", value:[
                {title: 'Create Contract', to: '/createContract',icon: <DescriptionOutlinedIcon/>},
                {title: 'Manage Projects', to: '/manageProjects',icon: <AssignmentTurnedInOutlinedIcon/>},
                {title: 'Show Statistics', to: '/Statistics',icon: <EqualizerOutlinedIcon/>},
                {title: 'Add Project', to: '/CreateProject',icon: <NoteAddOutlinedIcon/>},
            ]},
            TECHNICAL_COMITTEE:  {name: "Technical Committee", value:[
                {title: 'Evaluate Project', to: '/evaluateProject',icon: <StarHalfOutlinedIcon/>},
            ]},
            ENTERPRISE: {name: "Enterprise", value:[
                {title: 'Manage Tasks', to: '/ManageTasks',icon: <TaskAltOutlinedIcon/>},
                {title: 'Show Statistics', to: '/StatisticsEnterprise',icon: <EqualizerOutlinedIcon/>},
            ]},

        };

        return sidebarItems[roles] || [];
    };
    const handleMouseEnter = () => {
        setIsCollapsed(false);
    };

    const handleMouseLeave = () => {
        setIsCollapsed(true);
    };
        return (
            <Box
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    "& .pro-sidebar-inner": {
                        background: `${colors.primary[400]} !important`,
                    },
                    "& .pro-icon-wrapper": {
                        backgroundColor: "transparent !important",
                    },
                    "& .pro-inner-item": {
                        padding: "5px 35px 5px 20px !important",
                    },
                    "& .pro-inner-item:hover": {
                        color: "#868dfb !important",
                    },
                    "& .pro-menu-item.active": {
                        color: "#6870fa !important",
                    },
                }}
            >
                <ProSidebar collapsed={isCollapsed}>
                    <Menu iconShape="square">
                        {/* LOGO AND MENU ICON */}
                        <MenuItem
                            icon={isCollapsed ? <MenuOutlinedIcon/> : undefined}
                            style={{
                                margin: "10px 0 20px 0",
                                color: colors.grey[100],
                            }}
                        >
                            {!isCollapsed && (
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    ml="15px"
                                >
                                    <Typography variant="h3" color={colors.grey[100]}>
                                        HigherWatch
                                    </Typography>
                                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                        <MenuOutlinedIcon/>
                                    </IconButton>
                                </Box>
                            )}
                        </MenuItem>

                        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                            <Item
                                title="Dashboard"
                                to={"/dashboard"}
                                icon={<HomeOutlinedIcon/>}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            {roles.map((role) => {
                                const items = getSidebarItems(role);
                                return (
                                    <div key={role}>
                                        <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                                            {items.name}
                                        </Typography>
                                        {items.value.map((item) => (
                                            <Item
                                                key={item.title}
                                                title={item.title}
                                                to={item.to}
                                                selected={selected}
                                                setSelected={setSelected}
                                                icon={item.icon}
                                            />
                                        ))}
                                    </div>
                                );
                            })}




                            <Typography
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{m: "15px 0 5px 20px"}}
                            >
                                Pages
                            </Typography>
                            <Item
                                title="Profile Form"
                                to="/form"
                                icon={<PersonOutlinedIcon/>}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Calendar"
                                to="/calendar"
                                icon={<CalendarTodayOutlinedIcon/>}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="FAQ Page"
                                to="/faq"
                                icon={<HelpOutlineOutlinedIcon/>}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            <Typography
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{m: "15px 0 5px 20px"}}
                            >
                                Charts
                            </Typography>
                            <Item
                                title="Bar Chart"
                                to="/bar"
                                icon={<BarChartOutlinedIcon/>}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Pie Chart"
                                to="/pie"
                                icon={<PieChartOutlineOutlinedIcon/>}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Line Chart"
                                to="/line"
                                icon={<TimelineOutlinedIcon/>}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Geography Chart"
                                to="/geography"
                                icon={<MapOutlinedIcon/>}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </Box>
                    </Menu>
                </ProSidebar>
            </Box>
        );
    };

export default Sidebar;

