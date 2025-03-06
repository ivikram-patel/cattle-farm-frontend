/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
// import { useNavigate, useParams } from 'react-router'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Autocomplete, Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
// import { useFullPageLoader } from 'hooks/useFullPageLoader';
// import axiosInstance from 'custom-axios';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TIME_DETAILS } from 'store/constant';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));


const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
        label: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },

];

const Transaction = () => {

    const [formData, setFormData] = useState([])
    const [milkDateTime, setMilkDateTime] = useState()

    const validation = Yup.object().shape({
        add_detail: Yup.string().required(),
        // milk_date_time: Yup.string().required(),
        customer_name: Yup.string().required(),
        // payment_option: Yup.string().required(),
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

    console.log(errors)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    };

    const submitForm = async (data) => {
        // console.log("Submit Data:")
        // console.log(data, milkDateTime, formData)

        let endPoint = `api/submit-milk-prod`;
        try {
            const apiResponse = await axiosInstance.post(endPoint, submitData);
            if (apiResponse.status === 'success') {
                toast.success(apiResponse.message);
            }
            hideLoader();
        } catch (error) {
            console.log(error);
        }

    }

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
                                વિગતો
                            </Typography>
                        </Grid>

                        <Grid item xs={10} className='text-left' style={{ textAlign: 'left' }}>

                            {/* <FormControl sx={{ minWidth: 180 }} size="small" error={Boolean(errors && errors['add_detail'])}>

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

                                    {TIME_DETAILS.map((row, index) => {
                                        return (
                                            <MenuItem key={index} value={row.value}>{row.label}</MenuItem>
                                        )
                                    })}

                                </Select>
                            </FormControl> */}

                            <FormControl>
                                {/* <FormLabel id="payment-controlled-radio-buttons-group">Gender</FormLabel> */}
                                <RadioGroup
                                    row
                                    aria-labelledby="time-details-controlled-radio-buttons-group"
                                    name="add_detail"
                                    value={formData.add_detail}
                                    onChange={handleChange}
                                >

                                    {TIME_DETAILS.map((row, index) => {
                                        return (
                                            <FormControlLabel key={index} value={row.value} control={<Radio />} label={row.label} />
                                        )
                                    })}
                                    {/* <FormControlLabel value="full" control={<Radio />} label="Full" />
                                    <FormControlLabel value="half" control={<Radio />} label="Half" /> */}
                                </RadioGroup>
                            </FormControl>
                        </Grid>


                        <Grid item xs={2} className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
                            <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                દૂધનો સમય
                            </Typography>
                        </Grid>

                        <Grid item xs={5} className='text-start'>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        disableFuture
                                        label="દૂધનો સમય"
                                        value={milkDateTime}
                                        // minDate={new Date('01-01-1949')}
                                        inputFormat="dd/MM/yyyy"
                                        onChange={(newValue) => {
                                            setMilkDateTime(newValue);
                                            formData.milk_date_time = newValue.toDate()
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


                        {/* ---------------- customer list ------------- */}
                        <Grid item xs={2} className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
                            <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                Customer
                            </Typography>
                        </Grid>

                        <Grid item xs={10} className='text-left' style={{ textAlign: 'left' }}>
                            <Autocomplete
                                disablePortal
                                id="customer-box-demo"
                                options={top100Films}
                                sx={{ width: 300 }}
                                size='small'
                                renderInput={(params) => <TextField {...params} label="Customer" />}
                            />
                        </Grid>


                        <Grid item xs={2} className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
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
                                >
                                    <FormControlLabel value="full" control={<Radio />} label="Full" />
                                    <FormControlLabel value="half" control={<Radio />} label="Half" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        {formData.payment_option == 'half' && (
                            <>
                                <Grid item xs={2} className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
                                    <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                        Half Payment
                                    </Typography>
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField
                                        label="Half Payment"
                                        fullWidth
                                        size="small"
                                        margin="dense"
                                        value={formData.half_payment}
                                        name='half_payment'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">₹</InputAdornment>
                                            )
                                        }}

                                        {...register('half_payment', { onChange: handleChange })}
                                        error={Boolean(errors && errors['half_payment'])}
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
    </>;
};

export default Transaction;