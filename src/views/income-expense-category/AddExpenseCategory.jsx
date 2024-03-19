/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
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

const AddExpenseCategory = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const validation = Yup.object().shape({
        category_name: Yup.string().required(),
        // captcha: Yup.string().required(),
    });


    const {
        register,
        // setError,
        setValue,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validation)
    });


    const fetchExpenseCatDetails = async () => {
        showLoader();

        try {
            const response = await axiosInstance.get(`api/expenses-category-details/${id}`);
            setValue('category_name', response.data.name)

        } catch (error) {
            toast.error(error.message);
        } finally {
            hideLoader();
        }
    };

    const submitForm = async (data) => {


        console.log(data)

        showLoader();

        let endPoint = `api/submit-expense-category`;

        try {
            const response = await axiosInstance.post(endPoint, data);

            if (response.status === 200) {

                toast.success(response.message);
                navigate('/expense-categories')


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
        if (id) {
            fetchExpenseCatDetails()
        }
    }, [])

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
                            <input type='hidden' name='id' {...register('id')} defaultValue={id || 0} />
                            <Grid item xs={2} className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
                                <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                    Name
                                </Typography>
                            </Grid>

                            <Grid item xs={10}>
                                <FormControl fullWidth margin="normal">
                                    <Controller
                                        name="category_name"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className='width100'
                                                label="Expense"
                                                variant="outlined"
                                                fullWidth
                                                error={!!errors.category_name}
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

export default AddExpenseCategory;