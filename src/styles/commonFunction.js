import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Dialog, TableRow } from '@mui/material';

export const AccountTypeData = [
  { label: 'All In One', value: 1 },
  { label: 'DAP', value: 6 },
  { label: 'TFSA', value: 7 },
  { label: 'RRSP', value: 8 },
  // { label: 'TFSA', value: 0 },
  { label: 'SpRRSP', value: 9 },
  { label: 'LIRA', value: 10 },
  { label: 'RRIF', value: 11 },
  { label: 'LIF', value: 13 },
  { label: 'LRSP', value: 20 },
  { label: 'Corporate Margin', value: 21 },
  { label: 'Individual Single RESP', value: 22 },
  { label: 'Individual Family RESP', value: 23 },
  { label: 'Joint Single RESP', value: 24 },
  { label: 'Joint Family RESP', value: 25 },
  { label: 'Joint Non-Registered', value: 26 }
];

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12
    // padding: 10
  },
  '&:nth-of-type(odd)': {
    backgroundColor: '#484257',
    color: theme.palette.common.white
    // padding: 10
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#34303e',
    color: theme.palette.common.white
    // padding: 10
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export const StyledTableCellData = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13
  },

  '&:nth-of-type(odd) ': {
    backgroundColor: '#efefef',
    color: '#2a2a2a'
  },
  '&:nth-of-type(even) td': {
    backgroundColor: '#f5f5f5',
    color: '#2a2a2a'
  },
  // hide last border
  '&:last-child td, &:last-child td': {
    border: 0
  }
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:nth-of-type(even) td': {
    backgroundColor: '#f5f5f5',
    color: '#2a2a2a'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));


export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const blockSpecialChar = (e) => {

  const { key } = e;

  const allowedPattern = /^[a-zA-Z0-9\s]+$/;

  if (!allowedPattern.test(key)) {
    e.preventDefault();
    return false;
  }
}


export const StyledTableCellSecond = styled(TableCell)(({ theme }) => ({
  
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white
  },
  '&:nth-of-type(odd)': {
    padding: '3px 8px',
    minHeight: 100
  },
  '&:nth-of-type(even)': {
    padding: '3px 8px',
    minHeight: 100
  },
  [`&.${tableCellClasses.root}`]: {
    padding: '3px 8px',
    minWidth: 80,
    fontSize: 14,
    color: 'black'
  },
  '.css-rpurbm-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': {
    padding: '4px 11px'
  }
}));
