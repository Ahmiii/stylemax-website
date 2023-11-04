import {
  Avatar,
  Box,
  Grid,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomTypo from '../common/CustomTypo';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../api/orders';
import { toast } from 'react-toastify';
import ChipLabel from '../ChipLabel';
import { remoteUrl } from '../../api';

const headCells = [
  {
    id: 'product',
    align: 'left',
    disablePadding: false,
    label: 'Product',
  },
  {
    id: 'price',
    align: 'right',
    disablePadding: false,
    label: 'Item Price',
  },
  // {
  //   id: 'quantity',
  //   align: 'right',
  //   disablePadding: false,
  //   label: 'Quantity',
  // },
  // {
  //   id: 'total',
  //   align: 'right',
  //   disablePadding: false,
  //   label: 'Total Amount',
  // },
];

const OrderDetails = () => {
  const { id } = useParams();
  const [orderInfo, setOrderInfo] = useState({ loading: true, order: null });

  useEffect(() => {
    let mounted = true;
    setOrderInfo({ loading: true, order: null });
    getOrderById(id)
      .then((res) => {
        if (mounted) setOrderInfo({ loading: false, order: res.data });
      })
      .catch((er) => {
        toast.error(er.message);
        setOrderInfo({ loading: false, order: null });
      });
    return () => (mounted = false);
  }, [id]);


  return (
    <React.Fragment>
      <Box display='flex' justifyContent='space-between' gap={4}>
        <CustomTypo fontFamily='KoHo' variant='h4'>
          Sales Details
        </CustomTypo>
      </Box>
      <Box mt={3} display='flex' justifyContent='space-between'>
        <Typography variant='subtitle1'>
          Order # {orderInfo?.order?.id}
        </Typography>
        <Box display='flex' gap={2} alignItems='center'>
          <Typography variant='subtitle1'>
            {new Date(orderInfo?.order?.createdAt).toLocaleString()}
          </Typography>
          <ChipLabel
            color={
              orderInfo?.order?.order_status === 'pending' ? 'error' : 'success'
            }
          >
            {orderInfo?.order?.order_status}
          </ChipLabel>
        </Box>
      </Box>
      <TableContainer
        sx={{
          overflowX: 'auto',
          mt: 2,
          '& td, & th': { whiteSpace: 'nowrap' },
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: '10px',
        }}
      >
        <Table
          aria-labelledby='tableTitle'
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2,
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3,
            },
          }}
        >
          <TableHead
            sx={{ backgroundColor: (theme) => theme.custom.lightBack }}
          >
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.align}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              role='checkbox'
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              tabIndex={-1}
              key={orderInfo?.order?.product?.id}
            >
              <TableCell scope='row' align='left'>
                <Box display='flex' gap={2} alignItems='center'>
                  <Avatar
                    src={`${remoteUrl}${orderInfo?.order?.product?.pictures[0]}`}
                    alt={orderInfo?.order?.product?.label}
                    width='70px'
                    height='70px'
                    variant='rounded'
                    sx={{
                      '& img': { objectFit: 'contain' },
                    }}
                  />
                  <Typography
                    variant='body1'
                    sx={{
                      maxWidth: '250px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {orderInfo?.order?.product?.label}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align='right'>
                ${Math.floor(orderInfo?.order?.product?.details?.price)}
              </TableCell>
              {/* <TableCell component='th' align='right'>
                {orderInfo?.order?.quantity}
              </TableCell>
              <TableCell align='right' sx={{ fontWeight: 600 }}>
                $
                {Math.floor(
                  orderInfo?.order?.product?.details?.offered_price *
                    orderInfo?.order?.quantity
                )}
              </TableCell> */}
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow
              sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                borderBottom: 'none',
              }}
            >
              <TableCell />
              <TableCell>
                <Box display='flex' gap={0.5} justifyContent='space-between'>
                  <Typography variant='subtitle1' color='textPrimary'>
                    Offered Price
                  </Typography>
                  <Typography variant='subtitle1' color='textPrimary'>
                    ${Math.floor(orderInfo?.order?.final_price)}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                borderBottom: 'none',
              }}
            >
              <TableCell />
              <TableCell>
                <Box display='flex' gap={1} justifyContent='space-between'>
                  <Typography variant='subtitle1' color='textPrimary'>
                    Less: Stylemax Fee
                  </Typography>
                  <Typography variant='subtitle1' color='textPrimary'>
                    - $
                    {Math.floor(
                      orderInfo?.order?.product?.details?.platform_fee
                    )}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                // borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                borderBottom: 'none',
              }}
            >
              <TableCell />
              <TableCell>
                <Box display='flex' gap={1} justifyContent='space-between'>
                  <Typography variant='subtitle1' color='textPrimary'>
                    Shipping Fee
                  </Typography>
                  <Typography variant='subtitle1' color='textPrimary'>
                    - $
                    {Math.floor(
                      orderInfo?.order?.product?.details?.shipping_fee
                    )}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>

            <TableRow
              sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                borderBottom: 'none',
              }}
            >
              <TableCell />
              <TableCell>
                <Box display='flex' gap={1} justifyContent='space-between'>
                  <Typography variant='h5' color='secondary'>
                    Your Earnings
                  </Typography>
                  <Typography variant='h5' color='secondary'>
                    ${Math.floor(orderInfo?.order?.product?.details?.earnings)}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Grid mt={2} container spacing={2}>
        <Grid item xs={12} sm={6}>
          <SmallCard>
            <Typography variant='h5' align='center'>
              Customer Details
            </Typography>
            <Box display='flex' gap={2}>
              {/* <Avatar
                src={OrderProdData.buyer.img}
                width='40px'
                height='40px'
                variant='rounded'
              /> */}
              <Box
                sx={{
                  overflowWrap: 'anywhere',
                }}
              >
                <Typography variant='subtitle1' color='textSecondary'>
                  {orderInfo?.order?.buyer?.firstName}{' '}
                  {orderInfo?.order?.buyer?.lastName}
                </Typography>
                <Typography variant='body1'>
                  {' '}
                  {orderInfo?.order?.buyer?.email}
                </Typography>
              </Box>
            </Box>
          </SmallCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SmallCard>
            <Typography variant='h5' align='center'>
              Shipping Address
            </Typography>
            <Box
              sx={{
                overflowWrap: 'anywhere',
              }}
            >
              <Typography variant='subtitle1' color='textSecondary'>
                {orderInfo?.order?.shippingAddress?.firstname}{' '}
                {orderInfo?.order?.shippingAddress?.lastname}
              </Typography>
              <Typography variant='subtitle2'>
                {orderInfo?.order?.shippingAddress?.phoneNumber}
              </Typography>
              <Typography variant='body1' sx={{ mb: 0.5, mt: 1 }}>
                {orderInfo?.order?.shippingAddress?.address},{' '}
                {orderInfo?.order?.shippingAddress?.city},{' '}
                {orderInfo?.order?.shippingAddress?.state},{' '}
                {orderInfo?.order?.shippingAddress?.country}.
              </Typography>
              <Typography variant='body1'>
                {orderInfo?.order?.shippingAddress?.address2},{' '}
                {orderInfo?.order?.shippingAddress?.city},{' '}
                {orderInfo?.order?.shippingAddress?.state},{' '}
                {orderInfo?.order?.shippingAddress?.country}.
              </Typography>
            </Box>
          </SmallCard>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const SmallCard = styled(Box)(({ theme }) => ({
  padding: '15px',
  borderRadius: '10px',
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  height: '100%',
}));

export default OrderDetails;
