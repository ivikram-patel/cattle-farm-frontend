/* eslint-disable prettier/prettier */
import React from 'react'
// import { useNavigate, useParams } from 'react-router'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
// import { useFullPageLoader } from 'hooks/useFullPageLoader';
// import axiosInstance from 'custom-axios';
// import { Controller, useForm } from 'react-hook-form';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

const MilkProduction = () => {
    // const navigate = useNavigate();
    // const { id } = useParams();
    // const [loader, showLoader, hideLoader] = useFullPageLoader();

    //   const validation = Yup.object().shape({
    //     assetCategory: Yup.string().required()
    //     // captcha: Yup.string().required(),
    //   });

    //   const {
    //     register,
    //     setError,
    //     control,
    //     setValue,
    //     handleSubmit,
    //     formState: { errors }
    //   } = useForm({
    //     resolver: yupResolver(validation)
    //   });

    return <>
        <Item>
            {/* <form onSubmit={handleSubmit(submitForm)}> */}
            <form>
                <Box
                    sx={{ '& > :not(style)': { m: 1, width: '90%' } }}
                    noValidate
                    autoComplete="off"
                >
                    <Grid container spacing={2}>
                        <Grid item xs={2} className='d-flex justify-content-end align-item-center'>
                            <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                સમય
                            </Typography>
                        </Grid>

                        <Grid item xs={10} className='text-left' style={{ textAlign: 'left' }}>
                            <FormControl sx={{ minWidth: 180 }} size="small">
                                <InputLabel id="milk-time-select-small-label">સમય </InputLabel>
                                <Select
                                    labelId="milk-time-select-small-label"
                                    id="milk-time-select-small"
                                    label="સમય"
                                    // value={formData.milk - time || ''}
                                    classes={{ select: "custom-select-label" }}
                                    MenuProps={{
                                        disableScrollLock: true,
                                        PaperProps: { sx: { maxHeight: 200 } }
                                    }}
                                // inputProps={{
                                //     ...register('asset_class', {
                                //         require: true,
                                //         onChange: handleChange,
                                //     })
                                // }}
                                >
                                    <MenuItem value='1'>સવાર</MenuItem>
                                    <MenuItem value='2'>સાંજ</MenuItem>
                                </Select>
                            </FormControl>
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
    </>;
};

export default MilkProduction;
