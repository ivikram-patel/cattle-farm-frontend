/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Autocomplete, Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useFullPageLoader } from 'hooks/useFullPageLoader';
import axiosInstance from 'custom-axios';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TIME_DETAILS } from 'store/constant';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/en'; // Import the desired locale
import { NumericFormat } from 'react-number-format';

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


const MonthlyPayment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [customerList, setCustomerList] = useState([])
    const [formData, setFormData] = useState({
        id: id ? id : 0,
        milking_time: 1,
        customer_id: '',
        customer_name: '',
        quantity: '',
        payment_date: dayjs(),
        payment_option: 1,
        half_payment: '',
        // note: '',
    });

    const validationSchema = Yup.object().shape({
        customer_id: Yup.number().when('is_existing_client', {
            is: 1,
            then: Yup.number().required('Please select a customer'),
            otherwise: Yup.number(),
        }),
        quantity: Yup.number().required('Please enter the quantity').positive('Quantity must be a positive number'),
        half_payment: Yup.number().when('payment_option', {
            is: 2,
            then: Yup.number().required('Please enter the half payment').positive('Half payment must be a positive number'),
            otherwise: Yup.number(),
        }),
    });


    const {
        register,
        // setError,
        control,
        // setValue,
        // getValues,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const fetchCustomerList = async () => {
        showLoader();
        try {
            const response = await axiosInstance.get(`api/customer-details`);

            const convertedData = response.data.map(item => ({
                label: item.first_name,
                id: item.id
            }));


            setCustomerList(convertedData)

        } catch (error) {
            toast.error(error.message);
        } finally {
            hideLoader();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    };

    const submitForm = async () => {
        console.log(formData)

        if (formData.is_existing_client == 1) {
            if (formData.customer_id == '') {
                toast.error('Please Select Customer')
                return;
            }
        } else if (formData.is_existing_client == 2) {
            if (formData.customer_name == '') {
                toast.error('Please Enter Customer Name')
                return;
            }
        }

        // let endPoint = `api/submit-milk-prod`;
        // try {
        //     const apiResponse = await axiosInstance.post(endPoint, submitData);
        //     if (apiResponse.status === 'success') {
        //         toast.success(apiResponse.message);
        //     }
        //     hideLoader();
        // } catch (error) {
        //     console.log(error);
        // }

    }

    useEffect(() => {
        fetchCustomerList()
    }, [])

    return <>

        <Item>
            <form onSubmit={handleSubmit(submitForm)}>
                <Box
                    sx={{ '& > :not(style)': { m: 1, width: '90%' } }}
                    noValidate
                    autoComplete="off"
                >
                    <Grid container spacing={2}>

                        {/* ---------------- customer list ------------- */}

                        <Grid item xs={2} className='d-flex'>
                            <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                Customer
                            </Typography>
                        </Grid>

                        <Grid item xs={10} className='text-left' style={{ textAlign: 'left' }}>
                            <Autocomplete
                                disablePortal
                                id="customer-box-demo"
                                options={customerList}
                                sx={{ width: 170 }}
                                size='small'
                                value={customerList.find(customer => customer.id === formData.customer_id) || null}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, newValue) => {
                                    setFormData({
                                        ...formData,
                                        customer_id: newValue ? newValue.id : null,

                                    });
                                }}

                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        label="Customer"
                                    />
                                }
                            />

                        </Grid>

                        <Grid item xs={2} className='d-flex' >
                            <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                Quantity
                            </Typography>
                        </Grid>

                        <Grid item xs={10} className="text-start">
                            <Controller
                                name="quantity"
                                control={control}
                                render={({ field }) => (
                                    <NumericFormat
                                        {...field}
                                        placeholder="Enter in liter"
                                        thousandSeparator={true}
                                        // prefix={'liter'}
                                        allowNegative={false}
                                        size='small'
                                        value={formData.amount}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        customInput={TextField}
                                        onValueChange={(values) => {
                                            setFormData({ ...formData, quantity: values.floatValue })
                                        }}
                                        error={Boolean(errors && errors['quantity'])}

                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={2} className='d-flex' >
                            <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                Milking Time
                            </Typography>
                        </Grid>

                        <Grid item xs={10} className='text-left' style={{ textAlign: 'left' }}>
                            <FormControl>
                                {/* <FormLabel id="payment-controlled-radio-buttons-group">Gender</FormLabel> */}
                                <RadioGroup
                                    row
                                    aria-labelledby="time-details-controlled-radio-buttons-group"
                                    name="milking_time"
                                    value={formData.milking_time}
                                    onChange={handleChange}
                                    {...register('milking_time')}
                                >

                                    {TIME_DETAILS.map((row, index) => {
                                        return (
                                            <FormControlLabel key={index} value={row.value} control={<Radio />} label={row.label} />
                                        )
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </Grid>


                        <Grid item xs={2} className='d-flex' >
                            <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                Payment Date
                            </Typography>
                        </Grid>

                        <Grid item xs={5} className='text-start'>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        disableFuture
                                        label="Time"
                                        value={dayjs.utc(formData.payment_date)}
                                        // minDate={new Date('01-01-2014')}
                                        format="DD-MM-YYYY"
                                        defaultValue={dayjs()}
                                        onChange={(newValue) => {
                                            formData.payment_date = newValue.toDate()
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                size='small'
                                                variant='standard'
                                                {...register('payment_date', { required: true, valueAsDate: true, onChange: handleChange })}
                                                error={Boolean(errors && errors['payment_date'])}
                                                helperText={errors['payment_date']?.message}
                                            />
                                        )}
                                        sx={{ width: 200 }}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={5}></Grid>




                        <Grid item xs={2} className='d-flex'>
                            <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                Payment Option
                            </Typography>
                        </Grid>

                        <Grid item xs={10} className='text-left' style={{ textAlign: 'left' }}>

                            <FormControl>
                                {/* <FormLabel id="payment-controlled-radio-buttons-group">Gender</FormLabel> */}
                                <RadioGroup
                                    row
                                    aria-labelledby="payment-controlled-radio-buttons-group"
                                    name="payment_option"
                                    value={formData.payment_option}
                                    onChange={handleChange}
                                // {...register('payment_option')}
                                // {...register('payment_option')}
                                >
                                    <FormControlLabel value={1} control={<Radio />} label="Full" />
                                    <FormControlLabel value={2} control={<Radio />} label="Half" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        {formData.payment_option == 2 && (
                            <>
                                <Grid item xs={2} className='d-flex'>
                                    <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                        Half Payment
                                    </Typography>
                                </Grid>

                                <Grid item xs={3} className='text-left'>
                                    <Controller
                                        name="half_payment"
                                        control={control}
                                        render={({ field }) => (
                                            <NumericFormat
                                                {...field}
                                                placeholder="Payment"
                                                thousandSeparator={true}
                                                // prefix={'₹'}
                                                allowNegative={false}
                                                size='small'
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">₹</InputAdornment>
                                                    )
                                                }}
                                                value={formData.half_payment}
                                                decimalScale={2}
                                                fixedDecimalScale={true}
                                                customInput={TextField}
                                                onValueChange={(values) => {
                                                    setFormData({ ...formData, half_payment: values.floatValue })
                                                }}
                                                {...register('half_payment', { onChange: handleChange })}
                                                error={Boolean(errors && errors['half_payment'])}
                                            />
                                        )}
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Box>

                <Box className='text-right margin2_10'>
                    <Button
                        variant='contained'
                        color="primary"
                        type='submit'
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </Item>
        {loader}
        <ToastContainer />

    </>;
};

export default MonthlyPayment;