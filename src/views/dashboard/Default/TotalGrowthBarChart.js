/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

// third-party
// import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { numberFormat } from 'hooks/useNumberFormat';

// chart data
// import chartData from './chart-data/total-growth-bar-chart';

// const status = [
//   {
//     value: 'today',
//     label: 'Today'
//   },
//   {
//     value: 'month',
//     label: 'This Month'
//   },
//   {
//     value: 'year',
//     label: 'This Year'
//   }
// ];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading, graphValue }) => {
    // const [value, setValue] = useState('today');
    // console.log(chartData.options)
    // console.log(chartData)

    const theme = useTheme();
    // const customization = useSelector((state) => state.customization);
    // const { navType } = customization;
    // const darkLight = theme.palette.dark.light;
    const { primary } = theme.palette.text;
    const grey200 = theme.palette.grey[200];
    const grey500 = theme.palette.grey[500];

    const primary200 = theme.palette.primary[200];
    // const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;

    const newChartData = {
        height: 480,
        type: 'bar',
        options: {
            chart: {
                id: 'bar-chart',
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%'
                }
            },
            xaxis: {
                type: 'category',
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            legend: {
                show: true,
                fontSize: '14px',
                fontFamily: `'Roboto', sans-serif`,
                position: 'bottom',
                offsetX: 20,
                labels: {
                    useSeriesColors: false
                },
                markers: {
                    width: 16,
                    height: 16,
                    radius: 5
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 8
                }
            },
            fill: {
                type: 'solid'
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: true
            },
            tooltip: {
                theme: 'light',
                enabled: true, // Ensure tooltip is enabled
                y: {
                    formatter: function (value) {
                        return numberFormat(value);
                    }
                }
            }
        },
        series: [
            {
                name: 'Income',
                data: graphValue.income
            },
            {
                name: 'Expense',
                data: graphValue.expense
            },
            {
                name: 'Profit',
                data: graphValue.profit
            }
        ],
        colors: [primary200, secondaryLight, secondaryMain],

        xaxis: {
            labels: {
                style: {
                    colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: [primary]
                }
            }
        },
        grid: {
            borderColor: grey200
        },
        legend: {
            labels: {
                colors: grey500
            }
        }
    };


    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        {/* <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Total Growth</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">$2,324.00</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField id="standard-select-currency" select value={value} onChange={(e) => setValue(e.target.value)}>
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid> */}
                        <Grid item xs={12}>
                            <Chart {...newChartData} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TotalGrowthBarChart.propTypes = {
    isLoading: PropTypes.bool,
    graphValue: PropTypes.any
};

export default TotalGrowthBarChart;
