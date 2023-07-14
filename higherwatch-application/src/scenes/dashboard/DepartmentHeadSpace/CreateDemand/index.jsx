import React, {useEffect, useState} from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Header from "../../../../components/Header";
import { Formik } from "formik";
import * as yup from "yup";
import api from "../../../../api/api";

const CreateDemand = () => {
    useEffect(() => {
        // Function to execute when the page is loading
        getStructures()
            .then((structures) => {
                setStructures(structures);
                console.log(structures)
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);


    const [structures, setStructures] = useState([]);
    const handleSubmit = (values) => {
        const {demandName, projectType, description, date , structure } = values;

        // Make API call to create demand
        api
            .post("demand/departmentHead/createdemand", {
                demandName,
                projectType,
                description,
                date,
                structure,
            })
            .then((response) => {
                // Handle success response
                console.log("Demand created:", response.data);
                // Redirect to a success page or perform any other action
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });
    };

    const initialValues = {
        demandName: "",
        projectType: "",
        description: "",
        date: "",
        structure: "",
    };

    const checkoutSchema = yup.object().shape({
        demandName:yup.string().required("demand Name is required"),
        projectType: yup.string().required("Project Type is required"),
        description: yup.string().required("Description is required"),
        date: yup.date().required("Date is required"),
        structure: yup.object().required( "structure is required"),
    });
    const getStructures = async () => {

        const response = await api.get('demand/getStructures');
        return response.data.map(structure => ({
            ...structure,
            id: structure.structureId}))
    };

    return (
        <Box mt={2} mx={2} my={2} mb={2}>
            <Box mx={2} display="flex" justifyContent="center">
                <Header title="Create Demand" />
            </Box>
            <Formik
                initialValues={initialValues}
                validationSchema={checkoutSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Box maxWidth={500} mx="auto">
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Demand Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.demandName}
                                name="demandName"
                                error={touched.demandName && errors.demandName}
                                helperText={touched.demandName && errors.demandName}

                            />
                            <FormControl fullWidth variant="filled" error={touched.projectType && errors.projectType} style={{ marginTop: "16px" }}>
                                <InputLabel id="projectType-label">Project Type</InputLabel>
                                <Select
                                    labelId="projectType-label"
                                    id="projectType"
                                    value={values.projectType}
                                    name="projectType"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="EQUIPMENT">EQUIPMENT</MenuItem>
                                    <MenuItem value="RENOVATION">RENOVATION</MenuItem>
                                    <MenuItem value="SERVICE">SERVICE</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth variant="filled" error={touched.structure && errors.structure} style={{ marginTop: "16px" }}>
                                <InputLabel id="structure-label">Structure</InputLabel>
                                <Select
                                    labelId="Structure-label"
                                    id="structure"
                                    value={values.structure}
                                    name="structure"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                >
                                    {structures.map((structure) => (
                                        <MenuItem key={structure.structureId} value={structure}>
                                            {structure.structureName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.description}
                                name="description"
                                error={touched.description && errors.description}
                                helperText={touched.description && errors.description}
                                style={{ marginTop: "16px" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="date"
                                label="Date"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.date}
                                name="date"
                                error={touched.date && errors.date}
                                helperText={touched.date && errors.date}
                                style={{ marginTop: "16px" }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Button type="submit" color="primary" variant="contained" style={{ marginTop: "16px" }}>
                                Create New Demand
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );

};

export default CreateDemand;
