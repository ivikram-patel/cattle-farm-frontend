/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useNavigate, useParams} from 'react-router';
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

const Cattle = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [formData, setFormData] = useState([]);

    const validation = Yup.object().shape({
        tag_no: Yup.string().required(),
        cattle_obtain_from: Yup.string().required(),
        cattle_obtain_from_other: Yup.string().when('cattle_obtain_from', {
            is: '3',
            then: Yup.string().required('Please provide details for Other'),
            otherwise: Yup.string()  // You can add additional validation for other cases if needed
        }),
        // gender: Yup.string().nullable().required('Please select a gender')
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const fetchCattleDetails = async () => {
        showLoader();
        
        try {
          const response = await axiosInstance.get(`api/cattle-details/${id}`);
    
          setCattleDetails(response.data);
        } catch (error) {
          toast.error(error.message);
        } finally {
          hideLoader();
        }
      };

      
    const submitForm = async (data) => {
        console.log(data);
        console.table([data])

        let endPoint = `api/submit-cattle-details`;


        showLoader();

        try {
            const response = await axiosInstance.post(endPoint, data);

            if (response.status === 200) {
                toast.success(response.message);
                navigate('/cattle-details');
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
      if(id){
        fetchCattleDetails()
      }
    }, [id])
    
    return (
        <>
            <Item>
                <form onSubmit={handleSubmit(submitForm)}>
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
                                    variant="outlined"
                                    fullWidth
                                    size='small'
                                    {...register('breed')}
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
                                    size='small'
                                    {...register('tag_no')}
                                    error={!!errors.tag_no}
                                />
                            </Grid>


                            {/* ---------- GENDER ----------- */}

                            {/* <Grid item xs={2} className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
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
                                        value={formData.gender}
                                        onChange={handleChange}
                                        {...register('gender')}

                                    >
                                        <FormControlLabel value={1} control={<Radio />} label="Male" />
                                        <FormControlLabel value={2} control={<Radio />} label="Female" />
                                    </RadioGroup>
                                </FormControl>
                                {errors.gender && <p style={{ color: 'red' }}>{errors.gender.message}</p>}
                            </Grid> */}

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

                                        MenuProps={{
                                            disableScrollLock: true,
                                            PaperProps: { sx: { maxHeight: 200 } }
                                        }}

                                        inputProps={{
                                            ...register('cattle_obtain_from', {
                                                require: true,
                                                onChange: handleChange,
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
                                            size='small'
                                            {...register('cattle_obtain_from_other')}
                                            error={!!errors.cattle_obtain_from_other}
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
                                    multiline
                                    rows={6}
                                    size='small'
                                    {...register('note')}
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

export default Cattle;
