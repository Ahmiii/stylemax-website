import { Button as MuiButton } from '@mui/material';
import React from 'react';

const InlineTextButton = ({
  label,
  onClick,
  size = 'medium',
  color = 'inherit',
  sx,
}) => {
  return (
    <MuiButton
      size={size}
      sx={{
        fontFamily: 'KoHo',
        fontWeight: 700,
        color: (theme) =>
          color === 'error' ? theme.palette.error.main : color,
        '&:hover': {
          backgroundColor: 'transparent',
          textDecoration: 'underline',
          textUnderlinePosition: 'under',
        },
        ...sx,
      }}
      onClick={onClick}
      disableRipple
    >
      {label}
    </MuiButton>
  );
};

export default InlineTextButton;
