/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useFullPageLoader } from 'hooks/useFullPageLoader';
import axiosInstance from 'custom-axios';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FOOD_DETAILS } from 'store/constant';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from 'react';
import dayjs from 'dayjs';
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

const CattleFood = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [loader, showLoader, hideLoader] = useFullPageLoader();

	const [formData, setFormData] = useState({
		id: id ? id : 0,
		food_type: 1, // Set the initial value for demonstration, replace with your logic
		food_name: '',
		food_in_weight: 0,
		food_in_nos: 0,
		rate: 0,
		total_amount: 0,
		food_delivery_time: dayjs(),
		vendor_name: '',
		vendor_phone_no: '',
		note: '',
	});

	const validation = Yup.object().shape({
		food_type: Yup.number().required(),
		food_name: Yup.string().required(),
		food_in_weight: Yup.number().when('food_type', {
			is: value => value !== 2,
			then: Yup.number().required('Weight is required'),
		}),
		food_in_nos: Yup.number().when('food_type', {
			is: 2,
			then: Yup.number().required('Number is required'),
		}),

		rate: Yup.number().required(),
	});
	const {
		register,
		// setError,
		// control,
		setValue,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(validation)
	});

	const fetchFoodData = async () => {
		showLoader();

		try {
			const apiResponse = await axiosInstance.get(`api/food-detail/${id}`);

			if (apiResponse.status === 200) {

				setFormData({
					...formData,
					'food_name': apiResponse.data.food_name,
					'food_type': apiResponse.data.food_type,
					'food_in_nos': apiResponse.data.food_in_nos,
					'food_in_weight': apiResponse.data.food_in_weight,
					'note': apiResponse.data.note,
					'rate': apiResponse.data.rate,
					'total_amount': apiResponse.data.total_amount,
					'food_delivery_time': (apiResponse.data.food_delivery_time),
					'vendor_name': apiResponse.data.vendor_name,
					'vendor_phone_no': apiResponse.data.vendor_phone_no,
				})


				setValue('food_name', apiResponse.data.food_name)
				setValue('food_type', apiResponse.data.food_type)
				setValue('food_in_nos', apiResponse.data.food_in_nos)
				setValue('food_in_weight', apiResponse.data.food_in_weight)
				setValue('note', apiResponse.data.note)
				setValue('rate', apiResponse.data.rate)
				setValue('total_amount', apiResponse.data.total_amount)
				setValue('food_delivery_time', (apiResponse.data.food_delivery_time))
				setValue('vendor_name', apiResponse.data.vendor_name)
				setValue('vendor_phone_no', apiResponse.data.vendor_phone_no)
			}

			hideLoader();
		} catch (error) {
			console.log(error);
		}
	}

	const handleChange = (e) => {
		setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
	};

	const submitForm = async () => {

		console.table(formData)

		showLoader()
		let endPoint = `api/submit-food-details`;

		try {
			const apiResponse = await axiosInstance.post(endPoint, formData);
			// const apiResponse = await axios.post(endPo)

			if (apiResponse.status === 200) {
				toast.success(apiResponse.message);
				navigate('/cattle-foods')
			}

			hideLoader();
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		const calculateTotalAmount = () => {
			const { food_type, food_in_weight, food_in_nos, rate } = formData;

			let totalAmount = 0;

			if (food_type === 2) {
				// Condition for food_type == 2, using food_in_nos
				totalAmount = parseFloat(food_in_nos) * parseFloat(rate);
			} else {
				// Default condition for other values of food_type, using food_in_weight
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
	}, [formData.food_type, formData.food_in_weight, formData.food_in_nos, formData.rate]);


	useEffect(() => {
		if (id) {
			fetchFoodData()
		}
	}, [id])

	return <>
		<Item>
			<form onSubmit={handleSubmit(submitForm)}>
				<Box
					sx={{ '& > :not(style)': { m: 1, width: '90%' } }}
					noValidate
					autoComplete="off"
				>
					<Grid container spacing={2}>
						<Grid item xs={2} className='d-flex'>
							<Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
								Food
							</Typography>
						</Grid>

						<Grid item xs={10} className='text-left'>

							<FormControl sx={{ minWidth: 380 }} size="small" error={Boolean(errors && errors['food_type'])}>
								<InputLabel id="milk-time-select-small-label">Food </InputLabel>
								<Select
									labelId="milk-time-select-small-label"
									id="milk-time-select-small"
									label="Food"
									name='food_type'
									value={formData.food_type || ''}
									classes={{ select: "custom-select-label" }}

									MenuProps={{
										disableScrollLock: true,
										PaperProps: { sx: { maxHeight: 200 } }
									}}

									inputProps={{
										...register('food_type', {
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


						<Grid item xs={2} className='d-flex' >
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
								value={formData.food_name}
								{...register('food_name', { onChange: handleChange })}
								error={!!errors.food_name}
							/>
						</Grid>

						<Grid item xs={2} className='d-flex' >
							<Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
								Total {formData.food_type != 2 ? 'Weight' : 'Nos'}
							</Typography>
						</Grid>

						<Grid item xs={10} className='d-flex' >

							{formData.food_type != 2 ?

								<TextField
									label="Food in Weight"
									id="outlined-start-adornment"
									size='small'
									fullWidth
									value={formData.food_in_weight || ''}
									{...register('food_in_weight', { onChange: handleChange })}
									InputProps={{
										startAdornment: <InputAdornment position="start">kg</InputAdornment>,
									}}
									error={!!errors.food_in_weight}
								/>
								:
								<TextField
									id="outlined-number"
									label="Food in Nos"
									type="number"
									size='small'
									{...register('food_in_nos', { onChange: handleChange })}
									fullWidth
									value={formData.food_in_nos || ''}
									InputLabelProps={{
										shrink: true,
									}}
									error={!!errors.food_in_nos}
								/>
							}
						</Grid>


						<Grid item xs={2} className='d-flex' >
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
								value={formData.rate || ''}
								{...register('rate', { onChange: handleChange })}
								error={!!errors.rate}
							/>
						</Grid>


						{/* calculate the total amount and make it disabled */}
						<Grid item xs={2} className='d-flex' >
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


						<Grid item xs={2} className='d-flex' >
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
										value={dayjs.utc(formData.food_delivery_time)}
										// minDate={new Date('01-01-1949')}
										format="DD-MM-YYYY"
										defaultValue={dayjs()}
										onChange={(newValue) => {
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

						<Grid item xs={2} className='d-flex' >
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
								value={formData.vendor_name || ''}
								{...register('vendor_name', { onChange: handleChange })}
								error={!!errors.vendor_name}
								helperText={errors.vendor_name?.message}
							/>
						</Grid>

						<Grid item xs={2} className='d-flex' >
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
								value={formData.vendor_phone_no || ''}
								{...register('vendor_phone_no', { onChange: handleChange })}
							// error={!!errors.vendor_phone_no}
							// helperText={errors.vendor_phone_no?.message}
							/>
						</Grid>

						<Grid item xs={2} className='d-flex' >
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
								value={formData.note || ''}
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