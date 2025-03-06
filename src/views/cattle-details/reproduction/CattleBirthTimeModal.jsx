/* eslint-disable prettier/prettier */
import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { BootstrapDialog } from 'styles/commonFunction';
import { FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import axiosInstance from 'custom-axios';
import 'dayjs/locale/en'; // Import the desired locale

import { useState } from 'react';
import { toast } from 'react-toastify';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useEffect } from 'react';
dayjs.extend(utc);
dayjs.extend(timezone);
// Set the desired time zone (IST in this case)
dayjs.tz.setDefault('Asia/Kolkata');


const CattleBirthTimeModal = (props) => {
    const [formData, setFormData] = useState({
        id: props.cattleId,
        cattle_tag: '',
        cattle_birth_time: dayjs(),
        note: '',
    });

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`api/cattle-birth-detail/${props.cattleId}`);

            setFormData({
                ...formData,
                cattle_tag: response.data.tag_no,
                cattle_birth_time: response.data.time,
                note: response.data.note
            })

        } catch (error) {
            toast.error(error.message);
        } finally {
            // hideLoader();
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitForm = async () => {

        if (formData.cattle_tag == '') {
            toast.error('Please Select Tag')
            return;
        }

        let endPoint = `api/submit-cattle-birth`;

        try {
            const response = await axiosInstance.post(endPoint, formData);

            if (response.status === 200) {
                toast.success(response.message);

                props.handleClose()
                props.fetchApi()

            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            // hideLoader();
        }
    };


    useEffect(() => {
        if (props.cattleId) {
            fetchData()
        }
    }, [])
    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={props.handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.open}
                fullWidth
            >
                <DialogTitle sx={{ m: 0, p: 2 }} variant='h4' id="customized-dialog-title">
                    {props.cattleId == 0 ? 'Add' : 'Edit'} Details
                </DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={props.handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent dividers>

                    <Grid container spacing={2}>

                        <Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
                            <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                Tag
                            </Typography>
                        </Grid>

                        <Grid item xs={10} className='text-start'>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-select-small-tag">Tag</InputLabel>
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
                                >

                                    {props.cattleTagNo.map((row, index) => {
                                        return (
                                            <MenuItem key={index} value={row.tag_no}>{row.tag_no}</MenuItem>
                                        )
                                    })}

                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
                            <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                સમય
                            </Typography>
                        </Grid>

                        <Grid item xs={5} className='text-start'>
                            <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        disableFuture
                                        label="Time"
                                        value={dayjs.utc(formData.cattle_birth_time)}
                                        // minDate={new Date('01-01-2014')}
                                        format="DD-MM-YYYY"
                                        defaultValue={dayjs()}
                                        onChange={(newValue) => {
                                            setFormData({ ...formData, cattle_birth_time: newValue.tz('Asia/Kolkata').toDate() })
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                size='small'
                                                variant='standard'
                                            />
                                        )}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={5}></Grid>

                        <Grid item xs={2} className='d-flex' style={{ alignItems: 'center' }}>
                            <Typography variant='subtitle1' className='text-capitalize' style={{ fontSize: 14 }}>
                                Notes
                            </Typography>
                        </Grid>

                        <Grid item xs={10} className='text-start'>
                            <TextField
                                label="Note"
                                variant="outlined"
                                fullWidth
                                multiline
                                name='note'
                                value={formData.note}
                                size='small'
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={submitForm}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
export default CattleBirthTimeModal;