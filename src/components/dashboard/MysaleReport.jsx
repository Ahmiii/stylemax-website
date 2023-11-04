import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomTypo from '../common/CustomTypo';
import SalesChart from './SalesChart';
import { getMySalesbyStatus } from '../../api/users';
import { toast } from 'react-toastify';

const MySaleReport = () => {
  const [pendingSales, setPendingSales] = useState({
    loading: true,
    sales: null,
  });
  const [deliveredSales, setDeliveredSales] = useState({
    loading: true,
    sales: null,
  });

  useEffect(() => {
    getMySalesbyStatus('pending')
      .then((res) => {
        setPendingSales({ loading: false, sales: res.data });
      })
      .catch((er) => {
        toast.error(er.message);
        setPendingSales({ loading: false, sales: null });
      });
    getMySalesbyStatus('delivered')
      .then((res) => setDeliveredSales({ loading: false, sales: res.data }))
      .catch((er) => {
        toast.error(er.message);
        setDeliveredSales({ loading: false, sales: null });
      });
  }, []);

  return (
    <React.Fragment>
      <Box display='flex' flexDirection='column' justifyContent='end' gap={4}>
        <CustomTypo fontFamily='KoHo' variant='h4'>
          My Sale Report
        </CustomTypo>
      </Box>
      <SalesChart
        pendingSales={pendingSales.sales}
        deliveredSales={deliveredSales.sales}
      />
    </React.Fragment>
  );
};

export default MySaleReport;
