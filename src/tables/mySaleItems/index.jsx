import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

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
  Typography,
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
import { getMyOrders } from '../../api/orders';
import { remoteUrl } from '../../api';
import NoData from '../../components/common/Nodata';
import { getProdBySelFilterSec } from '../../api/products';

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
  if (type === 'out_of_stock') return 'error';
  else if (type === 'low_stock') return 'warning';
  else return 'success';
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'product',
    align: 'left',
    disablePadding: false,
    label: 'Product',
  },
  {
    id: 'brand',
    align: 'left',
    disablePadding: false,
    label: 'Brand',
  },
  {
    id: 'inventoryType',
    align: 'center',
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'price',
    align: 'right',
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'quantity',
    align: 'center',
    disablePadding: false,
    label: 'Stock',
  },
  // {
  //   id: 'actions',
  //   align: 'center',
  //   disablePadding: true,
  //   label: '',
  // },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function ProdTableHead({ order, orderBy }) {
  return (
    <TableHead
      sx={{
        backgroundColor: (theme) => theme.custom.inputBack,
      }}
    >
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

export default function SaleItemTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const [filter, setFilter] = useState('');

  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(10);

  const [orderInfo, setOrderInfo] = useState(null);

  const [getPurchases, setGetPurchases] = useState({
    loading: true,
    products: null,
  });

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');

  useEffect(() => {
    if (type === 'draft' || type === 'public') {
      setGetPurchases({ loading: true, products: null });
      getProdBySelFilterSec({
        product_status: type,
        limit: 1000,
        my_products: true,
      }).then((res) => {
        const products = res.data.products;
        setGetPurchases({ loading: false, result: res.data });
      });
    } else setGetPurchases({ loading: false, products: null });
  }, [type, location.search]);

  // useEffect(() => {
  //   setGetPurchases({ loading: false, products: products });
  // }, [products]);

  const navigate = useNavigate();

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChange = (e) => {
    setFilter(e.target.value.toLowerCase());
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
            {getPurchases.loading ? (
              Array(5)
                .fill()
                .map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    {Array(4)
                      .fill()
                      .map((_, idx) => (
                        <TableCell key={idx * 2}>
                          <Skeleton />
                        </TableCell>
                      ))}
                  </TableRow>
                ))
            ) : getPurchases?.result?.products?.length > 0 ? (
              (filter !== ''
                ? getPurchases?.result?.products.filter(
                    (el) =>
                      el.product?.label?.toLowerCase().indexOf(filter) !== -1
                  )
                : getPurchases?.result?.products
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  let { id: prodId, label, brand, pictures, details } = row;

                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.prodId}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        align='left'
                      >
                        <Box pr={2} display='flex' alignItems='center' gap={2}>
                          <Avatar
                            src={`${remoteUrl}${pictures[0]}`}
                            sx={{
                              width: '40px',
                              height: '40px',
                              '& img': {
                                objectFit: 'contain',
                              },
                            }}
                            variant='rounded'
                          />
                          {label}
                        </Box>
                      </TableCell>
                      <TableCell align='left'>{brand.label}</TableCell>
                      <TableCell align='center'>
                        <ChipLabel color={getChipColor(row.inventoryType)}>
                          {row.product_status}
                        </ChipLabel>
                      </TableCell>
                      <TableCell align='right'>
                        ${details.offered_price}
                      </TableCell>
                      <TableCell align='center'>{row.stock}</TableCell>
                      {/* <TableCell align='right' padding='none'>
                        <IconButton
                          sx={{ borderRadius: '50%' }}
                          color='primary'
                          // onClick={() => navigate(`/products/${row.id}`)}
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                      </TableCell> */}
                    </TableRow>
                  );
                })
            ) : (
              <TableRow>
                <TableCell align='center' colSpan={5}>
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
                  getPurchases?.result?.products?.filter(
                    (el) =>
                      el?.product?.label?.toLowerCase().indexOf(filter) !== -1
                  )?.length / rowsPerPage
                ) || 1}
              </Typography>
            );
          }}
          count={getPurchases?.result?.total}
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
          padding='none'
        />
      </TableContainer>
    </Box>
  );
}
