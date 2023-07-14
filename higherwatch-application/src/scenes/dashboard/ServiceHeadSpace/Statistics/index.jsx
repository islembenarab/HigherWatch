import React, {useEffect, useState} from "react";
import {Box, useTheme} from "@mui/material";
import Chart from "react-apexcharts";
import api from "../../../../api/api";
import {tokens} from "../../../../theme";

const Statistics = () => {
    const [numProjects, setNumProjects] = useState([]);
    const [numProjectsDonut, setNumProjectsDonut] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    useEffect(() => {
        // Function to execute when the page is loading
        getNumProject()
            .then(value => {
                // Use the resolved value here
                setNumProjects(value)
            })
            .catch(error => {
                // Handle any errors that occurred during the promise
                console.error(error);
            });
        getNumProjectDonut()
            .then(value =>
                setNumProjectsDonut(value))
            .catch(error => {
                // Handle any errors that occurred during the promise
                console.error(error);
            });

    }, []);

    const getNumProject = async () => {

        const response = await api.get('project/serviceHead/getNumProjectByMonth');
        return response.data;
    };
    const getNumProjectDonut = async () => {

        const response = await api.get('project/serviceHead/getNumProjectByType');
        return response.data;
    };
    const state = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                , labels: {
                    style: {
                        colors: colors.primary["100"] // Replace with your desired color value
                    }
                }
            }, yaxis: {
                labels: {
                    style: {
                        colors: colors.primary["100"] // Replace with your desired color value
                    }
                }
            }, stroke: {
                show: true,
                curve: 'smooth',
                lineCap: 'butt',
                colors: colors.primary.main,
                width: 2,
                dashArray: 0,
            }

        },
        series: [
            {
                name: "projects",
                data: numProjects
            }
        ]
    };
    const stateDonut = {
        options: {

            chart: {
                width: 380,
                type: 'pie',
                dropShadow: {
                    enabled: true,
                    color: colors.primary["100"],
                    top: -1,
                    left: 3,
                    blur: 3,
                    opacity: 0.4
                }
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        offset: -5
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'horizontal',
                    shadeIntensity: 0.5,
                    gradientToColors: ['#0015ff', '#00ff04', '#ff5900'], // Gradient colors
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 100],
                    colorStops: []
                }
            },
            labels: ["SERVICE", "EQUIPMENT", "RENOVATION"],
            dataLabels: {
                color: colors.primary["100"],
                formatter(val, opts) {
                    const name = opts.w.globals.labels[opts.seriesIndex]
                    return [name, val.toFixed(1) + '%']
                }
            },
            legend: {
                show: false
            },
            theme: {
                palette: theme.palette
            },
            title: {
                text: 'Project Type Pie',colors: [colors.primary["100"]],
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
        series: numProjectsDonut,


    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box>
                <Chart
                    options={state.options}
                    series={state.series}
                    type="line"
                    width="800"
                    height="300"
                />
            </Box>
            <Box marginTop={5}>
                <Chart options={stateDonut.options}
                       series={stateDonut.series}
                       type="pie"
                       width="400"/>
            </Box>
        </Box>
    );
}
export default Statistics;