/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
// import EarningCard from './EarningCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import PopularCard from './PopularCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import axiosInstance from 'custom-axios';
import TotalProfitCard from '../TotalProfitCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
	const [isLoading, setLoading] = useState(true);
	const [expenseDetails, setExpenseDetails] = useState(0);
	const [incomeDetails, setIncomeDetails] = useState(0);
	const [graphValue, setGraphValue] = useState({});


	const getTotalExpense = async () => {
		try {
			const apiResponse = await axiosInstance.get(`api/total-monthly-expense`);
			setExpenseDetails(apiResponse);

		} catch (error) {
			console.log(error);
		}
	};

	const getTotalIncome = async () => {
		try {
			const apiResponse = await axiosInstance.get(`api/total-monthly-income`);
			setIncomeDetails(apiResponse);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchGraphData = async () => {

		try {
			const response = await axiosInstance.get(`api/income-expense-graph`);

			setGraphValue(response.data)

		} catch (error) {
			console.error(error.message);
		}
	};

	async function callApi() {

		try {
			setLoading(false);
			await getTotalIncome();
			await getTotalExpense();
			await fetchGraphData();
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		callApi()
	}, []);

	return (
		<Grid container spacing={gridSpacing}>
			<Grid item xs={12}>
				<Grid container spacing={gridSpacing}>
					<Grid item lg={4} md={12} sm={12} xs={12}>
						<Grid container spacing={gridSpacing}>
							<Grid item sm={6} xs={12} md={6} lg={12}>
								<TotalIncomeDarkCard isLoading={isLoading} expenseDetails={expenseDetails} />
							</Grid>
						</Grid>
					</Grid>

					<Grid item lg={4} md={12} sm={12} xs={12}>
						<Grid container spacing={gridSpacing}>
							<Grid item sm={6} xs={12} md={6} lg={12}>
								<TotalIncomeLightCard isLoading={isLoading} income={incomeDetails.data} />
							</Grid>
						</Grid>
					</Grid>

					<Grid item lg={4} md={12} sm={12} xs={12}>
						<Grid container spacing={gridSpacing}>
							<Grid item sm={6} xs={12} md={6} lg={12}>
								<TotalProfitCard isLoading={isLoading} monthlyIncome={incomeDetails.data} monthlyExpense={expenseDetails.data} />
							</Grid>
						</Grid>
					</Grid>

				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Grid container spacing={gridSpacing}>
					<Grid item xs={12} md={12}>
						<TotalGrowthBarChart isLoading={isLoading} graphValue={graphValue} />
					</Grid>
					{/* <Grid item xs={12} md={4}>
						<PopularCard isLoading={isLoading} />
					</Grid> */}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Dashboard;
