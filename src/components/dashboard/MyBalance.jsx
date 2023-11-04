import { Box, Divider } from '@mui/material';
import React, { useEffect } from 'react';
import CustomTypo from '../common/CustomTypo';
import { getMyEarning } from '../../api/orders';

const MyBalance = () => {
  const [earnings, setEarning] = React.useState(0);

  useEffect(() => {
    getMyEarning().then((res) => setEarning(res?.data?.earnings ?? 0));
  });

  return (
    <React.Fragment>
      <Box display='flex' flexDirection='column' justifyContent='end' gap={3}>
        <CustomTypo fontFamily='KoHo' variant='h4'>
          My Balance
        </CustomTypo>
        <Divider />
        <Box
          display='flex'
          gap={1}
          justifyContent='space-between'
          alignItems='center'
        >
          <Box>
            <CustomTypo variant='h6' fontFamily='Inter'>
              Credits
            </CustomTypo>
            <CustomTypo variant='body1' fontFamily='Inter'>
              Credits can be used for shopping on stylemax.
            </CustomTypo>
          </Box>
          <CustomTypo variant='h5' fontFamily='Inter'>
            C${earnings}
          </CustomTypo>
        </Box>
        <Divider />
        <Box
          display='flex'
          gap={1}
          justifyContent='space-between'
          alignItems='center'
        >
          <Box>
            <CustomTypo variant='h6' fontFamily='Inter'>
              Pending
            </CustomTypo>
            <CustomTypo variant='body1' fontFamily='Inter'>
              Pending are completed once the buyer accepts your sold order.
            </CustomTypo>
          </Box>
          <CustomTypo variant='h5' fontFamily='Inter'>
            C$0.00
          </CustomTypo>
        </Box>
        <Divider />
        <Box
          display='flex'
          gap={1}
          justifyContent='space-between'
          alignItems='center'
        >
          <Box>
            <CustomTypo variant='h6' fontFamily='Inter'>
              Redeemable
            </CustomTypo>
            <CustomTypo variant='body1' fontFamily='Inter'>
              This is the balance which you can withdraw or use for shopping on
              stylemax.
            </CustomTypo>
          </Box>
          <CustomTypo variant='h5' fontFamily='Inter'>
            C$0.00
          </CustomTypo>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default MyBalance;
