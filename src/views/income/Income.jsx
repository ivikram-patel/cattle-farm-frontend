/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	Box,
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useFullPageLoader } from 'hooks/useFullPageLoader';
// import axiosInstance from 'custom-axios';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosInstance from 'custom-axios';
import { NumericFormat } from "react-number-format";

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router'

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/en'; // Import the desired locale

dayjs.extend(utc);
dayjs.extend(timezone);

// Set the desired time zone (IST in this case)
dayjs.tz.setDefault('Asia/Kolkata');


const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary
}));

const Income = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [loader, showLoader, hideLoader] = useFullPageLoader();
	const [incomeCategoryList, setIncomeCategoryList] = useState([]);
	const [formData, setFormData] = useState({
		id: id ? id : 0,
		amount: '',
		income_category: '',
		income_datetime: dayjs(),
		description: '',
	});


	const validation = Yup.object().shape({
		amount: Yup.string().required(),
		// description: Yup.string().required(),
		income_category: Yup.string().required(),
	});

	const {
		register,
		// setError,
		control,
		setValue,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(validation)
	});


	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const fetchExpenseList = async () => {
		showLoader();
		try {
			const response = await axiosInstance.get(`api/income-categories-details`);
			setIncomeCategoryList(response.data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			hideLoader();
		}
	};

	const fetchList = async () => {
		showLoader();
		try {
			const response = await axiosInstance.get(`api/income-details/${id}`);

			console.log(response)

			setFormData({
				...formData,
				income_category: response.data.income_category,
				amount: response.data.amount,
				income_datetime: response.data.date_time,
				description: response.data.description,
			})

			setValue('income_category', response.data.income_category)
			setValue('amount', response.data.amount)
		} catch (error) {
			toast.error(error.message);
		} finally {
			hideLoader();
		}
	};
console.log(errors)

	const submitForm = async () => {

		showLoader()

		let endPoint = `api/submit-income`;

		try {

			const apiResponse = await axiosInstance.post(endPoint, formData);

			if (apiResponse.status === 200) {
				toast.success(apiResponse.message);
				navigate('/income-list')
			}

			hideLoader();
		} catch (error) {
			console.log(error);
		} finally {
			hideLoader()
		}
	};

	useEffect(() => {
		fetchExpenseList()

		if (id) { fetchList() }
	}, [])
	return (
		<>
			<Item>
				<form onSubmit={handleSubmit(submitForm)}>
					<Box sx={{ '& > :not(style)': { m: 1, width: '90%' } }} noValidate autoComplete="off">
						<Grid container spacing={2}>

							{/* <input type='hidden' name='id' {...register('id')} defaultValue={id || 0} /> */}

							<Grid item xs={2} className="d-flex" style={{ alignItems: 'center' }}>
								<Typography variant="subtitle1" className="text-capitalize" style={{ fontSize: 14 }}>
									Income Categories
								</Typography>
							</Grid>

							<Grid item xs={10} className="text-start">

								<FormControl sx={{ minWidth: 180 }} size="small" error={Boolean(errors && errors['income_category'])}>
									<InputLabel id="income_category-time-select-small-label">Category</InputLabel>
									<Select
										labelId="income_category-time-select-small-label"
										id="income_category-time-select-small"
										label="Category"
										name='category'
										value={formData.income_category || ''}
										classes={{ select: "custom-select-label" }}

										MenuProps={{
											disableScrollLock: true,
											PaperProps: { sx: { maxHeight: 200 } }
										}}

										inputProps={{
											...register('income_category', {
												require: true,
												onChange: handleChange,
											})
										}}
									>

										{incomeCategoryList.map((row) => {
											return (
												<MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
											)
										})}

									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={2} className="d-flex" style={{ alignItems: 'center' }}>
								<Typography variant="subtitle1" className="text-capitalize" style={{ fontSize: 14 }}>
									Amount
								</Typography>
							</Grid>

							<Grid item xs={10} className="text-start">
								<Controller
									name="amount"
									control={control}
									render={({ field }) => (
										<NumericFormat
											{...field}
											placeholder="Enter amount"
											thousandSeparator={true}
											prefix={'₹'}
											allowNegative={false}
											size='small'
											value={formData.amount}
											decimalScale={2}
											fixedDecimalScale={true}
											customInput={TextField}
											onValueChange={(values) => {
												setFormData({ ...formData, amount: values.floatValue })
											}}
											error={Boolean(errors && errors['amount'])}

										/>
									)}
								/>
							</Grid>

							<Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
								<Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
									સમય
								</Typography>
							</Grid>

							<Grid item xs={5} className='text-start'>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<Stack spacing={3}>
										<DesktopDatePicker
											disableFuture
											label="Time"
											value={dayjs.utc(formData.income_datetime)}
											format="DD-MM-YYYY"
											defaultValue={dayjs()}
											onChange={(newValue) => {
												formData.income_datetime = newValue.toDate()
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													size='small'
													variant='standard'
													{...register('income_datetime', { required: true, valueAsDate: true })}
													error={Boolean(errors && errors['income_datetime'])}
													helperText={errors['income_datetime']?.message}
												/>
											)}
										/>
									</Stack>
								</LocalizationProvider>
							</Grid>
							<Grid item xs={5}></Grid>

							<Grid item xs={2} className="d-flex">
								<Typography variant="subtitle1" className="text-capitalize" style={{ fontSize: 14 }}>
									Description
								</Typography>
							</Grid>

							<Grid item xs={10} className="text-start">
								<TextField
									label="Description"
									variant="outlined"
									fullWidth
									multiline
									name='description'
									rows={6}
									value={formData.description}
									size="small"
									{...register('description', { onChange: handleChange })}
									error={Boolean(errors && errors['description'])}

								/>
							</Grid>

						</Grid>
					</Box>

					<Box className="text-right margin2_10">
						<Button
							variant="contained"
							color="primary"
							// className='blue-button'
							type="submit"
						>
							Submit
						</Button>
					</Box>
				</form>
			</Item>
			<ToastContainer />
			{loader}
		</>
	);
};

export default Income;