/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
// import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, FormControl, Grid, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useFullPageLoader } from 'hooks/useFullPageLoader';
import axiosInstance from 'custom-axios';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import { useState } from 'react';
// import { blockSpecialChar } from 'styles/commonFunction';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const MilkRate = () => {
    const navigate = useNavigate();
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    // const [milkRate, setMilkRate] = useState(0)


    const validation = Yup.object().shape({
        milk_rate: Yup.string().required(),
        // captcha: Yup.string().required(),
    });


    const {
        // register,
        // setError,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validation)
    });


    const submitForm = async (data) => {


        console.log(data)

        showLoader();

        let endPoint = `api/submit-milk-rate`;

        try {
            const response = await axiosInstance.post(endPoint, data);

            if (response.status === 200) {

                navigate('/milk-rates')
                toast.success(response.message);


            } else {
                toast.error(response.message);
            }
        } catch (error) {
            
            console.error(error)

        } finally {
            hideLoader();
        }

    };

    useEffect(() => {
        // fetchData();
    }, []);

    return (
        <div>
            <Item>
                <form onSubmit={handleSubmit(submitForm)}>
                    <Box
                        sx={{
                            '& > :not(style)': { m: 1, width: '90%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Grid container spacing={2}>

                            <Grid item xs={2} className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
                                <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                    Rate
                                </Typography>
                            </Grid>

                            <Grid item xs={10}>
                                <FormControl fullWidth margin="normal">
                                    <Controller
                                        name="milk_rate"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className='width100'
                                                label="Rate"
                                                variant="outlined"
                                                fullWidth
                                                error={!!errors.milk_rate}
                                            // onKeyDown={blockSpecialChar}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>


                    </Box>


                    <Box className='text-right margin2_10'>
                        <Button
                            variant='contained'
                            color="primary"
                            className='blue-button'
                            type='submit'
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
            </Item>
            {loader}
            <ToastContainer />
        </div >
    );
}

export default MilkRate;

