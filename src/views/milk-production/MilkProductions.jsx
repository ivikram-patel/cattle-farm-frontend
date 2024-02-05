/* eslint-disable prettier/prettier */
import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router';

const MilkProduction = () => {

    const navigate = useNavigate();

    return (
        <>
            <Button variant="outlined" onClick={() => navigate('/milk-production')} className='text-right'>Add New</Button>
        </>);
}

export default MilkProduction;