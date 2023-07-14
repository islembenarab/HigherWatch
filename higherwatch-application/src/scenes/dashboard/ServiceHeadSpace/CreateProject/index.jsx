import React, {useEffect, useState} from "react";
import api from "../../../../api/api";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, useTheme} from "@mui/material";
import Header from "../../../../components/Header";
import {Formik} from "formik";
import * as yup from "yup";
import { useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";

const CreateProject =()=>{

    const navigate=useNavigate();
    const theme = useTheme();
    const [projects, setProjects] = useState([]);
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

    const getProjects = async () => {

        const response = await api.get('project/serviceHead/notPlaned');
        return response.data.map(project => ({
            ...project,
            id: project.projectNumber}))
    };
    const handleSubmit = (values, { setSubmitting }) => {
        const {project,projectPlan,projectStartDate}=values;
        project.projectPlan=projectPlan;
        project.projectStartDate=projectStartDate;


        setTimeout(async () => {
            console.log(values); // Access the form values
            const response = await api.put('project/serviceHead/planProject', project)
            console.log(response)
            setSubmitting(false);
            navigate("/dashboard")
        }, 1000);
    };
    const [selectedProject, setSelectedProject] = useState(null);
    const [showProject, setShowProject] = useState(false);
    const handlePreviewProject =(project) =>{
        setSelectedProject(project);
        setShowProject(true);
    }
    return (
        <Box mt={2} mx={2} my={2} mb={2} display="flex" flexDirection="column" alignItems="center">
            <Box mx={2}>
                <Header title="Plan a Project" />
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
                                <InputLabel id="structure-label">project</InputLabel>
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
                            <TextField style={{ marginTop: "16px" }}
                                fullWidth
                                variant="filled"
                                type="date"
                                label="Start Date"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.projectStartDate}
                                name="projectStartDate"
                                error={touched.projectStartDate && errors.projectStartDate}
                                helperText={touched.projectStartDate && errors.projectStartDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                mb={2}
                            />

                            <TextField style={{ marginTop: "16px" }}
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Project Plan"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.projectPlan}
                                name="projectPlan"
                                error={touched.projectPlan && errors.projectPlan}
                                helperText={touched.projectPlan && errors.projectPlan}
                                mb={2}
                            />


                            <Button type="submit" color="primary" variant="contained" style={{ marginTop: "16px" }}>
                                Create New Project
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>

    );
};
const checkoutSchema = yup.object().shape({
    project: yup.object().required("project"),
    projectStartDate: yup
        .date()
        .required("Start Date is required"),
    projectPlan: yup.string().required("projectPlan is required"),

});


    const initialValues = {
        project:"",
        projectStartDate: "",
        projectPlan: "",


    };

export default CreateProject;