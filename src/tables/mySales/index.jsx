import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// material-ui
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  Typography,
  MenuItem,
  InputLabel,
} from '@mui/material';

import React from 'react';
import { IconButton } from '@mui/material/index';
import { TablePagination } from '@mui/material/index';
import { Products } from './prodData';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom/dist/index';
import TableSearch from '../../components/common/TableSearch';
import ChipLabel from '../../components/ChipLabel';
import TablePaginationActions from '../../components/common/TablePagination';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { getMySales } from '../../api/users';
import { remoteUrl } from '../../api';
import NoData from '../../components/common/Nodata';
import { getFormatDate } from '../../utils/date';
import { setOrderStatus } from '../../api/orders';

function createData(trackingNo, username, fat, carbs, protein) {
  return { trackingNo, username, fat, carbs, protein };
}

// const rows = users.map((el) => createData(84564564, el.username, el.email, 'Seller', 40570));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getChipColor(type) {
  if (type === 'pending') return 'error';
  else return 'success';
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'cover',
    align: 'left',
    disablePadding: false,
    label: 'Image',
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'id',
    align: 'center',
    disablePadding: false,
    label: 'Order ID',
  },
  {
    id: 'createdAt',
    align: 'center',
    disablePadding: true,
    label: 'Created At',
  },
  {
    id: 'Quantity',
    align: 'center',
    disablePadding: true,
    label: 'Quantity',
  },
  {
    id: 'inventoryType',
    align: 'center',
    disablePadding: false,
    label: 'Order Status',
  },
  {
    id: 'price',
    align: 'center',
    disablePadding: true,
    label: 'Price',
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function ProdTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 600 }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

ProdTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
};

// ==============================|| USER TABLE ||============================== //

export default function MySalesTable({ sales, loading, setSalesInfo }) {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(10);

  const navigate = useNavigate();

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChange = (e) => setFilter(e.target.value.toLowerCase());

  const handleOrderStatusChange = async (orderId, newStatus) => {
    const newOrderStatus = newStatus.toLowerCase();
    const productId = orderId;
    try {
      const response = await setOrderStatus(productId, newOrderStatus);

      //  console.log('Order status updated:', response);
      const updatedSales = sales.map((sale) => {
        if (sale.id === orderId) {
          return { ...sale, order_status: newOrderStatus };
        }
        return sale;
      });
      setSalesInfo({ loading: false, sales: updatedSales });
      toast.success(`Status Changed To ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'space-between',
          paddingBlock: '20px',
        }}
      >
        <TableSearch handleChange={handleChange} />
      </Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },
        }}
      >
        <Table aria-labelledby='tableTitle'>
          <ProdTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {loading ? (
              Array(6)
                .fill()
                .map((_, idx) => (
                  <TableRow key={idx}>
                    {Array(6)
                      .fill()
                      .map((_, idx) => (
                        <TableCell key={idx * 2}>
                          <Skeleton />
                        </TableCell>
                      ))}
                  </TableRow>
                ))
            ) : sales?.length > 0 ? (
              (filter !== ''
                ? sales.filter(
                    (el) =>
                      el.product?.label?.toLowerCase().indexOf(filter) !== -1
                  )
                : sales
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  console.log({row})
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        align='left'
                      >
                        <Avatar
                          src={`${remoteUrl}${row?.product?.pictures[0]}`}
                          sx={{ width: '40px', height: '40px' }}
                          variant='rounded'
                        />
                      </TableCell>

                      <TableCell align='left'>
                        {' '}
                        {row.product.label.length > 30
                          ? row.product.label.slice(0, 30) + '...'
                          : row.product.label}
                      </TableCell>
                      <TableCell align='center'>{row?.id}</TableCell>
                      <TableCell align='center'>
                        {getFormatDate(row.createdAt)}
                      </TableCell>
                      <TableCell align='left'>{row.quantity}</TableCell>
                      <TableCell align='center'>
                        
                        {row.order_status == 'delivered' || row.order_status == 'completed' ? (
                          <ChipLabel color={getChipColor(row.inventoryType)}>
                            {row.order_status}
                          </ChipLabel>
                        ) : (
                          <>
                            <Select
                              value={row.order_status}
                              onChange={(e) =>
                                handleOrderStatusChange(row.id, e.target.value)
                              }
                              displayEmpty={true}
                            >
                              <MenuItem
                                value='pending'
                                disabled
                                style={{ display: 'none' }}
                              >
                                Pending
                              </MenuItem>
                              <MenuItem value='dispatched'>Dispatched</MenuItem>
                              <MenuItem value='delivered'>Delivered</MenuItem>
                            </Select>
                          </>
                        )}
                      </TableCell>
                      <TableCell align='right'>${row.final_price}</TableCell>
                      <TableCell align='right'>
                        <IconButton
                          sx={{ borderRadius: '50%' }}
                          color='primary'
                          onClick={() => navigate(`${row.id}`)}
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <TableRow>
                <TableCell align='center' colSpan={6}>
                  <NoData />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          labelDisplayedRows={({ from, to, count, page }) => {
            return (
              <Typography variant='subtitle2' component='span'>
                Page {page + 1} of{' '}
                {Math.ceil(
                  sales?.filter(
                    (el) =>
                      el.product?.label?.toLowerCase().indexOf(filter) !== -1
                  )?.length / rowsPerPage
                ) || 1}
              </Typography>
            );
          }}
          count={sales?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          labelRowsPerPage={''}
          rowsPerPageOptions={-1}
          ActionsComponent={TablePaginationActions}
          SelectProps={{
            inputProps: {
              'aria-label': 'rows per page',
            },
            native: false,
          }}
        />
      </TableContainer>
    </Box>
  );
}
