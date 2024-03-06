
/* eslint-disable prettier/prettier */
import { Box, Button, IconButton, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import axiosInstance from 'custom-axios';
import { useFullPageLoader } from 'hooks/useFullPageLoader';
import React from 'react'
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import { StyledTableCell, StyledTableCellData, StyledTableRow } from 'styles/commonFunction';

const Customers = () => {

    const navigate = useNavigate();
    const [customerList, setCustomerList] = useState([])
    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const fetchList = async () => {
        showLoader();
        try {
            const response = await axiosInstance.get(`api/customer-details`);

            setCustomerList(response.data)

        } catch (error) {
            toast.error(error.message);
        } finally {
            hideLoader();
        }
    };


    async function deleteCustomer(id) {

        let confirmDelete = window.confirm("Are you sure want to delete this?");

        if (confirmDelete) {

            try {
                const response = await axiosInstance.delete(`api/delete-customer-detail/${id}`);
                toast.success(response.message);

                fetchList();

            } catch (error) {
                toast.error(error.message)

            } finally {
                hideLoader()
            }
        }
    }

    useEffect(() => {
        fetchList()
    }, [])


    return (
        <>
            <Box className='margin20px text-right'>
                <Button
                    startIcon={<AddIcon />}
                    variant='contained'
                    color="primary"
                    className='blue-button'
                    onClick={() => navigate('/customer')}
                >
                    Add New
                </Button>
            </Box>

            <p className='red-color'> *** ગ્રાહક જે માસિક ધોરણે ચૂકવણી કરે છે</p>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" className="list-table">
                    <TableHead>
                        <TableRow className="eft-table-cell">
                            <StyledTableCell style={{ width: '40px' }}>No</StyledTableCell>
                            <StyledTableCell>Full Name</StyledTableCell>
                            <StyledTableCell>Phone No</StyledTableCell>
                            <StyledTableCell>Quantity</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {customerList?.map((row, index) => {
                            return (
                                <StyledTableRow
                                    className="eft-table-cell"
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCellData component="td" scope="row" style={{ width: '60px' }}> {index + 1} </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '300px' }}> {row.first_name} {row.middle_name} {row.surname}  </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '102px' }}> {row.phone_no ? row.phone_no : '-'} </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '102px' }}> {row.quantity} </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        <IconButton onClick={() => deleteCustomer(row.id)} ><DeleteForeverIcon /></IconButton>
                                        <IconButton onClick={() => navigate(`/customer/${row.id}`)}><EditIcon /></IconButton>
                                    </StyledTableCellData>
                                </StyledTableRow>
                            )
                        })}

                        {customerList.length === 0 && (
                            <tr>
                                <td colSpan="6" align='center' style={{ padding: '5px' }}>No record found</td>
                            </tr>
                        )}
                    </TableBody>
                </Table>
            </TableContainer >
            {/* ÷ */}
            {loader}
            <ToastContainer autoClose={2000} />
        </>
    )
}
export default Customers