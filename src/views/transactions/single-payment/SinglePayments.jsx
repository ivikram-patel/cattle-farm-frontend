/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
import { Box, Button, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axiosInstance from 'custom-axios';
import { useFullPageLoader } from 'hooks/useFullPageLoader';
import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import { StyledTableCell, StyledTableCellData, StyledTableRow } from 'styles/commonFunction';
import { numberFormat } from 'hooks/useNumberFormat';

const SinglePayments = () => {
    const navigate = useNavigate();
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const fetchList = async () => {
        showLoader();
        try {
            const response = await axiosInstance.get(`api/single-payment-list`);

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

    return (
        <>
            <Box className="margin20px text-right">
                <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    color="primary"
                    className="blue-button"
                    onClick={() => navigate('/single-payment')}
                >
                    Add New
                </Button>
            </Box>

            <Grid item xs={2} className='d-flex' >
                <Typography variant='subtitle2' className='text-capitalize' style={{ fontSize: 14 }}>
                    Name in green are old #customer
                </Typography>
            </Grid>

            <TableContainer component={Paper}>
                <Table aria-label="simple table" className="list-table">
                    <TableHead>
                        <TableRow className="eft-table-cell">
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Quantity (in liter)</StyledTableCell>
                            <StyledTableCell>Rate</StyledTableCell>
                            <StyledTableCell>Full Payment</StyledTableCell>
                            <StyledTableCell>Half Payment</StyledTableCell>
                            <StyledTableCell>Due Amount</StyledTableCell>
                            <StyledTableCell>Total Amount</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paymentDetails?.map((row, index) => {
                            return (
                                <StyledTableRow className="eft-table-cell" key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '5px' }}>
                                        {index + 1}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '100px', color: `${row.is_existing_client == 1 ? 'green' : 'brown'}` }}>
                                        {row.name}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        {row.milk_quantity}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        {numberFormat(row.milk_rate)}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        {numberFormat(row.full_payment)}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        {numberFormat(row.half_payment)}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px', color: `${row.due_amount > 0 ? 'red' : ''}` }}>
                                        {numberFormat(row.due_amount)}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        {numberFormat(row.total_amount)}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        {row.payment_date}
                                    </StyledTableCellData>
                                </StyledTableRow>
                            );
                        })}

                        {paymentDetails.length === 0 && (
                            <tr>
                                <td colSpan="6" align="center" style={{ padding: '5px' }}>
                                    No record found
                                </td>
                            </tr>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {loader}
            <ToastContainer autoClose={2000} />
        </>
    );
};
export default SinglePayments;