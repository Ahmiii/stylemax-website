import { Box, styled } from '@mui/material';

export const CardWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  width: '100%',
  gridColumnGap: '1rem',
  gridRowGap: '3rem',
  gridTemplateColumns: 'repeat(auto-fill, minmax(215px, 1fr))',
}));
