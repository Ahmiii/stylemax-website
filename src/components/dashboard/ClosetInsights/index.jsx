import { Box, Button, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getMyEarningByDuration } from '../../../api/orders';
import { getMySalesbyStatus } from '../../../api/users';
import CustomTypo from '../../common/CustomTypo';
import EarningsGraph from './EarningsGraph';
import SalesGraph from './SalesGraph';

const renderContent = (contentLabel, data, loading) => {
  switch (contentLabel) {
    case 'earnings':
      return <EarningsGraph earnings={data} loading={loading} />;
    case 'sales':
      return (
        <SalesGraph
          deliveredSales={data?.length === 0 ? null : data}
          loading={loading}
        />
      );

    // case 'purchases':
    //   <EarningsGraph earnings={null} />;
    //   break;
  }
};

const ClosetInsights = () => {
  const [selected, setSelected] = useState('earnings');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleClick = (e) => setSelected(e.target.value);

  useEffect(() => {
    setLoading(true);
    setData(null);
    if (selected === 'earnings') {
      getMyEarningByDuration('1m')
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((er) => {
          setLoading(false);
          setData(null);
        });
    } else if (selected === 'sales') {
      getMySalesbyStatus('delivered')
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((er) => {
          setLoading(false);
          setData(null);
        });
    }
  }, [selected]);

  return (
    <React.Fragment>
      <Box display='flex' flexDirection='column' justifyContent='end' gap={4}>
        <CustomTypo fontFamily='KoHo' variant='h4'>
          Closet Insights
        </CustomTypo>
      </Box>
      <Box display='flex' gap={2} alignItems='center' my={3}>
        <ButtonExt
          variant='contained'
          value='earnings'
          color={selected === 'earnings' ? 'error' : 'secondary'}
          onClick={handleClick}
        >
          Earnings
        </ButtonExt>
        <ButtonExt
          variant='contained'
          value='sales'
          color={selected === 'sales' ? 'error' : 'secondary'}
          onClick={handleClick}
        >
          Sales
        </ButtonExt>
        {/* <ButtonExt
          variant='contained'
          value='purchases'
          color={selected === 'purchases' ? 'error' : 'secondary'}
          onClick={handleClick}
        >
          Purchases
        </ButtonExt> */}
      </Box>
      {renderContent(selected, data, loading)}
    </React.Fragment>
  );
};

const ButtonExt = styled(Button)(() => ({
  borderRadius: 20,
}));

export default ClosetInsights;
