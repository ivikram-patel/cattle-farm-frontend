/* eslint-disable prettier/prettier */
import { Box, Button, IconButton, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import axiosInstance from 'custom-axios';
import { useFullPageLoader } from 'hooks/useFullPageLoader';
import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/Add';
// import { useNavigate } from 'react-router';
import { StyledTableCell, StyledTableCellData, StyledTableRow } from 'styles/commonFunction';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CattlePregnancyTimeModal from './CattlePregnancyTimeModal';


const CattlePregnancyTime = () => {
    // const navigate = useNavigate();
    const [cattleDetails, setCattleDetails] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [openModal, setOpenModal] = React.useState(false);
    const [cattleId, setCattleId] = useState(0)
    const [cattleTagNo, setCattleTagNo] = useState([]);

    const handleClickOpen = () => {
        setOpenModal(true);
        setCattleId(0) // every time open a new then id is zero
    };
    const handleClose = () => {
        setOpenModal(false);
    };

    const editModal = async (id) => {
        setCattleId(id)
        setOpenModal(true);
    };

    const fetchList = async () => {

        showLoader();

        try {

            const response = await axiosInstance.get(`api/cattle-pregnancy-list`);
            setCattleDetails(response.data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            hideLoader();
        }
    };

    const fetchCattleTag = async () => {
        // showLoader();
        try {
            const apiResponse = await axiosInstance.get(`api/cattle-tag-details`);

            setCattleTagNo(apiResponse.data)

        } catch (error) {
            console.log(error);
        } finally {
            // hideLoader();
        }
    }


    async function deleteCattle(id) {

        let confirmDelete = window.confirm("Are you sure want to delete this?");

        if (confirmDelete) {

            try {
                const response = await axiosInstance.delete(`api/delete-cattle-pregnancy-detail/${id}`);

                toast.success(response.message);

                fetchList();

            } catch (error) {
                toast.error(error.message)
            } finally {
                hideLoader()
            }
        }
    }

    const AddCattleBirthTimeModal = () => {
        return (
            <>
                <CattlePregnancyTimeModal
                    handleClose={handleClose}
                    open={openModal}
                    closeModal={setOpenModal}
                    fetchApi={fetchList}
                    cattleId={cattleId}
                    cattleTagNo={cattleTagNo}
                />
            </>
        );
    };

    useEffect(() => {
        fetchList();
        fetchCattleTag()
    }, []);

    return (
        <>
            <Box className="margin20px text-right">
                <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    color="primary"
                    className="blue-button"
                    onClick={handleClickOpen}
                >
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
                                        {row.tag_no}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '300px' }}>
                                        {row.note}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        {row.time}
                                    </StyledTableCellData>

                                    <StyledTableCellData component="td" scope="row" style={{ width: '10px' }}>
                                        <IconButton className='p-0' onClick={() => deleteCattle(row.id)} ><DeleteForeverIcon /></IconButton>
                                        <IconButton style={{ padding:'0 10px'}} onClick={() => editModal(row.id)}><EditIcon /></IconButton>
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
            {loader}
            <ToastContainer autoClose={2000} />
            <AddCattleBirthTimeModal />
        </>
    )
}

export default CattlePregnancyTime;