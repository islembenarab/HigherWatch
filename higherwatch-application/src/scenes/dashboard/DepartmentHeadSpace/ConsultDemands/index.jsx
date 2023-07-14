import {Box, Modal, useTheme} from "@mui/material";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import React, {useEffect, useState} from "react";
import {tokens} from "../../../../theme";
import api from "../../../../api/api";
import Header from "../../../../components/Header";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import PreviewIcon from '@mui/icons-material/Preview';
import Typography from "@mui/material/Typography";

const ConsultDemands =()=>{
    const [selectedRow, setSelectedRow] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [Demands, setDemands] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    useEffect(() => {
        // Function to execute when the page is loading
        getDemands()
            .then((demand) => {
                setDemands(demand);

            })
            .catch((error) => {
                console.log(error);
            });
        console.log('Page is loading');

    }, []);
    const getDemands = async () => {

        const response = await api.get('demand/departmentHead');
        return response.data.map(demand => ({...demand,structureName: demand?.structure?.structureName,id: demand.demandId}))
    };
    const handlePreviewClick = (id) => {
        const selectedDemand = Demands.find((demand) => demand.id === id);
        setSelectedRow(selectedDemand);
        setOpenModal(true);
    };
    const handleEditClick = async (row) => {
        if (Demands.includes(row)) {
            alert("you didnt change any thing")
        } else {
            const confirmed = window.confirm('Are you sure you want to update this demand?');
            if (!confirmed) {
                return; // If the user cancels the confirmation, exit the function
            }
            const updatedDemand = {
                demandId:row.id,
                demandName: row.demandName,
                ptype: row.ptype, // Replace with the updated value for pType
                date: row.date, // Replace with the updated value for date
                status: row.status, // Replace with the updated value for status
                description: row.description, // Replace with the updated value for description
                structure: row.structure, // Replace with the updated structure object
            };
            try {
                const response = await api.put(`demand/departmentHead`, updatedDemand);
                console.log(response.data);
                window.location.reload()// Optional: Handle the response data
                return response.data;
            } catch (error) {
                console.error(error);
                // Optional: Handle the error
                throw error;
            }
        }
    };
    const columns = [
        { field: "id", headerName: "ID", align: "center", width: 100 , },
        { field: "demandName", headerName: "Demand Name", align: "center", width: 200,editable: true },
        { field: "ptype", headerName: "Project Type", align: "center", width: 150 },
        { field: "date", headerName: "Date", align: "center", width: 150 },
        { field: "status", headerName: "Status", align: "center", width: 150 },
        { field: "structureName", headerName: "Structure", align: "center", width: 150 },
        { field: "description", headerName: "description", align: "center", width: 150,editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 150,
            cellClassName:  'actions',
            getActions: ({ row }) => {
                if (row.status === "PENDING") {
                    return [
                        <GridActionsCellItem
                            icon={<EditIcon sx={{fontSize: 20}} />}
                            label="Edit"
                            onClick={() => handleEditClick(row)}
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon sx={{fontSize: 20}}/>}
                            label="Delete"
                            className="textPrimary"
                            color="inherit"
                        />,<GridActionsCellItem
                            icon={<PreviewIcon sx={{fontSize: 20}}/>}
                            label="View Details"
                            className="textPrimary"
                            color="inherit"
                            onClick={() => handlePreviewClick(row.id)}
                        />,
                    ];}
                else {
                    return [
                        <GridActionsCellItem
                            icon={<PreviewIcon sx={{fontSize: 30}}/>}
                            label="View Details"
                            className="textPrimary"
                            color="inherit"
                            onClick={() => handlePreviewClick(row.id)}
                        />,
                    ];
                }

            },
        },
    ];

    return  <Box>
        <Box>
        {openModal && (  // Add a conditional check for openModal
            <Modal  open={openModal} onClose={() => setOpenModal(false)}>
                {/* Render the details of the selected row */}
                {selectedRow && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Header title={"Details"}/>
                        <Typography variant="h4" component="div" mt={2} >ID: {selectedRow.id}</Typography>
                        <Typography variant="h6" component="div" mt={2} >Project Type: {selectedRow.ptype}</Typography>
                        <Typography variant="h6" component="div" mt={2} >Description: {selectedRow.description}</Typography>
                        <Typography variant="h6" component="div" mt={2} >For the faculty: {selectedRow.structure.structureName}</Typography>
                        <Typography variant="h6" component="div" mt={2} >Location: {selectedRow.structure.location}</Typography>
                        <Typography variant="h6" component="div" mt={2} >Date: {selectedRow.date}</Typography>
                        {/* Add more fields as needed */}
                    </Box>
                )}
            </Modal>
        )}
        </Box>
        <Box mx={2} display={"flex"} justifyContent={"center"}>
            <Header title="Demands" subtitle="Managing Demands"/>
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
                <DataGrid
                          rows={Demands}
                          columns={columns}
                          scrollbarSize={10}
                          sx={{width: "100%"}}
                          pagination
                />
            </Box>
        </Box></Box>;
}

export default ConsultDemands;