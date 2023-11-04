import { Button as MuiButton } from '@mui/material';
import React from 'react';

const RedButton = ({ label, onClick, size = 'medium' }) => {
  return (
    <MuiButton
      variant='contained'
      size={size}
      sx={{
        bgcolor: (theme) => theme.custom.red.main,
        '&:hover': {
          backgroundColor: (theme) => theme.custom.red.dark,
        },
      }}
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
};

export default RedButton;
