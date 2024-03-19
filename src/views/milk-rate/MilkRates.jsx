/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
import { Box, Button, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import axiosInstance from 'custom-axios';
import { useFullPageLoader } from 'hooks/useFullPageLoader';
import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import { StyledTableCell, StyledTableCellData, StyledTableRow } from 'styles/commonFunction';
import { MONTHS_LIST } from 'store/constant';


const MilkRates = () => {
    const navigate = useNavigate();
    const [rateList, setRateList] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const fetchList = async () => {
        showLoader();
        try {
            const response = await axiosInstance.get(`api/milk-rates`);

            setRateList(response.data);
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
                    onClick={() => navigate('/milk-rate')}
                >
                    Add New
                </Button>
            </Box>

            <p className='red-color'> *** દરેક નવા મહિનાની શરૂઆતમાં દર બદલો, જેમ કે જાન્યુઆરી 1, 2024 અથવા ફેબ્રુઆરી 1, 2024.</p>

            <TableContainer component={Paper}>
                <Table aria-label="simple table" className="list-table">
                    <TableHead>
                        <TableRow className="eft-table-cell">
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Rate</StyledTableCell>
                            <StyledTableCell>Month</StyledTableCell>
                            <StyledTableCell>Year</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rateList?.map((row, index) => {
                            return (
                                <StyledTableRow className="eft-table-cell" key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '5px' }}>
                                        {index + 1}
                                    </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '300px' }}>
                                        {row.rate}
                                    </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        {MONTHS_LIST[row.month]}
                                    </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        {row.year}
                                    </StyledTableCellData>
                                </StyledTableRow>
                            );
                        })}

                        {rateList.length === 0 && (
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
export default MilkRates;
