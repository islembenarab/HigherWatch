import React from "react";
import {
    Box,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../../components/Header";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const CreateReport = () => {
    const [open, setOpen] = React.useState(false);
    const [reportData, setReportData] = React.useState(null);

    const handleFormSubmit = (values) => {
        setReportData(values);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();


        const centerX = pageWidth / 2;

        doc.setFontSize(20);
        doc.text("Report Project Information", centerX, 20);

        const tableData = [
            ["Project Name", reportData.projectName],
            ["Status", reportData.projectStatus],
            ["Objectives Met", reportData.objectivesMet ? "Yes" : "No"],
            ["Description", reportData.description],
        ];

        doc.autoTable({
            startY: 30,
            head: [["Field", "Value"]],
            body: tableData,
        });

        doc.save(`report${reportData.projectName}.pdf`);
    };

    return (
        <Box mt={2} mx={2} my={2} mb={2}>
            <Header title="Create Report" subtitle="Fill in the Report Details" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={reportSchema}
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
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Project Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.projectName}
                                    name="projectName"
                                    error={touched.projectName && errors.projectName}
                                    helperText={touched.projectName && errors.projectName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="filled">
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={values.projectStatus}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="projectStatus"
                                        error={touched.projectStatus && errors.projectStatus}
                                    >
                                        <MenuItem value="uncomplete">Uncomplete</MenuItem>
                                        <MenuItem value="partiallyComplete">
                                            Partially Complete
                                        </MenuItem>
                                        <MenuItem value="fullyComplete">Fully Complete</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="filled">
                                    <InputLabel>Objectives Met?</InputLabel>
                                    <Select
                                        value={values.objectivesMet}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="objectivesMet"
                                        error={touched.objectivesMet && errors.objectivesMet}
                                    >
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.description}
                                    name="description"
                                    error={touched.description && errors.description}
                                    helperText={touched.description && errors.description}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" color="secondary" variant="contained">
                                    Create Report
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>

            {reportData && (
                <Dialog open={open} onClose={handleClose} maxWidth="md">
                    <DialogTitle>Report Information</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <strong>Project Name:</strong> {reportData.projectName}
                            <br />
                            <strong>Status:</strong> {reportData.projectStatus}
                            <br />
                            <strong>Objectives Met:</strong>{" "}
                            {reportData.objectivesMet ? "Yes" : "No"}
                            <br />
                            <strong>Description:</strong> {reportData.description}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDownloadPDF} color="primary">
                            Download as PDF
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

const reportSchema = yup.object().shape({
    projectName: yup.string().required("Project Name is required"),
    projectStatus: yup.string().required("Please select a status"),
    objectivesMet: yup
        .boolean()
        .required("Please select whether objectives are met"),
    description: yup.string().required("Description is required"),
});

const initialValues = {
    projectName: "",
    projectStatus: "",
    objectivesMet: false,
    description: "",
};

export default CreateReport;