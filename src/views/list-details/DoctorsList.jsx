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

const DoctorsList = () => {

    const navigate = useNavigate();
    const [doctorList, setDoctorList] = useState()
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    let type = 2; // for Dr list from table

    const fetchList = async () => {
        showLoader();
        try {
            const response = await axiosInstance.get(`api/list-details/${type}`);

            setDoctorList(response)

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
                    onClick={() => navigate('/add-details')}
                >
                    Add New
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table aria-label="simple table" className="list-table">
                    <TableHead>
                        <TableRow className="eft-table-cell">
                            <StyledTableCell style={{ width: '40px' }}>No</StyledTableCell>
                            <StyledTableCell>Full Name</StyledTableCell>
                            <StyledTableCell>Balance</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {doctorList?.data?.map((row, index) => {
                            return (
                                <StyledTableRow
                                    className="eft-table-cell"
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCellData component="td" scope="row" style={{ width: '60px' }}> {index + 1} </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '300px' }}> {row.first_name} {row.middle_name} {row.surname}  </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '102px' }}> {row.first_name} </StyledTableCellData>
                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        <IconButton onClick={() => deleteCategory(row.id)} ><DeleteForeverIcon /></IconButton>
                                        <IconButton onClick={() => navigate(`/admin/asset-category/${row.id}`)}><EditIcon /></IconButton>
                                    </StyledTableCellData>
                                </StyledTableRow>
                            )
                        })
                        }
                    </TableBody>
                </Table>
            </TableContainer >
            {/* ÷ */}
            {loader}
            <ToastContainer autoClose={2000} />
        </>
    )
}

export default DoctorsList