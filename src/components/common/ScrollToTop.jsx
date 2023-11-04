import React from 'react';
import { Button } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const ScrollToTop = () => {
  const moveToTop = () => {
    document.getElementById('root').scroll({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <Button
      onClick={moveToTop}
      variant='contained'
      color='primary'
      sx={{ position: 'fixed', bottom: '20px', right: '3%' }}
    >
      <ExpandLessIcon />
      To Top
    </Button>
  );
};

export default ScrollToTop;
