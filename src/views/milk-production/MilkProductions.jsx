/* eslint-disable prettier/prettier */
import { Button, Stack } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router';

const MilkProduction = () => {

    const navigate = useNavigate();

    return (
        <>
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={() => navigate('/milk-production')} className='text-right'>Single Payment</Button>
            </Stack>
        </>);
}

export default MilkProduction;