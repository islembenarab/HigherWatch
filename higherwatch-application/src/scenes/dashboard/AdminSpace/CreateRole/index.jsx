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


const CreateRole = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate=useNavigate();
    useEffect(() => {
        // Function to execute when the page is loading
        getRoles()
            .then((roles) => {
                setRoles(roles);
            })
            .catch((error) => {
                console.log(error);
            });
        // Example: Log a message
        console.log('Page is loading');

        // Example: Make an API call
        // myApiCall();
    }, []);


    const [rolesS, setRoles] = useState([]);

    const handleSubmit = (values) => {
        const {
           name
        } = values;
        if (rolesS.includes(name)){
            alert("this role is existed")
        }else {   api.post('accounts/admin/createRole',
            {name})
            .then((response) => {
                // eslint-disable-next-line no-restricted-globals
                navigate(localStorage.getItem("dashboardLink"));
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });}

    };
    const getRoles = async () => {

        const response = await api.get('accounts/admin/getRoles');
        return response.data.map(role => ({id: role.name}))
    };

    const columns = [ {field: "id", headerName: "name", align: "center",width:"100%"}];
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
                                    label="Role name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name}
                                    name="name"
                                    error={touched.name && errors.name}
                                    helperText={touched.name && errors.name}
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <Button type="submit" color="secondary" variant="contained">
                                    Create New Role
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            <br/>
            <Header title={"Roles existed before"}/>
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
                          rows={rolesS}
                          columns={columns}

                />
            </Box>
        </Box>

    );
};

const checkoutSchema = yup.object().shape({
    name: yup.string().required("First Name is required")

});

const initialValues = {
    name: ""// Empty array for multiple selection
};

export default CreateRole;
