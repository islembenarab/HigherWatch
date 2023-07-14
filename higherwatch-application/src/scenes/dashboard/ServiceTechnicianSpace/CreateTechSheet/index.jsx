import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Header from "../../../../components/Header";
import { Formik } from "formik";
import * as yup from "yup";
import api from "../../../../api/api";

const CreateTechSheet = () => {
    useEffect(() => {
        // Function to execute when the page is loading
        getStructures()
            .then((structures) => {
                setStructures(structures);
            })
            .catch((error) => {
                console.log(error);
            });
        getDemands()
            .then((demand) => {
                setDemands(demand);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const [structures, setStructures] = useState([]);
    const [demands, setDemands] = useState([]);

    const handleSubmit = (values) => {
        const { demand,  projectLocation,  durationByDays, projectBudget, structure } = values;
        const projectType=demand.ptype;
        const projectOwner=structure.structureName;
        api
            .post("demand/ServiceTechnician/createTechSheet", {
                projectType,
                projectOwner,
                projectLocation,
                durationByDays,
                projectBudget,
                demand,
                structure,
            })
            .then((response) => {
                // Handle success response
                console.log("Tech Sheet created:", response.data);
                navigator.push("/dashboard")
                // Redirect to a success page or perform any other action
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });
    };

    const initialValues = {
        projectLocation: "",
        durationByDays: 0,
        projectBudget: "",
        structure: "",
        demand: ""
    };

    const checkoutSchema = yup.object().shape({
        demand: yup.object().required("Demand  is required"),
        projectLocation: yup.string().required("Project Location is required"),
        durationByDays: yup.number().required("Project Timeline is required"),
        projectBudget: yup.string().required("Project Budget is required"),
        structure: yup.object().required("Structure is required"),
    });

    const getStructures = async () => {
        const response = await api.get("demand/getStructures");
        return response.data.map((structure) => ({
            ...structure,
            id: structure.structureId,
        }));
    };
    const getDemands = async () => {
        const response = await api.get("demand/ServiceTechnician/getApprovedDemands");
        return response.data.map((demand) => ({
            ...demand,
            id: demand.demandId,
        }));
    };

    return (
        <Box mt={2} mx={2} my={2} mb={2}>
            <Box mx={2} display="flex" justifyContent="center">
                <Header title="Create Technical Sheet" />
            </Box>
            <Formik
                initialValues={initialValues}
                validationSchema={checkoutSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Box maxWidth={500} mx="auto">
                            <FormControl
                                fullWidth
                                variant="filled"
                                error={touched.structure && errors.structure}
                                style={{ marginTop: "16px" }}
                            >
                                <InputLabel id="structure-label">Demand</InputLabel>
                                <Select
                                    labelId="Demand-label"
                                    id="Demand"
                                    value={values.demand}
                                    name="demand"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                >
                                    {demands.map((demand) => (
                                        <MenuItem key={demand.demandId} value={demand}>
                                            {demand.demandName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Project Location"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.projectLocation}
                                name="projectLocation"
                                error={touched.projectLocation && errors.projectLocation}
                                helperText={touched.projectLocation && errors.projectLocation}
                                style={{ marginTop: "16px" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Project Timeline by days"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.durationByDays}
                                name="durationByDays"
                                error={touched.durationByDays && errors.durationByDays}
                                helperText={touched.durationByDays && errors.durationByDays}
                                style={{ marginTop: "16px" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Project Budget"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.projectBudget}
                                name="projectBudget"
                                error={touched.projectBudget && errors.projectBudget}
                                helperText={touched.projectBudget && errors.projectBudget}
                                style={{ marginTop: "16px" }}
                            />
                            <FormControl
                                fullWidth
                                variant="filled"
                                error={touched.structure && errors.structure}
                                style={{ marginTop: "16px" }}
                            >
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

                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                style={{ marginTop: "16px" }}
                            >
                                Create New Tech Sheet
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default CreateTechSheet;
