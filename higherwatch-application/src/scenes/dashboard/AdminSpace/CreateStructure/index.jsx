import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Grid,
    TextField, useTheme,
} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import Header from "../../../../components/Header";
import api from "../../../../api/api";
import {useNavigate} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
import {tokens} from "../../../../theme";


const CreateStructure = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate=useNavigate();
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
        const {
            structureName,
            location
        } = values;
        if (structures.includes(structureName)){
            alert("this structure Name is existed")
        }else {   api.post('accounts/admin/createStructure',
            {structureName,location})
            .then(() => {
                // eslint-disable-next-line no-restricted-globals

                navigate("/dashboard");
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });}

    };
    const getStructures = async () => {

        const response = await api.get('accounts/admin/getStructures');
        return response.data.map(structure => ({
            ...structure,
            id: structure.structureId}))
    };

    const columns = [ {field: "id", headerName: "structure ID", align: "center",width:150},
        {field: "structureName", headerName: "structure Name", align: "center",width:200},
        {field: "location", headerName: "location", align: "center",width:400},];
    return (
        <Box mt={2} mx={2} my={2} mb={2}>
            <Header title="Create Role" subtitle="Create a Role"/>

            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="structure name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.structureName}
                                    name="structureName"
                                    error={touched.structureName && errors.structureName}
                                    helperText={touched.structureName && errors.structureName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={touched.location && errors.location}
                                    helperText={touched.location && errors.location}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" color="primary" variant="contained">
                                    Create New Structure
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            <br/>
            <Header title={"Structures existed before"}/>
            <Box
                m="5px 0 0 0"
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
                          rows={structures}
                          columns={columns}

                />
            </Box>
        </Box>

    );
};

const checkoutSchema = yup.object().shape({
    structureName: yup.string().required("structure Name is required"),
    location: yup.string().required("location is required")

});

const initialValues = {
    structureName: "",// Empty array for multiple selection
    location: ""// Empty array for multiple selection
};

export default CreateStructure;
