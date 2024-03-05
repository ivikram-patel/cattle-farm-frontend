/* eslint-disable prettier/prettier */
import { Button, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

const Transactions = () => {
    const navigate = useNavigate();

    return (
        <>
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={() => navigate('/milk-transaction')} className="text-right">
                    Single Payment
                </Button>
                <Button variant="outlined" onClick={() => navigate('/milk-transaction')} className="text-right">
                    Monthly Payment
                </Button>
            </Stack>
        </>
    );
};

export default Transactions;
