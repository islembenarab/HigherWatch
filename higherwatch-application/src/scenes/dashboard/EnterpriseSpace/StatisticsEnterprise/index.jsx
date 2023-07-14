import React, {useEffect, useState} from "react";
import {Box, useTheme} from "@mui/material";
import Chart from "react-apexcharts";
import api from "../../../../api/api";
import {tokens} from "../../../../theme";

const StatisticsEnterprise = () => {
    const [numTasks, setNumTasks] = useState([]);
    const [numTasksDonut, setNumTasksDonut] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    useEffect(() => {
        // Function to execute when the page is loading
        getNumTasks()
            .then(value => {
                // Use the resolved value here
                setNumTasks(value)
            })
            .catch(error => {
                // Handle any errors that occurred during the promise
                console.error(error);
            });
        getNumTasksDonut()
            .then(value =>
                setNumTasksDonut(value))
            .catch(error => {
                // Handle any errors that occurred during the promise
                console.error(error);
            });

    }, []);

    const getNumTasks = async () => {

        const response = await api.get('project/enterprise/getNumTasksByMonth');
        return response.data;
    };
    const getNumTasksDonut = async () => {

        const response = await api.get('project/enterprise/getNumTasksByType');
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
                name: "tasks",
                data: numTasks
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
            labels: ["PENDING", "PROGRESSING", "COMPLETED"],
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
                text: 'Task Type Pie',colors: [colors.primary["100"]],
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
        series: numTasksDonut,


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
export default StatisticsEnterprise;