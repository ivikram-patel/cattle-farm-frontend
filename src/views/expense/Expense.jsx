/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
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

// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router'


const MONTHS_LIST_ARRAY = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' }
];

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

const Expense = () => {
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [amountData, setAmountData] = useState([]);
    const [milkDateTime, setMilkDateTime] = useState(dayjs())
    const navigate = useNavigate();

    const validation = Yup.object().shape({
        amount: Yup.string().required(),
        month: Yup.string().required(),
        description: Yup.string().required(),
        // milk_date_time: Yup.string().required(),
    });

    const {
        register,
        // setError,
        control,
        // setValue,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validation)
    });


    // console.log(errors)
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    const submitForm = async (data) => {

        showLoader()
        const isError = amountData == undefined || amountData == 0 ? true : false

        if (isError) {
            toast.error('Please enter amount.')
            return;
        }

        const submitData = { amount: amountData, date: milkDateTime.toDate(), month: parseInt(data.month), description: data.description }

        let endPoint = `api/submit-expense`;

        try {

            const apiResponse = await axiosInstance.post(endPoint, submitData);

            if (apiResponse.status === 200) {
                toast.success(apiResponse.message);
                navigate('/expenses')
            }

            hideLoader();
        } catch (error) {
            console.log(error);
        } finally {
            hideLoader()
        }
    };
    return (
        <>
            <Item>
                <form onSubmit={handleSubmit(submitForm)}>
                    <Box sx={{ '& > :not(style)': { m: 1, width: '90%' } }} noValidate autoComplete="off">
                        <Grid container spacing={2}>

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
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            customInput={TextField}
                                            onValueChange={(values) => {
                                                setAmountData(values.floatValue)
                                            }}
                                            error={Boolean(errors && errors['amount'])}

                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={2} className="d-flex" style={{ alignItems: 'center' }}>
                                <Typography variant="subtitle1" className="text-capitalize" style={{ fontSize: 14 }}>
                                    Month
                                </Typography>
                            </Grid>

                            <Grid item xs={10} className="text-start">

                                <FormControl sx={{ minWidth: 180 }} size="small" error={Boolean(errors && errors['month'])}>
                                    <InputLabel id="month-time-select-small-label">Month </InputLabel>
                                    <Select
                                        labelId="month-time-select-small-label"
                                        id="month-time-select-small"
                                        label="વિગતો"
                                        name='month'
                                        // value={formData.add_detail || ''}
                                        classes={{ select: "custom-select-label" }}

                                        MenuProps={{
                                            disableScrollLock: true,
                                            PaperProps: { sx: { maxHeight: 200 } }
                                        }}

                                        inputProps={{
                                            ...register('month', {
                                                require: true,
                                                // onChange: handleChange,
                                            })
                                        }}
                                    >

                                        {MONTHS_LIST_ARRAY.map((row) => {
                                            return (
                                                <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
                                            )
                                        })}

                                    </Select>
                                </FormControl>
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
                                            label="સમય"
                                            value={milkDateTime}
                                            // minDate={new Date('01-01-1949')}
                                            inputFormat="dd/MM/yyyy"
                                            onChange={(newValue) => {
                                                // console.log(newValue)
                                                setMilkDateTime(newValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant='standard'
                                                    {...register('milk_date_time', { required: true, valueAsDate: true })}
                                                    error={Boolean(errors && errors['milk_date_time'])}
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
                                    rows={6}
                                    size="small"
                                    {...register('description')}
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

export default Expense;

