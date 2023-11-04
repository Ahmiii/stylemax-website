import { Button as MuiButton } from '@mui/material';
import React from 'react';

const TextButton = ({
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
      data-label={label}
    >
      {label}
    </MuiButton>
  );
};

export default TextButton;
