/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert, Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useFullPageLoader } from 'hooks/useFullPageLoader';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/en'; // Import the desired locale
import axiosInstance from 'custom-axios';

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

const MilkRecord = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        id: id ? id : 0,
        milk_date: dayjs(),
        am_total: 0,
        pm_total: 0,
        daily_milk_production: 0,
        note: '',
        rate: 0,
        daily_milk_revenue: 0,
    });

    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [milkRate, setMilkRate] = useState(0)

    const validation = Yup.object().shape({
        am_total: Yup.string().required(),
        pm_total: Yup.string().required(),
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

    const fetchMilkRate = async () => {
        showLoader();
        try {
            const apiResponse = await axiosInstance.get(`api/milk-rate`);

            setFormData({ ...formData, rate: apiResponse })
            setMilkRate(apiResponse)

        } catch (error) {
            console.log(error);
        } finally {
            hideLoader();
        }
    }

    const fetchMilkData = async () => {
        showLoader();

        try {
            const apiResponse = await axiosInstance.get(`api/milk-detail/${id}`);

            setFormData(apiResponse.data)

            setValue('milk_date', apiResponse.data.milk_date)
            setValue('am_total', apiResponse.data.am_total)
            setValue('pm_total', apiResponse.data.pm_total)
            setValue('daily_milk_production', apiResponse.data.daily_milk_production)
            setValue('note', apiResponse.data.note)
            setValue('daily_milk_revenue', apiResponse.data.daily_milk_revenue)

        } catch (error) {
            console.log(error);
        } finally {
            hideLoader();
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    };

    const submitForm = async () => {
        let endPoint = `api/submit-milk-prod`;

        console.table([formData])
        try {
            const apiResponse = await axiosInstance.post(endPoint, formData);

            if (apiResponse.status === 200) {
                toast.success(apiResponse.message);
                navigate('/milk-records')
            }

            hideLoader();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMilkRate()
        if (id) {
            fetchMilkData()
        }
    }, [])

    useEffect(() => {
        const calculateTotal = () => {
            const { am_total, pm_total } = formData;
            let currentRate = 56;
            let totalMilkProduction = 0;

            totalMilkProduction = parseFloat(am_total) + parseFloat(pm_total);

            if (isNaN(totalMilkProduction)) {
                totalMilkProduction = 0;
            }

            totalMilkProduction = parseFloat(totalMilkProduction.toFixed(2));

            let milkTotalPricePerDay = totalMilkProduction * currentRate;

            setFormData((prevData) => ({ ...prevData, daily_milk_production: totalMilkProduction, daily_milk_revenue: milkTotalPricePerDay }));
        };

        calculateTotal();
    }, [formData.am_total, formData.pm_total]);






    return <>

        <Item>
            <form onSubmit={handleSubmit(submitForm)}>
                <Box
                    sx={{ '& > :not(style)': { m: 1, width: '90%' } }}
                    noValidate
                    autoComplete="off"
                >
                    <Alert severity="info">Current Rate: ₹{milkRate} per liter</Alert>
                    <Grid container spacing={2}>

                        <Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
                            <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                દૂધનો સમય
                            </Typography>
                        </Grid>

                        <Grid item xs={3} className='text-start'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        disableFuture
                                        label="Time"
                                        value={dayjs.utc(formData.milk_date)}
                                        // minDate={new Date('01-01-1949')}
                                        format="DD-MM-YYYY"
                                        defaultValue={dayjs()}
                                        onChange={(newValue) => {
                                            formData.milk_date = newValue.toDate()
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                size='small'
                                                variant='standard'
                                                {...register('milk_date', { required: true, valueAsDate: true, onChange: handleChange })}
                                                error={Boolean(errors && errors['milk_date'])}
                                                helperText={errors['milk_date']?.message}
                                            />
                                        )}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={7}></Grid>

                        {/*-------------------- morning milk total -------------------- */}
                        <Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
                            <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                A.M Total
                            </Typography>
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                id="outlined-number"
                                label="in Liter"
                                type="number"
                                size='small'
                                {...register('am_total', { onChange: handleChange })}
                                fullWidth
                                value={formData.am_total || ''}
                                error={!!errors.am_total}
                            />
                        </Grid>
                        <Grid item xs={7}></Grid>


                        {/* ----------------- evening milk total ----------------*/}
                        <Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
                            <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                P.M Total
                            </Typography>
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                id="outlined-number"
                                label="In Liter"
                                type="number"
                                size='small'
                                {...register('pm_total', { onChange: handleChange })}
                                fullWidth
                                value={formData.pm_total || ''}
                                error={!!errors.pm_total}
                            />
                        </Grid>
                        <Grid item xs={7}></Grid>


                        <Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
                            <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                Daily Milk Produced
                            </Typography>
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                id="outlined-number"
                                label="Liter"
                                type="number"
                                disabled
                                size='small'
                                {...register('daily_milk_production', { onChange: handleChange })}
                                fullWidth
                                value={formData.daily_milk_production || ''}
                            />
                        </Grid>
                        <Grid item xs={7}></Grid>

                        <Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
                            <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                Daily Milk Revenue
                            </Typography>
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                id="outlined-number"
                                label="₹"
                                type="number"
                                disabled
                                size='small'
                                {...register('daily_milk_revenue', { onChange: handleChange })}
                                fullWidth
                                value={formData.daily_milk_revenue || ''}
                            />
                        </Grid>
                        <Grid item xs={7}></Grid>

                        <Grid item xs={2} className='d-flex'>
                            <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                Note
                            </Typography>
                        </Grid>

                        <Grid item xs={10} className='text-start'>
                            <TextField
                                label="Note"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={6}
                                size='small'
                                {...register('note', { onChange: handleChange })}
                            />
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
        <ToastContainer />
        {loader}
    </>;
};

export default MilkRecord;