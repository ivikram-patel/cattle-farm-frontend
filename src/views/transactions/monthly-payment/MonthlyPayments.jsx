/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
import { Box, Button, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axiosInstance from 'custom-axios';
import { useFullPageLoader } from 'hooks/useFullPageLoader';
import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import { numberFormat } from 'hooks/useNumberFormat';
import { KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';
import { PAYMENT_OPTION } from 'store/constant';
import EditIcon from '@mui/icons-material/Edit';


const MonthlyPayments = () => {
    const navigate = useNavigate();
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const fetchList = async () => {
        showLoader();
        try {
            const response = await axiosInstance.get(`api/monthly-payment-list`);

            setPaymentDetails(response.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            hideLoader();
        }
    };

    // async function deleteCategory(id) {

    //     let confirmDelete = window.confirm("Are you sure want to delete this?");

    //     if (confirmDelete) {

    //         try {
    //             const response = await axiosInstance.delete(`api/delete-asset-category/${id}`);
    //             toast.success(response.message);

    //             fetchAssetCategories();

    //         } catch (error) {
    //             toast.error(error.message)
    //         } finally {
    //         }
    //     }
    // }

    useEffect(() => {
        fetchList();
    }, []);

    const Row = ({ row }) => {
        const [open, setOpen] = useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell>{numberFormat(row.rate)}</TableCell>
                    <TableCell style={{ color: `${row.cumulative_due_amount > 0 ? 'red' : 'green'}` }}>{numberFormat(row.cumulative_due_amount)}</TableCell>
                </TableRow>

                {/* --------------HISTORY TABLE ----------------- */}
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h4" gutterBottom component="div">
                                    History
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Month</TableCell>
                                            <TableCell>Payment Option</TableCell>
                                            <TableCell align="right">Milk Rate</TableCell>
                                            <TableCell align="right">Milk Quantity</TableCell>
                                            <TableCell align="right">Due Amount</TableCell>
                                            <TableCell align="right">Half Payment</TableCell>
                                            <TableCell align="right">Full Payment</TableCell>
                                            <TableCell align="right">Total Amount</TableCell>
                                            <TableCell align="right">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.history.map((historyRow) => {
                                            const paymentOption = PAYMENT_OPTION.find(item => item.value === historyRow.payment_option);
                                            return (
                                                <TableRow key={historyRow.payment_date}>
                                                    <TableCell component="th" scope="row">
                                                        {historyRow.payment_date}
                                                    </TableCell>
                                                    <TableCell>{historyRow.payment_formatted_date}</TableCell>
                                                    <TableCell>{paymentOption.label}</TableCell>
                                                    <TableCell align="right">{historyRow.milk_rate}</TableCell>
                                                    <TableCell align="right">{historyRow.milk_quantity}</TableCell>
                                                    <TableCell style={{ color: `${historyRow.due_amount > 0 ? 'red' : ''}` }} align="right">{numberFormat(historyRow.due_amount)}</TableCell>
                                                    <TableCell align="right" >{numberFormat(historyRow.half_payment)}</TableCell>
                                                    <TableCell align="right">{numberFormat(historyRow.full_payment)}</TableCell>
                                                    <TableCell align="right">{numberFormat(historyRow.total_amount)}</TableCell>
                                                    <TableCell align='right'>
                                                        {historyRow.payment_option == 2 ?
                                                            <IconButton onClick={() => navigate(`/monthly-half-payment/${historyRow.id}/${row.customer_id}`)}>
                                                                <EditIcon className='font18px' />
                                                            </IconButton>
                                                            : ''}
                                                    </TableCell>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment >
        );
    };

    return (
        <>
            <Box className="margin20px text-right">
                <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    color="primary"
                    className="blue-button"
                    onClick={() => navigate('/monthly-payment')}
                >
                    Add New
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={100} />
                            <TableCell width={300}>Name</TableCell>
                            <TableCell width={500}>Current Rate</TableCell>
                            <TableCell width={500}>Total Due Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paymentDetails.map((row, index) => (
                            <Row key={index} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {loader}
            <ToastContainer />
        </>
    );
};
export default MonthlyPayments;