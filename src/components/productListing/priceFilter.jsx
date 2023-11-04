import { Box, Slider, TextField } from '@mui/material';
import React, { useState } from 'react';

import RemoveIcon from '@mui/icons-material/Remove';

const PriceFilter = () => {
  const [price, setPrice] = useState([0, 500]);
  const handleChange = (event, newValue) => {
    setPrice(newValue);
  };

  console.log('price', price);
  return (
    <Box display='flex' flexDirection='column' gap={2} width='200px'>
      <Box display='flex' gap={0.25} flexWrap='nowrap'>
        <TextField name='startingPrice' value={price[0]} type='number' />
        <RemoveIcon />
        <TextField name='startingPrice' value={price[1]} type='number' />
      </Box>
      <Slider
        value={price}
        onChange={handleChange}
        valueLabelDisplay='auto'
        // getAriaValueText={price}
      />
    </Box>
  );
};

export default PriceFilter;
