import {useNavigate} from "react-router-dom";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, useTheme} from "@mui/material";
import React, {useEffect, useState} from "react";
import api from "../../../../api/api";
import * as yup from "yup";
import Header from "../../../../components/Header";
import {Formik} from "formik";
import Typography from "@mui/material/Typography";


const CreateContract =()=>{
    const navigate=useNavigate();
    const theme = useTheme();
    const [projects, setProjects] = useState([]);
    const [Structures, setStructures] = useState([]);
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
        getStructures()
            .then((Structure) => {
                setStructures(Structure);
                console.log(Structure)
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);
    const getProjects = async () => {

        const response = await api.get('project/serviceHead/NotContractedProjects');
        return response.data.map(project => ({
            ...project,
            id: project.projectNumber}))
    };
    const getStructures = async () => {
        const response = await api.get('project/getStructures');
        return response.data.map(Structure => ({
            ...Structure,
            id: Structure.structureId}))
    };
    const handleSubmit = (values, { setSubmitting }) => {
        const {project,structure}=values;
        const contractor=project.projectOwner;
        const coContractor=structure.structureName;
        const execution=project.completionTimeByDays


        setTimeout(async () => {
            console.log(values); // Access the form values
            const response = await api.post('project/serviceHead/createContract',
                {
                project,
                structure,
                contractor,
                coContractor,
                execution
            })
            console.log(response)
            setSubmitting(false);
            navigate("/dashboard")
        }, 1000);
    };
    const [selectedProject, setSelectedProject] = useState(null);
    const [showProject, setShowProject] = useState(false);
    const [selectedStructure, setSelectedStructure] = useState(null);
    const [showStructure, setShowStructure] = useState(false);
    const handlePreviewProject =(project) =>{
        setSelectedProject(project);
        setShowProject(true);
        return project;
    }
    const handlePreviewStructure =(project) =>{
        setSelectedStructure(project);
        setShowStructure(true);
        return project;

    }
    const checkoutSchema = yup.object().shape({
        project: yup.object().required("project"),
        structure: yup
            .object()
            .required("Start Date is required"),

    });


    const initialValues = {
        project:"",
        structure: "",


    };
    return (
        <Box mt={2} mx={2} my={2} mb={2} display="flex" flexDirection="column" alignItems="center">
            <Box mx={2}>
                <Header title="Create Contract" />
            </Box>
            <Formik
                initialValues={initialValues}
                validationSchema={checkoutSchema}
                onSubmit={handleSubmit}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit} style={{ width: '50%' }}>
                        <Box display="flex" flexDirection="column" alignItems="center" mx={2}>
                            <FormControl fullWidth variant="filled" error={touched.project && errors.project} style={{ marginTop: "16px" }}>
                                <InputLabel id="project-label">project</InputLabel>
                                <Select
                                    labelId="project-label"
                                    id="project"
                                    value={values.project}
                                    name="project"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    onSelect={handlePreviewProject(values.project)}
                                >
                                    {projects.map((project) => (
                                        <MenuItem key={project.projectNumber} value={project}>
                                            {project.projectName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {showProject && (
                                <Box style={{   marginTop:"16px", display: 'grid',
                                    gridTemplateColumns: 'auto auto',
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    padding: theme.spacing(2),
                                    textAlign: 'center',
                                    gap: "20px"}}>
                                    <Typography variant="h4" style={{gridColumn: '1/3',}}>
                                        Project name :{selectedProject.projectName}
                                    </Typography>
                                    <Typography variant="h6">Project ID :{selectedProject.projectNumber}</Typography>
                                    <Typography variant="body1">Budget :{selectedProject.projectBudget}</Typography>
                                    <Typography variant="body1">Description: {selectedProject.projectDescription}</Typography>
                                    <Typography variant="body1">Address: {selectedProject.projectAddress}</Typography>
                                    <Typography variant="body1">Duration: {selectedProject.completionTimeByDays} days</Typography>
                                    <Typography variant="body1">Project type: {selectedProject.projectType}</Typography>
                                </Box>
                            )}
                              <FormControl fullWidth variant="filled" error={touched.structure && errors.structure} style={{ marginTop: "16px" }}>
                                <InputLabel id="structure-label">structure</InputLabel>
                                  <Select
                                      labelId="Structure-label"
                                      id="structure"
                                      value={values.structure}
                                      name="structure"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                    onSelect={handlePreviewStructure(values.structure)}
                                >
                                    {Structures.map((structure) => (
                                        <MenuItem value={structure}>
                                            {structure.structureName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {showStructure && (
                                <Box style={{   marginTop:"16px", display: 'grid',
                                    gridTemplateColumns: 'auto auto',
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    padding: theme.spacing(2),
                                    textAlign: 'center',
                                    gap: "20px"}}>
                                    <Typography variant="h4" style={{gridColumn: '1/3',}}>
                                        Structure name :{selectedStructure.structureName}
                                    </Typography>
                                    <Typography variant="h6">Structure ID :{selectedStructure.structureId}</Typography>
                                    <Typography variant="body1">Address :{selectedStructure.location}</Typography>
                                </Box>
                            )}


                            <Button type="submit" color="primary" variant="contained" style={{ marginTop: "16px" }}>
                                Create New Project
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>

    );
}
export default CreateContract;