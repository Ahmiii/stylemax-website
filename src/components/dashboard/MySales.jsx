import { Box, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomTypo from '../common/CustomTypo';
import SaleItemTable from '../../tables/mySaleItems';
import MySalesTable from '../../tables/mySales';
import { getMySalesbyStatus } from '../../api/users';

const MySales = () => {
  const [status, setStatus] = useState('pending');
  const [salesInfo, setSalesInfo] = useState({ loading: true, sales: null });

  const handleChange = (e) => setStatus(e.target.value);
  
  useEffect(() => {
    let mounted = true;
    setSalesInfo({ loading: true, sales: null });
    getMySalesbyStatus(status)
      .then((res) => {
        if (mounted) setSalesInfo({ loading: false, sales: res.data });
      })
      .catch((err) => setSalesInfo({ loading: false, sales: null }));
    return () => (mounted = false);
  }, [status]);

  return (
    <React.Fragment>
      <Box display='flex' justifyContent='space-between' gap={4}>
        <CustomTypo fontFamily='KoHo' variant='h4'>
          My Sales
        </CustomTypo>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          value={status}
          displayEmpty
          size='small'
          onChange={handleChange}
        >
          <MenuItem value='pending'>Pending</MenuItem>
          <MenuItem value='delivered'>Delivered</MenuItem>
        </Select>
      </Box>
      <MySalesTable loading={salesInfo.loading} sales={salesInfo.sales} setSalesInfo={setSalesInfo}/>
    </React.Fragment>
  );
};

export default MySales;
