/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    // FormControlLabel,
    // Radio,
    // RadioGroup,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useFullPageLoader } from 'hooks/useFullPageLoader';
// import axiosInstance from 'custom-axios';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosInstance from 'custom-axios';
import { useEffect } from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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

const SellCattle = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [cattleTagNo, setCattleTagNo] = useState([]);
    const [formData, setFormData] = useState({
        id: id ? id : 0,
        cattle_tag: '',
        cattle_price: 0,
        sell_cattle_time: dayjs(),
        note: '',
    });


    const validation = Yup.object().shape({
        cattle_tag: Yup.string().required(),
        cattle_price: Yup.string().required()
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const fetchCattleTag = async () => {
        showLoader();
        try {
            const apiResponse = await axiosInstance.get(`api/cattle-tag-details`);

            setCattleTagNo(apiResponse.data)

        } catch (error) {
            console.log(error);
        } finally {
            hideLoader();
        }
    }

    // console.log(cattleTagNo)

    const fetchCattleDetails = async () => {
        showLoader();

        try {
            const response = await axiosInstance.get(`api/sell-cattle-detail/${id}`);

            setFormData(response.data)
            setValue('cattle_tag', response.data.cattle_tag)
            setValue('cattle_price', response.data.cattle_price)
            setValue('sell_cattle_time', response.data.sell_cattle_time)
            setValue('note', response.data.note)

        } catch (error) {
            toast.error(error.message);
        } finally {
            hideLoader();
        }
    };

    const submitForm = async () => {

        let endPoint = `api/submit-sell-cattle-details`;

        showLoader();

        try {
            const response = await axiosInstance.post(endPoint, formData);

            if (response.status === 200) {
                toast.success(response.message);
                navigate('/sell-cattles');
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            hideLoader();
        }
    };

    useEffect(() => {
        fetchCattleTag()
        if (id) {
            fetchCattleDetails()
        }
    }, [])

    return (
        <>
            <Item>
                <form onSubmit={handleSubmit(submitForm)}>
                    <input type='hidden' name='id' {...register('id')} defaultValue={id || 0} />
                    <Box sx={{ '& > :not(style)': { m: 1, width: '90%' } }} noValidate autoComplete="off">

                        <Grid container spacing={2}>

                            <Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
                                <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                    Tag
                                </Typography>
                            </Grid>

                            <Grid item xs={10} className='text-left' style={{ textAlign: 'left' }}>

                                <FormControl sx={{ minWidth: 180 }} size="small" error={Boolean(errors && errors['cattle_tag'])}>
                                    <InputLabel id="milk-time-select-small-label">Tag</InputLabel>
                                    <Select
                                        labelId="milk-time-select-small-label"
                                        id="milk-time-select-small"
                                        label="tag"
                                        name='cattle_tag'
                                        value={formData.cattle_tag || ''}
                                        classes={{ select: "custom-select-label" }}
                                        onChange={handleChange}
                                        MenuProps={{
                                            disableScrollLock: true,
                                            PaperProps: { sx: { maxHeight: 200 } }
                                        }}

                                        inputProps={{
                                            ...register('cattle_tag', {
                                                require: true,
                                                // onChange: handleChange,
                                            })
                                        }}
                                    >

                                        {cattleTagNo.map((row, index) => {
                                            return (
                                                <MenuItem key={index} value={row.tag_no}>{row.tag_no}</MenuItem>
                                            )
                                        })}

                                    </Select>
                                </FormControl>
                            </Grid>


                            <Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
                                <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                    Price
                                </Typography>
                            </Grid>

                            <Grid item xs={10} className='text-start'>
                                <TextField
                                    label="Price"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.cattle_price || ''}
                                    size='small'
                                    {...register('cattle_price', { onChange: handleChange })}
                                    error={!!errors.cattle_price}
                                />
                            </Grid>

                            <Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
                                <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                    સમય
                                </Typography>
                            </Grid>

                            <Grid item xs={3} className='text-start'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            disableFuture
                                            label="Time"
                                            value={dayjs.utc(formData.sell_cattle_time)}
                                            // minDate={new Date('01-01-2014')}
                                            format="DD-MM-YYYY"
                                            defaultValue={dayjs()}
                                            onChange={(newValue) => {
                                                formData.sell_cattle_time = newValue.toDate()
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size='small'
                                                    variant='standard'
                                                    {...register('sell_cattle_time', { required: true, valueAsDate: true, onChange: handleChange })}
                                                    error={Boolean(errors && errors['sell_cattle_time'])}
                                                    helperText={errors['sell_cattle_time']?.message}
                                                />
                                            )}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={7}></Grid>


                            <Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
                                <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                    Notes
                                </Typography>
                            </Grid>

                            <Grid item xs={10} className='text-start'>
                                <TextField
                                    label="Notes"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.note || ''}
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
                            // className='blue-button'
                            type='submit'
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

export default SellCattle;