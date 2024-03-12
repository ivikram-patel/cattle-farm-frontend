/* eslint-disable prettier/prettier */
import { Box, Button, IconButton, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import axiosInstance from 'custom-axios';
import { useFullPageLoader } from 'hooks/useFullPageLoader';
import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import { StyledTableCell, StyledTableCellData, StyledTableRow } from 'styles/commonFunction';

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { numberFormat } from 'hooks/useNumberFormat';

const IncomeList = () => {
    const navigate = useNavigate();
    const [incomeList, setIncomeList] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const fetchList = async () => {
        showLoader();
        try {
            const response = await axiosInstance.get(`api/income-list-details`);

            setIncomeList(response.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            hideLoader();
        }
    };

    async function deleteIncome(id) {
        let confirmDelete = window.confirm('Are you sure want to delete this?');

        if (confirmDelete) {
            try {
                const response = await axiosInstance.delete(`api/delete-income/${id}`);
                toast.success(response.message);

                fetchList();
            } catch (error) {
                toast.error(error.message);
            } finally {
                hideLoader();
            }
        }
    }


    useEffect(() => {
        fetchList();
    }, []);

    return (
        <>
            <Box className="margin20px text-right">
                <Button startIcon={<AddIcon />} variant="contained" color="primary" className="blue-button" onClick={() => navigate('/income')}>
                    Add New
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table aria-label="simple table" className="list-table">
                    <TableHead>
                        <TableRow className="eft-table-cell">
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Description</StyledTableCell>
                            <StyledTableCell>Amount</StyledTableCell>
                            <StyledTableCell>Time</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {incomeList?.map((row, index) => {

                            return (
                                <StyledTableRow className="eft-table-cell" key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '5px' }}>
                                        {index + 1}
                                    </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '100px' }}>
                                        {row.name}
                                    </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '200px' }}>
                                        {row.description}
                                    </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        {numberFormat(row.amount)}
                                    </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        {row.date_time}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        <IconButton onClick={() => deleteIncome(row.id)}>
                                            <DeleteForeverIcon />
                                        </IconButton>
                                        <IconButton onClick={() => navigate(`/income/${row.id}`)}>
                                            <EditIcon />
                                        </IconButton>
                                    </StyledTableCellData>
                                </StyledTableRow>
                            );
                        })}

                        {/* {rateList.length === 0 && (
                            <tr>
                                <td colSpan="6" align="center" style={{ padding: '5px' }}>
                                    No record found
                                </td>
                            </tr>
                        )} */}
                    </TableBody>
                </Table>
            </TableContainer>
            {loader}
            <ToastContainer autoClose={2000} />
        </>
    );
};
export default IncomeList;