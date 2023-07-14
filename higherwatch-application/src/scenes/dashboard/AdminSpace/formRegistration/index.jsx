import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import Header from "../../../../components/Header";
import api from "../../../../api/api";


const FormRegistration = () => {
    const [rolesS, setRoles] = useState([]);
    const [structures, setStructures] = useState([]);

    useEffect(() => {
        getRoles()
            .then((roles) => {
                setRoles(roles);
            })
            .catch((error) => {
                console.log(error);
            });
        getStructures()
            .then((structures) => {
                setStructures(structures);
                console.log(rolesS)
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);




    const handleSubmit = (values) => {
        const {
            firstName,
            lastName,
            gender,
            birthDate,
            address,
            phone,
            roles,
            email,
            password,
            structure,
        } = values;
        api.post('accounts/api/auth/signUp',
            {firstName, lastName, gender, birthDate, address, phone, roles, password, email,structure})
            .then((response) => {
                // eslint-disable-next-line no-restricted-globals
                window.location.href="/dashboard"
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });
    };
    const getRoles = async () => {

        const response = await api.get('accounts/admin/getRoles');
        return response.data.map(role => ({label: role.name, value: role.name}))
    };
    const getStructures = async () => {

        const response = await api.get('accounts/admin/getStructures');
        return response.data.map(structure => ({
            ...structure,
            id: structure.structureId}))
    };

    return (
        <Box mt={2} mx={2} my={2} mb={2}>
            <Header title="CREATE USER" subtitle="Create a New User Profile"/>

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
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={touched.firstName && errors.firstName}
                                    helperText={touched.firstName && errors.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={touched.lastName && errors.lastName}
                                    helperText={touched.lastName && errors.lastName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    label="birthDate"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.birthDate}
                                    name="birthDate"
                                    error={touched.birthDate && errors.birthDate}
                                    helperText={touched.birthDate && errors.birthDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    variant="filled"
                                    error={touched.gender && errors.gender}
                                >
                                    <InputLabel id="sex-label">Gender</InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        id="gender"
                                        value={values.gender}
                                        name="gender"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="email"
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={touched.email && errors.email}
                                    helperText={touched.email && errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="password"
                                    label="Password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={touched.password && errors.password}
                                    helperText={touched.password && errors.password}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Address"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.address}
                                    name="address"
                                    error={touched.address && errors.address}
                                    helperText={touched.address && errors.address}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Phone"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.phone}
                                    name="phone"
                                    error={touched.phone && errors.phone}
                                    helperText={touched.phone && errors.phone}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    variant="filled"
                                    error={touched.roles && errors.roles}
                                >
                                    <InputLabel id="roles-label">Roles</InputLabel>
                                    <Select
                                        labelId="roles-label"
                                        id="roles"
                                        multiple
                                        label="Roles"
                                        value={values.roles}
                                        name="roles"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        renderValue={(selected) => selected.join(", ")}
                                    >
                                        {rolesS.map((role) => (
                                            <MenuItem key={role.label} value={role.value}>
                                                <Checkbox checked={values.roles.includes(role.value)}/>
                                                <ListItemText primary={role.value}/>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="filled" error={touched.structure && errors.structure}>
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
                                        <MenuItem  value={structure}>
                                            {structure.structureName}
                                        </MenuItem>

                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" color="secondary" variant="contained">
                                    Create New User
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    birthDate: yup.string().required("Birthday is required"),
    gender: yup.string().required("Sex is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    address: yup.string().required("Address is required"),
    phone: yup.string().required("Phone is required"),
    roles: yup.array().min(1, "At least one role is required"),
    structure: yup.object().required( "structure is required"),
});

const initialValues = {
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    structure: "",
    roles: [], // Empty array for multiple selection
};

export default FormRegistration;
