import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const ButtonMailto = ({ mailto, label }) => {
  return (
    <Link to='#'>
      <Button
        variant='contained'
        type='button'
        onClick={(e) => {
          window.location.href = mailto;
          e.preventDefault();
        }}
      >
        {label}
      </Button>
    </Link>
  );
};

export default ButtonMailto;
