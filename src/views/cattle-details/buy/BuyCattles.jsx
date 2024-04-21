/* eslint-disable prettier/prettier */
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CATTLE_OBTAIN_DETAILS } from 'store/constant';
import { numberFormat } from 'hooks/useNumberFormat';

const BuyCattles = () => {

    const navigate = useNavigate();
    const [cattleDetails, setCattleDetails] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const fetchList = async () => {

        showLoader();

        try {

            const response = await axiosInstance.get(`api/buy-cattle-details`);
            setCattleDetails(response.data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            hideLoader();
        }
    };


    async function deleteCattle(id) {

        let confirmDelete = window.confirm("Are you sure want to delete this?");

        if (confirmDelete) {

            try {
                const response = await axiosInstance.delete(`api/delete-buy-cattle/${id}`);
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
                <Button startIcon={<AddIcon />} variant="contained" color="primary" className="blue-button" onClick={() => navigate('/buy-cattle')}>
                    Add New
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table aria-label="simple table" className="list-table">
                    <TableHead>
                        <TableRow className="eft-table-cell">
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Tag No</StyledTableCell>
                            <StyledTableCell>Note</StyledTableCell>
                            <StyledTableCell>Obtain From</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                            <StyledTableCell>Time</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {cattleDetails?.map((row, index) => {

                            const obtainFromLabel = CATTLE_OBTAIN_DETAILS.find(item => item.value === row.cattle_obtain_from)?.label;

                            return (
                                <StyledTableRow className="eft-table-cell" key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '5px' }}>
                                        {index + 1}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '100px' }}>
                                        {row.tag_no}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '300px' }}>
                                        {row.note}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        {obtainFromLabel}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        {numberFormat(row.price)}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        {row.buy_cattle_time}
                                    </StyledTableCellData>


                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        <IconButton onClick={() => deleteCattle(row.id)} ><DeleteForeverIcon /></IconButton>
                                        <IconButton onClick={() => navigate(`/buy-cattle/${row.id}`)}><EditIcon /></IconButton>
                                    </StyledTableCellData>
                                </StyledTableRow>
                            );
                        })}

                        {cattleDetails.length === 0 && (
                            <tr>
                                <td colSpan="6" align="center" style={{ padding: '5px' }}>
                                    No record found
                                </td>
                            </tr>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* ÷ */}
            {loader}
            <ToastContainer autoClose={2000} />
        </>
    );
};

export default BuyCattles;