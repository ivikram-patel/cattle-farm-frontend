/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { ADD_DETAILS } from 'store/constant';
import { useFullPageLoader } from 'hooks/useFullPageLoader';
// import axiosInstance from 'custom-axios';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosInstance from 'custom-axios';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary
}));

const AddDetails = () => {
	const navigate = useNavigate();
	// const { id } = useParams();
	const [loader, showLoader, hideLoader] = useFullPageLoader();
	const [formData, setFormData] = useState([])

	const validation = Yup.object().shape({
		add_detail: Yup.string().required(),
		first_name: Yup.string().required(),
		gender: Yup.string().nullable().required('Please select a gender'),
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


	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	};



	const submitForm = async (data) => {

		console.log(data)

		let endPoint;
		let redirectPage;

		if (data.add_detail == 1) {
			endPoint = `api/submit-doctor-details`;
			redirectPage = '/doctor-list';

		} else if (data.add_detail == 2) {
			endPoint = `api/submit-customer-details`;
			redirectPage = '/customers';

		} else {
			endPoint = `api/submit-employee-details`;
			redirectPage = '/employee-list';
		}

		showLoader();

		try {
			const response = await axiosInstance.post(endPoint, data);

			if (response.status === 200) {

				toast.success(response.message);

				console.log(redirectPage);
				navigate(redirectPage);

			} else {
				toast.error(response.message);
			}
		} catch (error) {
			// toast.error(error.message);
			console.error(error)

		} finally {

			// recaptchaRef.current.reset()

			hideLoader();
		}
		// }
	}

	return <>
		<Item>
			<form onSubmit={handleSubmit(submitForm)}>
				<Box
					sx={{ '& > :not(style)': { m: 1, width: '90%' } }}
					noValidate
					autoComplete="off"
				>
					<Grid container spacing={2}>
						<Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
							<Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
								વિગતો
							</Typography>
						</Grid>

						<Grid item xs={10} className='text-left' style={{ textAlign: 'left' }}>

							<FormControl sx={{ minWidth: 180 }} size="small" error={Boolean(errors && errors['add_detail'])}>
								<InputLabel id="milk-time-select-small-label">વિગતો </InputLabel>
								<Select
									labelId="milk-time-select-small-label"
									id="milk-time-select-small"
									label="વિગતો"
									name='add_detail'
									value={formData.add_detail || ''}
									classes={{ select: "custom-select-label" }}

									MenuProps={{
										disableScrollLock: true,
										PaperProps: { sx: { maxHeight: 200 } }
									}}

									inputProps={{
										...register('add_detail', {
											require: true,
											onChange: handleChange,
										})
									}}
								>

									{ADD_DETAILS.map((row, index) => {
										return (
											<MenuItem key={index} value={row.value}>{row.label}</MenuItem>
										)
									})}

								</Select>
							</FormControl>

						</Grid>

						<Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
							<Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
								Gender
							</Typography>
						</Grid>

						<Grid item xs={10} className='text-left' style={{ textAlign: 'left' }}>
							<FormControl>
								{/* <FormLabel id="payment-controlled-radio-buttons-group">Gender</FormLabel> */}
								<RadioGroup
									row
									aria-labelledby="gender-controlled-radio-buttons-group"
									name="gender"
									value={formData.gender}
									onChange={handleChange}
									{...register('gender')}

								>
									<FormControlLabel value={1} control={<Radio />} label="Male" />
									<FormControlLabel value={2} control={<Radio />} label="Female" />
								</RadioGroup>
							</FormControl>
							{errors.gender && <p style={{ color: 'red' }}>{errors.gender.message}</p>}
						</Grid>



						<Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
							<Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
								અટક
							</Typography>
						</Grid>

						<Grid item xs={10} className='text-start'>
							<TextField
								label="અટક"
								variant="outlined"
								fullWidth
								size='small'
								{...register('surname')}
								error={!!errors.surname}
								helperText={errors.surname?.message}
							/>
						</Grid>

						{/* -----------first name------------ */}

						<Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
							<Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
								First Name
							</Typography>
						</Grid>

						<Grid item xs={10} className='text-start'>
							<TextField
								label="First Name"
								variant="outlined"
								fullWidth
								size='small'
								{...register('first_name')}
								error={!!errors.first_name}
							// helperText={errors.first_name?.message}
							/>
						</Grid>

						<Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
							<Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
								Last Name
							</Typography>
						</Grid>

						<Grid item xs={10} className='text-start'>
							<TextField
								label="Last Name"
								variant="outlined"
								fullWidth
								size='small'
								{...register('last_name')}
								error={!!errors.last_name}
								helperText={errors.last_name?.message}
							/>
						</Grid>


						<Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
							<Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
								Phone No
							</Typography>
						</Grid>

						<Grid item xs={10} className='text-start'>
							<TextField
								label="Phone No"
								variant="outlined"
								fullWidth
								size='small'
								{...register('phone_no')}
							// error={!!errors.last_name}
							// helperText={errors.last_name?.message}
							/>
						</Grid>


						<Grid item xs={2} className='d-flex'>
							<Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
								Address
							</Typography>
						</Grid>

						<Grid item xs={10} className='text-start'>
							<TextField
								label="Address"
								variant="outlined"
								fullWidth
								multiline
								rows={6}
								size='small'
								{...register('address')}
							// error={!!errors.last_name}
							// helperText={errors.last_name?.message}
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

export default AddDetails;
