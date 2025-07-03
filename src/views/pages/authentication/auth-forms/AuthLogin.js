import { useState } from 'react';
// import { useSelector } from 'react-redux';

// material-ui
// import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    // Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
// import { Formik } from 'formik';

// project imports
// import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosInstance from 'custom-axios';
import { ToastContainer, toast } from 'react-toastify';
import { useFullPageLoader } from 'hooks/useFullPageLoader';
import 'react-toastify/dist/ReactToastify.css';

const FirebaseLogin = () => {
    // const theme = useTheme();
    // const scriptedRef = useScriptRef();
    const [checked, setChecked] = useState(true);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const schema = Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required(),
        password: Yup.string().max(255).required()
    });

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            showLoader()
            let endPoint = `api/user-login`;
            const apiResponse = await axiosInstance.post(endPoint, data);
            console.log(apiResponse)

            if (apiResponse.status === 'success') {
                localStorage.setItem('adminLogin', 1)
                toast.success(apiResponse.message);
                navigate('/milk-productions');
            } else {
                toast.error(apiResponse.message)
            }

        } catch (err) {
            console.error(err);
            setError('submit', { type: 'manual', message: err.message });

        } finally {
            hideLoader()
        }
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();




    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign in with Email address</Typography>
                    </Box>

                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <FormControl fullWidth error={!!errors.email} sx={{ mb: 2 }}>
                            <InputLabel htmlFor="email">Email Address / Username</InputLabel>
                            <OutlinedInput
                                id="email"
                                type="email"
                                label="Email Address / Username"
                                {...register('email')}
                            />
                            {/* {errors.email && (
                                <FormHelperText error>{errors.email.message}</FormHelperText>
                            )} */}
                        </FormControl>

                        <FormControl fullWidth error={!!errors.password} sx={{ mb: 2 }}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                {...register('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {/* {errors.password && (
                                <FormHelperText error>{errors.password.message}</FormHelperText>
                            )} */}
                        </FormControl>

                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(e) => setChecked(e.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            {/* Optional: Forgot password */}
                        </Stack>

                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit.message}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Sign in
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                </Grid>
            </Grid>

            {loader}
            <ToastContainer />

        </>
    );
};

export default FirebaseLogin;