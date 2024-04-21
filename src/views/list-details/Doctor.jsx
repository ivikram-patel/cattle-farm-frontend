/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
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

const Doctor = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const initialValue = {
        id: id ? id : 0,
        gender: 1
    }
    const [formData, setFormData] = useState(initialValue)

    const validation = Yup.object().shape({
        first_name: Yup.string().required(),
        surname: Yup.string().required(),
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


    const fetchData = async () => {
        showLoader();

        try {
            const apiResponse = await axiosInstance.get(`api/doctor-detail/${id}`);
            console.log(apiResponse)
            const apiData = apiResponse.data;

            if (apiResponse.status === 200) {

                setFormData({
                    ...formData,
                    'first_name': apiData.first_name,
                    'last_name': apiData.middle_name,
                    'gender': apiData.gender,
                    'surname': apiData.surname,
                    'phone_no': apiData.phone_no,
                    'address': apiData.address,
                })


                setValue('first_name', apiData.first_name)
                setValue('last_name', apiData.middle_name)
                setValue('gender', apiData.gender)
                setValue('surname', apiData.surname)
                setValue('phone_no', apiData.phone_no)
                setValue('address', apiData.address)
            }

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

        let endPoint = `api/submit-doctor-details`;
        let redirectPage = '/doctors-list';

        showLoader();

        try {
            const response = await axiosInstance.post(endPoint, formData);

            if (response.status === 200) {

                toast.success(response.message);

                console.log(redirectPage);
                navigate(redirectPage);

            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error(error)

        } finally {
            hideLoader();
        }
        // }
    }


    useEffect(() => {
        if (id) {
            fetchData()
        }
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

                        <input type='hidden' {...register('id')} value={id} />
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
                                value={formData.first_name}
                                {...register('first_name', { onChange: handleChange })}
                                error={!!errors.first_name}
                                // helperText={errors.first_name?.message}
                                InputLabelProps={{ shrink: true }}
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
                                value={formData.last_name}
                                InputLabelProps={{ shrink: true }}
                                {...register('last_name')}
                                onChange={handleChange} c
                                error={!!errors.last_name}
                                helperText={errors.last_name?.message}
                            />
                        </Grid>


                        <Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
                            <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                Gender
                            </Typography>
                        </Grid>

                        <Grid item xs={10} className='text-left' style={{ textAlign: 'left' }}>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="gender-controlled-radio-buttons-group"
                                    name="gender"
                                    value={parseInt(formData.gender)}
                                    {...register('gender', { required: true, onChange: handleChange })}

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
                                InputLabelProps={{ shrink: true }}
                                {...register('surname', { onChange: handleChange })}
                                error={!!errors.surname}
                                helperText={errors.surname?.message}
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
                                InputLabelProps={{ shrink: true }}
                                size='small'
                                {...register('phone_no', { onChange: handleChange })}
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
                                InputLabelProps={{ shrink: true }}
                                rows={6}
                                size='small'
                                {...register('address', { onChange: handleChange })}
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

export default Doctor;