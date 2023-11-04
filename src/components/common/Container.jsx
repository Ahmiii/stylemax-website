import { Box } from '@mui/material';
import React from 'react';

const Container = ({ children }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1440px',
        marginInline: 'auto',
        px: 3,
        // height: '100%',
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
