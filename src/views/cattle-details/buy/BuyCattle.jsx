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
    TextField,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { CATTLE_OBTAIN_DETAILS } from 'store/constant';
import { useFullPageLoader } from 'hooks/useFullPageLoader';
// import axiosInstance from 'custom-axios';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosInstance from 'custom-axios';
import { useEffect } from 'react';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

const BuyCattle = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [formData, setFormData] = useState([]);

    const validation = Yup.object().shape({
        tag_no: Yup.string().required(),
        cattle_obtain_from: Yup.string().required(),
        cattle_obtain_from_other: Yup.string().when('cattle_obtain_from', {
            is: '3',
            then: Yup.string().nullable().required('Please provide details for Other'),
            otherwise: Yup.string().nullable()
        }),
        // gender: Yup.string().nullable().required('Please select a gender')
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


    const fetchCattleDetails = async () => {
        showLoader();

        try {
            const response = await axiosInstance.get(`api/cattle-detail/${id}`);

            setFormData({
                ...formData,
                'breed': response.data.breed,
                'tag_no': response.data.tag_no,
                'cattle_obtain_from': response.data.cattle_obtain_from,
                'cattle_obtain_from_other': response.data.cattle_obtain_from_other,
                'note': response.data.note,
            })

            setValue('breed', response.data.breed)
            setValue('tag_no', response.data.tag_no)
            setValue('cattle_obtain_from', response.data.cattle_obtain_from)
            setValue('cattle_obtain_from_other', response.data.cattle_obtain_from_other)
            setValue('note', response.data.note)

        } catch (error) {
            toast.error(error.message);
        } finally {
            hideLoader();
        }
    };


    const submitForm = async (data) => {

        let endPoint = `api/submit-cattle-details`;

        showLoader();

        try {
            const response = await axiosInstance.post(endPoint, data);

            if (response.status === 200) {
                toast.success(response.message);
                navigate('/buy-cattles');
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
        if (id) {
            fetchCattleDetails()
        }
    }, [id])

    return (
        <>
            <Item>
                <form onSubmit={handleSubmit(submitForm)}>
                    <input type='hidden' name='id' {...register('id')} defaultValue={id || 0} />
                    {/* <input type='hidden' {...register('id')} value={id} /> */}
                    <Box sx={{ '& > :not(style)': { m: 1, width: '90%' } }} noValidate autoComplete="off">

                        <Grid container spacing={2}>

                            <Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
                                <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                    Breed
                                </Typography>
                            </Grid>

                            <Grid item xs={10} className='text-start'>
                                <TextField
                                    label="Breed"
                                    // variant="outlined"
                                    fullWidth
                                    size='small'
                                    value={formData.breed || ''}
                                    {...register('breed', { onChange: handleChange })}
                                />
                            </Grid>

                            <Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
                                <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                    Tag *
                                </Typography>
                            </Grid>

                            <Grid item xs={10} className='text-start'>
                                <TextField
                                    label="Tag"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.tag_no || ''}
                                    size='small'
                                    {...register('tag_no', { onChange: handleChange })}
                                    error={!!errors.tag_no}
                                />
                            </Grid>

                            <Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
                                <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                    Cattle Obtain from
                                </Typography>
                            </Grid>

                            <Grid item xs={10} className='text-left' style={{ textAlign: 'left' }}>

                                <FormControl sx={{ minWidth: 180 }} size="small" error={Boolean(errors && errors['cattle_obtain_from'])}>
                                    <InputLabel id="milk-time-select-small-label">Obtain From </InputLabel>
                                    <Select
                                        labelId="milk-time-select-small-label"
                                        id="milk-time-select-small"
                                        label="Obtain From"
                                        name='cattle_obtain_from'
                                        value={formData.cattle_obtain_from || ''}
                                        classes={{ select: "custom-select-label" }}
                                        onChange={handleChange}
                                        MenuProps={{
                                            disableScrollLock: true,
                                            PaperProps: { sx: { maxHeight: 200 } }
                                        }}

                                        inputProps={{
                                            ...register('cattle_obtain_from', {
                                                require: true,
                                                // onChange: handleChange,
                                            })
                                        }}
                                    >

                                        {CATTLE_OBTAIN_DETAILS.map((row, index) => {
                                            return (
                                                <MenuItem key={index} value={row.value}>{row.label}</MenuItem>
                                            )
                                        })}

                                    </Select>
                                </FormControl>
                            </Grid>


                            {formData.cattle_obtain_from == 3 ?
                                <>
                                    <Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
                                        <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                            Other
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={10} className='text-start'>
                                        <TextField
                                            label="Other"
                                            variant="outlined"
                                            fullWidth
                                            value={formData.cattle_obtain_from_other || ''}
                                            size='small'
                                            {...register('cattle_obtain_from_other', { onChange: handleChange })}
                                            error={!!errors.cattle_obtain_from_other}
                                        />
                                    </Grid>
                                </> : ''}

                            {formData.cattle_obtain_from == 1 ?
                                <>
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
                                </> : ''}



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

export default BuyCattle;