/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
import { Box, Button, IconButton, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
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
import EditIcon from '@mui/icons-material/Edit';


const MilkRecords = () => {
    const navigate = useNavigate();
    const [milkRecord, setMilkRecord] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const fetchList = async () => {
        showLoader();
        try {
            const response = await axiosInstance.get(`api/milk-record-list`);

            setMilkRecord(response.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            hideLoader();
        }
    };

    // async function deleteRecord(id) {

    //     let confirmDelete = window.confirm("Are you sure want to delete this?");

    //     if (confirmDelete) {

    //         try {
    //             const response = await axiosInstance.delete(`api/delete-milk-detail/${id}`);
    //             toast.success(response.message);

    //             fetchList();

    //         } catch (error) {
    //             toast.error(error.message)
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
                    onClick={() => navigate('/milk-record')}
                >
                    Add New
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table aria-label="simple table" className="list-table">
                    <TableHead>
                        <TableRow className="eft-table-cell">
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Morning</StyledTableCell>
                            <StyledTableCell>Evening</StyledTableCell>
                            <StyledTableCell>Quantity</StyledTableCell>
                            <StyledTableCell>Total Amount</StyledTableCell>
                            <StyledTableCell>Note</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {milkRecord?.map((row, index) => {
                            return (
                                <StyledTableRow className="eft-table-cell" key={index.toString()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '5px' }}>
                                        {index + 1}
                                    </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '50px' }}>
                                        {row.am_total}
                                    </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '50px' }}>
                                        {row.pm_total}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '50px' }}>
                                        {row.total_milk}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '50px' }}>
                                        {numberFormat(row.total_amount_per_day)}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '160px' }}>
                                        {row.note}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '80px' }}>
                                        {row.milking_date}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        <IconButton className='padding0px' onClick={() => navigate(`/milk-record/${row.id}`)}><EditIcon /></IconButton>
                                    </StyledTableCellData>
                                </StyledTableRow>
                            );
                        })}

                        {milkRecord.length === 0 && (
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

export default MilkRecords;