import React from 'react';

import { Box, useTheme } from '@mui/material';
import Logo from '../Logo/Logo';
import PropagateLoader from 'react-spinners/PropagateLoader';

const SiteContentLoading = () => {
  const theme = useTheme();

  return (
    <Box minHeight='500px' position='relative'>
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <Box sx={{ maxWidth: '200px' }}>
          <Logo />
        </Box>
        <PropagateLoader color={theme.palette.secondary.main} />
      </Box>
    </Box>
  );
};

export default SiteContentLoading;
