import { Box } from '@mui/material';
import React from 'react';
import ButtonMailto from '../ButtonMailTo';
import CustomTypo from '../common/CustomTypo';

const InviteFriend = () => {
  return (
    <React.Fragment>
      <Box display='flex' flexDirection='column' justifyContent='end' gap={4}>
        <CustomTypo fontFamily='KoHo' variant='h4'>
          Invite Friends
        </CustomTypo>
        <ButtonMailto label='Send Invite' mailto='mailto:' />
      </Box>
    </React.Fragment>
  );
};

export default InviteFriend;
