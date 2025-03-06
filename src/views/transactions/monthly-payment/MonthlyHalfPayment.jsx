/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert, Autocomplete, Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material';
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


const MonthlyHalfPayment = () => {
    const navigate = useNavigate();
    const { id, customer_id } = useParams();
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [customerList, setCustomerList] = useState([])
    const [milkRate, setMilkRate] = useState(0)
    const [customerMilkQuantity, setCustomerMilkQuantity] = useState(0)
    const [originalDueAmount, setOriginalDueAmount] = useState("");
    const [formData, setFormData] = useState({
        id: id ? id : 0,
        due_amount: 0,
        new_due_amount: 0,
        customer_id: '',
        payment_date: dayjs(),
        // note: '',
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
        // resolver: yupResolver(validationSchema)
    });

    const fetchCustomerList = async () => {
        showLoader();
        try {
            const response = await axiosInstance.get(`api/customer-details`);

            const convertedData = response.data.map(item => ({
                label: item.first_name,
                id: item.id,
                quantity: item.quantity
            }));
            setCustomerList(convertedData)
        } catch (error) {
            toast.error(error.message);
        } finally {
            hideLoader();
        }
    };

    const fetchMonthlyHalfPayment = async () => {
        showLoader();
        try {
            const response = await axiosInstance.get(`api/monthly-half-payment-details/${id}/${customer_id}`);
            setFormData(response.data)
            setOriginalDueAmount(response.data.due_amount);
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

        if (formData.due_amount == 0) {
            toast.error('Please Add Due Amount.')
            return;
        }

        let endPoint = `api/submit-half-monthly-payment`;
        try {
            const apiResponse = await axiosInstance.post(endPoint, formData);
            if (apiResponse.status === 200) {
                toast.success(apiResponse.message);
                navigate('/monthly-payments')
            } else {
                toast.error(apiResponse.message)
            }
            hideLoader();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const calculateTotalAmount = () => {
            const { half_payment, total_amount } = formData;
            const plainHalfPaymentValue = (half_payment > 0) ? parseFloat(half_payment.toString().replace(/,/g, '')) : 0.00;

            let dueAmount = parseFloat(formData.due_amount);
            let totalAmount = parseFloat(total_amount);

            let newHalfPayment = plainHalfPaymentValue + dueAmount;
            let totalDueAmount = totalAmount - newHalfPayment;


            if (isNaN(dueAmount)) {
                dueAmount = 0;
            }

            if (newHalfPayment > totalAmount) {

                dueAmount = originalDueAmount

            } else {

                if (dueAmount === 0) {
                    // dueAmount = totalAmount - plainHalfPaymentValue;
                    totalDueAmount = originalDueAmount
                } else if (dueAmount > originalDueAmount) {
                    console.log('New due amount cannot exceed original due amount');
                    dueAmount = originalDueAmount;
                }
            }
            setFormData(prevFormData => ({
                ...prevFormData,
                due_amount: dueAmount,
                new_due_amount: totalDueAmount,
            }));
        };

        calculateTotalAmount();
    }, [formData.due_amount, formData.half_payment, formData.total_amount]);

    useEffect(() => {
        fetchCustomerList()
        fetchMonthlyHalfPayment()
    }, [])

    return <>

        <Item>
            <form onSubmit={handleSubmit(submitForm)}>
                <Box
                    sx={{ '& > :not(style)': { m: 1, width: '90%' } }}
                    noValidate
                    autoComplete="off"
                >
                    <Alert severity="info">Current Rate: ₹{formData.milk_rate} per liter</Alert>
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
                                sx={{ width: 300 }}
                                size='small'
                                value={customerList.find(customer => customer.id === formData.customer_id) || null}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, newValue) => { changeCustomer(event, newValue) }}
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
                                                {...register('payment_date')}
                                            />
                                        )}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={5}></Grid>


                        <Grid item xs={2} className='d-flex'>
                            <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                Due Amount
                            </Typography>
                        </Grid>

                        <Grid item xs={3} className='text-left'>
                            <Controller
                                name="due_amount"
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
                                        value={formData.due_amount}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        customInput={TextField}
                                        onValueChange={(values) => {
                                            setFormData({ ...formData, due_amount: values.floatValue })
                                        }}
                                    // {...register('due_amount', { onChange: handleChange })}
                                    // error={Boolean(errors && errors['due_amount'])}

                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={3} >
                            <Typography variant="h4">બાકી રકમ: {formData.new_due_amount}</Typography>
                        </Grid>

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

export default MonthlyHalfPayment;