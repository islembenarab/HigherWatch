import {Box, Button, FormControl, InputLabel, LinearProgress, Link, MenuItem, Select, useTheme} from "@mui/material";
import Header from "../../../../components/Header";
import {DataGrid, GridRowModes, GridToolbarContainer} from "@mui/x-data-grid";
import React, {useEffect, useState} from "react";
import {tokens} from "../../../../theme";
import api from "../../../../api/api";
import Typography from "@mui/material/Typography";
import {GridActionsCellItem, GridRowEditStopReasons} from "@mui/x-data-grid-pro";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import {number} from "yup";
import {format} from 'date-fns';

const ManageTasks = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        // Function to execute when the page is loading
        getProjects()
            .then((project) => {
                setProjects(project);
                console.log(project)
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);
    const handleColumnSelection = async (project) => {
        setSelectedProject(project);
        const id = project.projectNumber;
        const response = await api.get(`project/enterprise/ProjectTasks/${id}`);
        console.log(response.data)
        setTasks(response.data.map(task => ({
            ...task,
            id: task.taskID
        })));
    };
    const getProjects = async () => {
        const structure = JSON.parse(localStorage.getItem("user")).structure;
        const structureId = structure.structureId
        const structureName = structure.structureName
        const location = structure.location
        console.log(structure);
        const response = await api.post('project/enterprise/EnterpriseProjects', {
            structureId,
            structureName,
            location
        });
        return response.data.map(project => ({
            ...project,
            id: project.projectNumber
        }))
    };

    function ExpandableCell({ value }) {
        const [expanded, setExpanded] = React.useState(false);

        return (
            <Box>
                {expanded ? value : value.slice(0, 200)}&nbsp;
                {value.length > 200 && (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <Link
                        type="button"
                        component="button"
                        sx={{ fontSize: 'inherit' }}
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'view less' : 'view more'}
                    </Link>
                )}
            </Box>
        );
    }

    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (newRow) => () => {
        setRowModesModel({...rowModesModel, [newRow.id]: {mode: GridRowModes.Edit}});
        const updatedRow = {...newRow,isNew: true};
        setTasks(tasks.map((row) => (row.id === newRow.id ? updatedRow : row)));
    };

    const handleSaveClick = (newRow) => async () => {
        setRowModesModel({...rowModesModel, [newRow.id]: {mode: GridRowModes.View}});
            const taskID=newRow.id
            const taskName=newRow.taskName;
            const startDate=newRow.startDate;
            const status=newRow.status;
            const progress=newRow.progress;
            const updateDescription=newRow.updateDescription;
            const dueDate=newRow.dueDate;
            const project=selectedProject;
            const response = await api.post('project/enterprise', {
                taskID,taskName , startDate ,status,progress,updateDescription,dueDate,project
            });
            console.log(response.data)
            await handleColumnSelection(selectedProject);
            const updatedRow = {...newRow,isNew: false};
            setTasks(tasks.map((row) => (row.id === newRow.id ? updatedRow : row)));
            return response.data;

    };

    const handleDeleteClick = (newRow) => async () => {
        console.log(newRow)
        setTasks(tasks.filter((row) => row.id !== newRow.id));
        const response = await api.delete(`project/enterprise/${newRow.id}`);
        return response.data
    };

    const handleCancelClick = (Row) => () => {
        setRowModesModel({
            ...rowModesModel,
            [Row.id]: {mode: GridRowModes.View, ignoreModifications: true},
        });

    };

    const processRowUpdate = (newRow) => {
        const updatedRow = {...newRow,isNew:true};
        setTasks(tasks.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        {field: "id", headerName: "ID", align: "center", width: 100},
        {field: "taskName", headerName: "Task Name", align: "center", width: 120, editable: true},
        {
            field: "startDate",
            headerName: "Task start date",
            type: 'date',
            align: "center",
            width: 120,
            valueGetter: (params) => {
                const value = params.value;
                return value ? new Date(value) : null;
            },
            renderCell: (params) => {
                const value = params.value;
                return value ? format(value, 'MM/dd/yyyy') : '-';
            },
            editable: true
        },
        {
            field: "updateDescription",
            headerName: "Task Update Description",
            align: "center",
            width: 200,
            editable: true,
            renderCell: (params) => <ExpandableCell value={params.value} />,
        },
        {
            field: "status", headerName: "Task status", align: "center", width: 200, type: 'singleSelect',
            valueOptions: ['PENDING', 'PROGRESSING', 'COMPLETED'], editable: true
        },
        {
            field: "progress",
            headerName: "Task progress",
            type: number,
            align: "center",
            width: 200,
            renderCell: (params) => (
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <LinearProgress
                        variant="determinate"
                        value={parseInt(params.value)}
                        style={{flex: 1, marginRight: 10}}
                        sx={{
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: params.value === 100 ? 'primary.main' : 'secondary.main',
                            },
                        }}
                    />
                    <Typography variant="body2" color="textSecondary">
                        {`${params.value}%`}
                    </Typography>
                </div>
            ),
            editable: true,
        },
        {
            field: "dueDate",
            headerName: "Task end date",
            type: 'date',
            align: "center",
            width: 120,
            editable: true,
            valueGetter: (params) => {
                const value = params.value;
                return value ? new Date(value) : null;
            },
            renderCell: (params) => {
                const value = params.value;
                return value ? format(value, 'MM/dd/yyyy') : '-';
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 200,
            cellClassName: 'actions',
            getActions: ({row}) => {
                const isInEditMode = rowModesModel[row.id]?.mode === GridRowModes.Edit;


                if (isInEditMode) {
                    return [

                        <GridActionsCellItem
                            icon={<CancelIcon/>}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(row)}
                            color="inherit"
                        />,
                    ];
                }
                if (!isInEditMode && row.isNew) {
                    return [
                        <GridActionsCellItem
                            icon={<EditIcon/>}
                            label="Edit"
                            className="textPrimary"
                            onClick={handleEditClick(row)}
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon/>}
                            label="Delete"
                            onClick={handleDeleteClick(row)}
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<SaveIcon/>}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(row)}
                        />,
                    ];
                }
                 return [
                    <GridActionsCellItem
                        icon={<EditIcon/>}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(row)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
                        label="Delete"
                        onClick={handleDeleteClick(row)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];


    function EditToolbar(props) {
        const {tasks, setTasks, setRowModesModel} = props;

        const handleClick = () => {
            let id;
            if (tasks && tasks.length > 0) {
                let maxId = Math.max(...tasks.map((task) => task.id));
                id = maxId + 1;
            } else {
                id = 1;
            }

            setTasks((oldRows) => [
                ...(oldRows || []),
                {
                    id,
                    taskName: '',
                    startDate: '',
                    updateDescription: '',
                    status: '',
                    progress: '',
                    dueDate: '',
                    isNew: true,
                },
            ]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: {mode: GridRowModes.Edit, fieldToFocus: 'taskName'},
            }));
        };

        return (
            <GridToolbarContainer>
                <Button color="primary" startIcon={<AddIcon/>} onClick={handleClick}>
                    Add task
                </Button>
            </GridToolbarContainer>
        );
    }

    return <Box
        mt={2}
        mx={2}
        my={2}
        mb={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
    >
        <Box display="flex" justifyContent="center">
            <Header title="Tasks" subtitle="Managing Project Tasks"/>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" mx={2} width="100%">
            <FormControl fullWidth variant="filled" style={{width: "50%"}}>
                <InputLabel id="project-label">project</InputLabel>
                <Select
                    labelId="project-label"
                    id="project"
                    value={project}
                    name="project"
                    onChange={(event) => {
                        handleColumnSelection(event.target.value);
                        setProject(event.target.value);
                    }}
                >
                    {projects.map((project) => (
                        <MenuItem key={project.projectNumber} value={project}>
                            {project.projectName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {selectedProject && (
                <Box
                    style={{
                        marginTop: "16px",
                        display: "grid",
                        gridTemplateColumns: "auto auto",
                        border: `1px solid ${theme.palette.primary.main}`,
                        padding: theme.spacing(2),
                        textAlign: "center",
                        gap: "20px",
                    }}
                >
                    <Typography variant="h4" style={{gridColumn: "1/3"}}>
                        Project name :{selectedProject.projectName}
                    </Typography>
                    <Typography variant="h6">
                        Project ID :{selectedProject.projectNumber}
                    </Typography>
                    <Typography variant="body1">
                        Budget :{selectedProject.projectBudget}
                    </Typography>
                    <Typography variant="body1">
                        Description: {selectedProject.projectDescription}
                    </Typography>
                    <Typography variant="body1">
                        Address: {selectedProject.projectAddress}
                    </Typography>
                    <Typography variant="body1">
                        Duration: {selectedProject.completionTimeByDays} days
                    </Typography>
                    <Typography variant="body1">
                        Project type: {selectedProject.projectType}
                    </Typography>
                </Box>)}
            {selectedProject && (
                <Box
                    m="0 2% 0 2%"
                    height="calc(100vh - 200px)"
                    width="100%"
                    editMode="row"
                    sx={{
                        marginTop: "16px",
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
                        rows={tasks}
                        columns={columns}
                        editMode="row"
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={handleRowModesModelChange}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
                        slots={{
                            toolbar: EditToolbar,
                        }}
                        slotProps={{
                            toolbar: {setTasks, setRowModesModel},
                        }}
                        getEstimatedRowHeight={() => 100}
                        getRowHeight={() => 'auto'}
                        sx={{
                            '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' },
                            '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
                            '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' },
                        }}
                    />
                </Box>
            )}
        </Box>
    </Box>

        ;
}
export default ManageTasks;