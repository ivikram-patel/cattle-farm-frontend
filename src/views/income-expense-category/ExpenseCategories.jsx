/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
import { Box, Button, IconButton, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import axiosInstance from 'custom-axios';
import { useFullPageLoader } from 'hooks/useFullPageLoader';
import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import { StyledTableCell, StyledTableCellData, StyledTableRow } from 'styles/commonFunction';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ExpenseCategories = () => {
    const navigate = useNavigate();
    const [expenseCategoryList, setExpenseCategoryList] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const fetchList = async () => {
        showLoader();
        try {
            const response = await axiosInstance.get(`api/expenses-categories-details`);

            setExpenseCategoryList(response.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            hideLoader();
        }
    };

    // async function deleteExpenseCategory(id) {

    //     let confirmDelete = window.confirm("Are you sure want to delete this?");

    //     if (confirmDelete) {

    //         try {
    //             const response = await axiosInstance.delete(`api/delete-expense-category/${id}`);
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
                    onClick={() => navigate('/add-expense')}
                >
                    Add Expense
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table aria-label="simple table" className="list-table">
                    <TableHead>
                        <TableRow className="eft-table-cell">
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {expenseCategoryList?.map((row, index) => {
                            return (
                                <StyledTableRow className="eft-table-cell" key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '5px' }}>
                                        {index + 1}
                                    </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '400px' }}>
                                        {row.name}
                                    </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        {row.created_at}
                                    </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" align='center' style={{ width: '5px' }}>
                                        {/* <IconButton onClick={() => deleteExpenseCategory(row.id)} ><DeleteForeverIcon /></IconButton> */}
                                        <IconButton style={{ padding: '0px' }} onClick={() => navigate(`/add-expense/${row.id}`)}><EditIcon /></IconButton>
                                    </StyledTableCellData>
                                </StyledTableRow>
                            );
                        })}

                        {expenseCategoryList.length === 0 && (
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

export default ExpenseCategories;