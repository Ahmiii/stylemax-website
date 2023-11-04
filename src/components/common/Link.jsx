import { Box, styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const InlineLink = ({ to, children }) => {
  return (
    <LinkExt to={to} sx={{ color: (theme) => theme.palette.error }}>
      {children}
    </LinkExt>
  );
};

const LinkExt = styled(Link)(({ theme }) => ({
  color: `${theme.palette.error.main} !important`,
  fontWeight: 600,
  fontFamily: 'inherit',
  textDecoration: 'underline',
}));

export default InlineLink;
