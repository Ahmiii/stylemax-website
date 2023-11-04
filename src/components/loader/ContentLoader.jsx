import { useTheme } from '@emotion/react';
import { Box } from '@mui/system';
import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

const ContentLoader = () => {
  const theme = useTheme();
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      minHeight='650px'
      flex={1}
    >
      <HashLoader color={theme.palette.secondary.main} />
    </Box>
  );
};

export default ContentLoader;
