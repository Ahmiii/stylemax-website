import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Typography, useTheme } from '@mui/material';

import ChevronRight from '@mui/icons-material/ChevronRight';
import ChevronLeft from '@mui/icons-material/ChevronLeft';

export default function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  return (
    <>
      <Box
        display='flex'
        alignItems='center'
        sx={{ flexShrink: 0, marginRight: '0.5rem' }}
      >
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label='previous page'
          size='small'
          // color="text.primary"
          disableRipple
          sx={{ paddingInline: 0 }}
        >
          {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
        <Typography variant='subtitle2' component='span'>
          {page + 1}
        </Typography>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label='next page'
          // color="text.primary"
          sx={{ paddingInline: 0 }}
          disableRipple
        >
          {theme.direction === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>
    </>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
