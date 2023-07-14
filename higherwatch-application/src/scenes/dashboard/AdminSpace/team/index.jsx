import {Box, Typography, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {tokens} from "../../../../theme";
import Header from "../../../../components/Header";
import api from "../../../../api/api";
import {useEffect, useState} from "react";

const Team = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers().then((User) => {
            setUsers(User)
        })
    }, [])

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const getUsers = async () => {
        const response = await api.get('accounts/admin/Users');
        return response.data.map(user => ({
            ...user,
            structureName: user?.structure?.structureName,// Extract the structureName field from user.structure
            id: user.userId // Add an id property using userId
        }));
    };
    const columns = [
        {field: "id", headerName: "id", flex: 1, minWidth: 50, maxWidth: 100, align: "center"},
        {field: "firstName", headerName: "First Name", flex: 1, minWidth: 80, maxWidth: 130, align: "center"},
        {field: "lastName", headerName: "Last Name", flex: 1, minWidth: 80, maxWidth: 130, align: "center"},
        {field: "email", headerName: "Email", flex: 1, minWidth: 150, maxWidth: 200, align: "center"},
        {field: "gender", headerName: "Gender", flex: 1, minWidth: 70, maxWidth: 120, align: "center"},
        {field: "address", headerName: "Address", flex: 1, minWidth: 150, maxWidth: 200, align: "center"},
        {
            field: "phone",
            headerName: "Phone Number",
            flex: 1,

            minWidth: 110, maxWidth: 160,
            align: "center"
        },
        {
            field: "birthDate",
            headerName: "Birth Date",
            flex: 1,

            minWidth: 80, maxWidth: 130,
            align: "center"
        },
        {
            field: "structureName",
            headerName: "Structure",
            flex: 1,

            minWidth: 80, maxWidth: 130,
            align: "center"
        },
        {field: "enabled", headerName: "Enabled", flex: 1, minWidth: 70, maxWidth: 120, align: "center"},
        {
            field: "authorities",
            headerName: "Authorities",
            flex: 1,
            renderCell: ({row: {authorities}}) => (
                <Box>
                    {authorities.map((authority) => (
                        <Typography key={authority.authority}>{authority.authority}</Typography>
                    ))}
                </Box>
            ),

            minWidth: 150, maxWidth: 200, align: "center"
        },
        {
            field: "accountNonExpired",
            headerName: "Account Non-Expired",
            flex: 1,

            minWidth: 70, maxWidth: 120,
            align: "center"
        },
        {
            field: "credentialsNonExpired",
            headerName: "Credentials Non-Expired",
            flex: 1,

            minWidth: 70, maxWidth: 120,
            align: "center"
        },
        {
            field: "accountNonLocked",
            headerName: "Account Non-Locked",
            flex: 1,
            minWidth: 70, maxWidth: 120,
            align: "center"
        },
    ];


    return (<Box>
            <Box mx={2} display={"flex"} justifyContent={"center"}>
                <Header title="USERS" subtitle="Managing the USERS AND Their ROLES"/>
            </Box>
            <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} flexBasis={"100%"}>

                <Box
                    m="0 2% 0 2%"
                    height="calc(100vh - 200px)" // Adjust the height value as needed
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .name-column--cell": {
                            color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700],
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`,
                        },
                    }}
                >
                    <DataGrid checkboxSelection
                              rows={users}
                              columns={columns}
                              scrollbarSize={10}
                              sx={{width: "100%"}}
                              pagination
                    />
                </Box>
            </Box></Box>
    );
};

export default Team;
