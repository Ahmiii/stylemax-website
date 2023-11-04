import { Typography } from '@mui/material';
import React from 'react';

const CustomTypo = ({ color, variant, children, fontFamily, sx }) => {
  return (
    <Typography
      variant={variant}
      color={color}
      sx={{ fontFamily: `${fontFamily} !important`, ...sx }}
    >
      {children}
    </Typography>
  );
};

export default CustomTypo;
