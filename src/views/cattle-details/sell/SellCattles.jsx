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
import { numberFormat } from 'hooks/useNumberFormat';

const SellCattles = () => {

    const navigate = useNavigate();
    const [cattleDetails, setCattleDetails] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const fetchList = async () => {

        showLoader();

        try {

            const response = await axiosInstance.get(`api/sell-cattle-details`);
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
                await axiosInstance.delete(`api/delete-sell-cattle/${id}`);
                toast.success('Details Delete Successfully.');
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
                <Button startIcon={<AddIcon />} variant="contained" color="primary" className="blue-button" onClick={() => navigate('/sell-cattle')}>
                    Sell
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table aria-label="simple table" className="list-table">
                    <TableHead>
                        <TableRow className="eft-table-cell">
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Tag No</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                            <StyledTableCell>Note</StyledTableCell>
                            <StyledTableCell>Time</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {cattleDetails?.map((row, index) => {

                            return (
                                <StyledTableRow className="eft-table-cell" key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '5px' }}>
                                        {index + 1}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '100px' }}>
                                        {row.cattle_tag_no}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '100px' }}>
                                        {numberFormat(row.cattle_price)}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '200px' }}>
                                        {row.note}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '100px' }}>
                                        {row.selling_time}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        <IconButton onClick={() => deleteCattle(row.id)} ><DeleteForeverIcon /></IconButton>
                                        <IconButton onClick={() => navigate(`/sell-cattle/${row.id}`)}><EditIcon /></IconButton>
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

export default SellCattles;