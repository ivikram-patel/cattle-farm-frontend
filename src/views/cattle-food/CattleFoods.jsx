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
import { FOOD_DETAILS, MONTHS_LIST } from 'store/constant';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const CattleFoods = () => {

    const navigate = useNavigate();
    const [foodDetails, setFoodDetails] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const fetchList = async () => {
        showLoader();
        try {
            const response = await axiosInstance.get(`api/food-details-list`);

            setFoodDetails(response.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            hideLoader();
        }
    };

    async function deleteFoodDetails(id) {

        let confirmDelete = window.confirm("Are you sure want to delete this?");

        if (confirmDelete) {

            try {
                const response = await axiosInstance.delete(`api/delete-food-detail/${id}`);
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
                    onClick={() => navigate('/cattle-food')}
                >
                    Add New
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table aria-label="simple table" className="list-table">
                    <TableHead>
                        <TableRow className="eft-table-cell">
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Food</StyledTableCell>
                            <StyledTableCell>Food Name</StyledTableCell>
                            <StyledTableCell>
                                {/* <div> */}
                                Quantity
                                {/* </div> */}
                            </StyledTableCell>
                            <StyledTableCell>Rate</StyledTableCell>
                            <StyledTableCell>Total Amount</StyledTableCell>
                            <StyledTableCell>Vendor</StyledTableCell>
                            <StyledTableCell>Month</StyledTableCell>
                            <StyledTableCell>Year</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {foodDetails?.map((row, index) => {

                            const foodItem = FOOD_DETAILS.find(item => item.value === row.food_type);
                            const foodType = foodItem ? foodItem.label : '-';
                            const foodQuantityLabel = row.food_in_weight > 0 ? `${row.food_in_weight} Kg` : `${row.food_in_nos} Nos`;

                            return (
                                <StyledTableRow className="eft-table-cell" key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '5px' }}>
                                        {index + 1}
                                    </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '200px' }}>
                                        {foodType}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '150px' }}>
                                        {row.food_name}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '80px' }}>
                                        {foodQuantityLabel}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '30px' }}>
                                        {row.rate}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '30px' }}>
                                        {row.total_amount}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '100px' }}>
                                        {row.vendor_name}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '50px' }}>
                                        {MONTHS_LIST[row.month]}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '30px' }}>
                                        {row.year}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '80px' }}>
                                        <IconButton onClick={() => deleteFoodDetails(row.id)} ><DeleteForeverIcon /></IconButton>
                                        <IconButton onClick={() => navigate(`/cattle-food/${row.id}`)}><EditIcon /></IconButton>
                                    </StyledTableCellData>
                                </StyledTableRow>
                            );
                        })}

                        {foodDetails.length === 0 && (
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

export default CattleFoods;