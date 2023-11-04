import React from 'react';
import { Box } from '@mui/material/index';
import { ReactSVG } from 'react-svg';
import noFound from '../../assets/notFound.svg';

const NoData = ({ minHeight = '400px', svgWidth = '100px' }) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      minHeight={minHeight}
      width='100%'
      sx={{
        '& svg': {
          maxWidth: svgWidth,
          height: '100%',
        },
      }}
    >
      <ReactSVG src={noFound} />
    </Box>
  );
};

export default NoData;
