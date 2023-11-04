import PropTypes from 'prop-types';
import { useState } from 'react';

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
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom/dist/index';
import { useSelector } from 'react-redux';
import TableSearch from '../../components/common/TableSearch';
import TablePaginationActions from '../../components/common/TablePagination';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { remoteUrl } from '../../api';
import NoData from '../../components/common/Nodata';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'product',
    align: 'left',
    disablePadding: false,
    label: 'Product',
  },
  {
    id: 'stock',
    align: 'center',
    disablePadding: false,
    label: 'Stock',
  },
  {
    id: 'actions',
    align: 'center',
    disablePadding: true,
    label: '',
  },
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
export default function MyLikesTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const [filter, setFilter] = useState('');
  const { favorites, fetching } = useSelector((st) => st.favorite);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(10);

  const navigate = useNavigate();

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChange = (e) => setFilter(e.target.value.toLowerCase());

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
            {/* {stableSort(rows, getComparator(order, orderBy)) */}
            {fetching ? (
              Array(5)
                .fill()
                .map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    {Array(5)
                      .fill()
                      .map((_, idx) => (
                        <TableCell key={idx * 2}>
                          <Skeleton />
                        </TableCell>
                      ))}
                  </TableRow>
                ))
            ) : favorites?.length > 0 ? (
              (filter !== ''
                ? favorites.filter(
                    (el) =>
                      el.product?.label?.toLowerCase().indexOf(filter) !== -1
                  )
                : favorites
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.product.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  let { label, pictures, stock } = row.product;

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
                      <TableCell align='center'>{stock}</TableCell>
                      <TableCell align='center' padding='none'>
                        <IconButton
                          sx={{ borderRadius: '50%' }}
                          color='primary'
                          onClick={() => navigate(`/product/${row.product.id}`)}
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                      </TableCell>
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
          labelDisplayedRows={({ page }) => {
            return (
              <Typography variant='subtitle2' component='span'>
                Page {page + 1} of{' '}
                {Math.ceil(
                  favorites?.filter(
                    (el) =>
                      el?.product?.label?.toLowerCase().indexOf(filter) !== -1
                  )?.length / rowsPerPage
                ) || 1}
              </Typography>
            );
          }}
          count={favorites?.length || 0}
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
