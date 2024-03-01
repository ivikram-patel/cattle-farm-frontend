/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useFullPageLoader } from 'hooks/useFullPageLoader';
// import axiosInstance from 'custom-axios';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosInstance from 'custom-axios';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FOOD_DETAILS } from 'store/constant';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect } from 'react';


const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary
}));

const CattleFood = () => {
	const navigate = useNavigate();
	// const { id } = useParams();
	const [loader, showLoader, hideLoader] = useFullPageLoader();

	const [formData, setFormData] = useState({
		food: 1, // Set the initial value for demonstration, replace with your logic
		food_in_weight: '',
		food_in_nos: '',
		rate: '',
		total_amount: 0,
	});

	// const validation = Yup.object().shape({
	// 	food: Yup.string().required(),
	// 	first_name: Yup.string().required(),
	// 	gender: Yup.string().nullable().required('Please select a gender'),
	// });


	const validation = Yup.object().shape({
		food: Yup.number().required(),
		food_name: Yup.string().required(),
		// food_in_weight: Yup.number().when('food', {
		// 	is: 1, // Specify the value for which this rule is applied
		// 	then: Yup.number().required('Weight is required'),
		// }),
		// food_in_nos: Yup.number().when('food', {
		// 	is: 2, // Specify the value for which this rule is applied
		// 	then: Yup.number().required('Number is required'),
		// }),
		// food_delivery_time: Yup.date().required(),
		rate: Yup.number().required(),
		// vendor_phone_no: Yup.string().required(),
		note: Yup.string(),
	});
	const {
		register,
		// setError,
		// control,
		// setValue,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(validation)
	});


	// const handleChange = (e) => {
	// 	const { name, value } = e.target

	// 	console.log(name, value)
	// 	setFormData({ ...formData, [name]: value })
	// };

	const handleChange = (e) => {
		// Handle form field changes here
		setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
	};



	const submitForm = async (data) => {

		// console.log(data)
		// const formatData = { ...formData, data }
		// console.log(formatData)
		showLoader()
		let endPoint = `api/submit-food-details`;

		try {
			const apiResponse = await axiosInstance.post(endPoint, data);

			if (apiResponse.status === 'success') {
				toast.success(apiResponse.message);
			}

			hideLoader();
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		// Calculate total_amount when food_in_weight, food_in_nos, or rate changes
		const calculateTotalAmount = () => {
			const { food, food_in_weight, food_in_nos, rate } = formData;

			let totalAmount = 0;

			if (food === 2) {
				// Condition for food == 2, using food_in_nos
				totalAmount = parseFloat(food_in_nos) * parseFloat(rate);
			} else {
				// Default condition for other values of food, using food_in_weight
				totalAmount = parseFloat(food_in_weight) * parseFloat(rate);
			}

			// Handle NaN condition
			if (isNaN(totalAmount)) {
				totalAmount = 0;
			}

			// Format totalAmount to display two decimal places
			totalAmount = parseFloat(totalAmount.toFixed(2));

			// Update the total_amount in the form data
			setFormData((prevData) => ({ ...prevData, total_amount: totalAmount }));
		};

		calculateTotalAmount();
	}, [formData.food, formData.food_in_weight, formData.food_in_nos, formData.rate]);

	console.log(formData)

	return <>
		<Item>
			<form onSubmit={handleSubmit(submitForm)}>
				<Box
					sx={{ '& > :not(style)': { m: 1, width: '90%' } }}
					noValidate
					autoComplete="off"
				>
					<Grid container spacing={2}>
						<Grid item xs={2} className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
							<Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
								Food
							</Typography>
						</Grid>

						<Grid item xs={10} className='text-left'>

							<FormControl sx={{ minWidth: 380 }} size="small" error={Boolean(errors && errors['food'])}>
								<InputLabel id="milk-time-select-small-label">Food </InputLabel>
								<Select
									labelId="milk-time-select-small-label"
									id="milk-time-select-small"
									label="Food"
									name='food'
									value={formData.food || ''}
									classes={{ select: "custom-select-label" }}

									MenuProps={{
										disableScrollLock: true,
										PaperProps: { sx: { maxHeight: 200 } }
									}}

									inputProps={{
										...register('food', {
											require: true,
											onChange: handleChange,
										})
									}}
								>

									{FOOD_DETAILS.map((row, index) => {
										return (
											<MenuItem key={index} value={row.value}>{row.label}</MenuItem>
										)
									})}

								</Select>
							</FormControl>
						</Grid>


						<Grid item xs={2} className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
							<Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
								Food Name
							</Typography>
						</Grid>

						<Grid item xs={10}>
							<TextField
								label="Food Name"
								variant="outlined"
								fullWidth
								size='small'
								{...register('food_name', { onChange: handleChange })}
								error={!!errors.food_name}
							/>
						</Grid>

						<Grid item xs={2} className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
							<Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
								Total Weight/Nos of Food
							</Typography>
						</Grid>

						<Grid item xs={10} className='d-flex justify-content-center' style={{ alignItems: 'center' }}>

							{formData.food != 2 ?

								<TextField
									label="With normal TextField"
									id="outlined-start-adornment"
									size='small'
									fullWidth
									{...register('food_in_weight', { onChange: handleChange })}
									InputProps={{
										startAdornment: <InputAdornment position="start">kg</InputAdornment>,
									}}
									error={!!errors.food_in_weight}
								/>
								:
								<TextField
									id="outlined-number"
									label="Number"
									type="number"
									size='small'
									{...register('food_in_nos', { onChange: handleChange })}
									fullWidth
									InputLabelProps={{
										shrink: true,
									}}
									error={!!errors.food_in_nos}
								/>
							}
						</Grid>


						<Grid item xs={2} className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
							<Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
								Rate
							</Typography>
						</Grid>

						<Grid item xs={10}>
							<TextField
								label="Rate of Unit / Kg"
								variant="outlined"
								fullWidth
								size='small'
								{...register('rate', { onChange: handleChange })}
								error={!!errors.rate}
							/>
						</Grid>


						{/* calculate the total amount and make it disabled */}
						<Grid item xs={2} className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
							<Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
								Total Amount
							</Typography>
						</Grid>

						<Grid item xs={10}>
							<TextField
								label="Total Amount"
								variant="outlined"
								fullWidth
								size='small'
								disabled
								value={formData.total_amount}
								{...register('total_amount')}
							/>
						</Grid>


						<Grid item xs={2} className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
							<Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
								Delivery Time
							</Typography>
						</Grid>

						<Grid item xs={5} className='text-start'>

							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<Stack spacing={3}>
									<DesktopDatePicker
										disableFuture
										label="Delivery Time"
										value={formData.food_delivery_time}
										// minDate={new Date('01-01-1949')}
										format="DD-MM-YYYY"
										defaultValue={dayjs()}
										onChange={(newValue) => {
											// setMilkDateTime(newValue);
											formData.food_delivery_time = newValue.toDate()
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												size='small'
												variant='standard'
												{...register('food_delivery_time', { required: true, valueAsDate: true, onChange: handleChange })}
												error={Boolean(errors && errors['food_delivery_time'])}
												helperText={errors['food_delivery_time']?.message}
											/>
										)}
									/>
								</Stack>
							</LocalizationProvider>
						</Grid>
						<Grid item xs={5}></Grid>



						<Grid item xs={2} className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
							<Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
								Vendor Details
							</Typography>
						</Grid>

						<Grid item xs={10}>
							<TextField
								label="Vendor Name"
								variant="outlined"
								fullWidth
								size='small'
								{...register('vendor_name', { onChange: handleChange })}
								error={!!errors.vendor_name}
								helperText={errors.vendor_name?.message}
							/>
						</Grid>

						<Grid item xs={2} className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
							<Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
								Phone No
							</Typography>
						</Grid>

						<Grid item xs={10}>
							<TextField
								label="Vendor Phone No"
								variant="outlined"
								fullWidth
								size='small'
								{...register('vendor_phone_no', { onChange: handleChange })}
							// error={!!errors.vendor_phone_no}
							// helperText={errors.vendor_phone_no?.message}
							/>
						</Grid>

						<Grid item xs={2} className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
							<Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
								Notes
							</Typography>
						</Grid>

						<Grid item xs={10}>
							<TextField
								label="Notes"
								variant="outlined"
								fullWidth
								size='small'
								{...register('note', { onChange: handleChange })}
								multiline
								rows={4}
								error={!!errors.note}
							// helperText={errors.first_name?.message}
							/>
						</Grid>
					</Grid>
				</Box>

				<Box className='text-right margin2_10'>
					<Button
						variant='contained'
						color="primary"
						// className='blue-button'
						type='submit'
					>
						Submit
					</Button>
				</Box>
			</form>
		</Item >
		<ToastContainer />
		{loader}
	</>;
};

export default CattleFood;