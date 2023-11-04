import { Button, styled, Box } from '@mui/material';
import React from 'react';
import CustomTypo from '../common/CustomTypo';

const ConditionField = ({
  handleClick,
  sx,
  label,
  title,
  isSelected = false,
}) => {
  return (
    <BoxSt
      onClick={() => handleClick(title)}
      sx={{ ...sx, maxWidth: '200px' }}
      isSelected={isSelected}
    >
      <CustomTypo variant='subtitle1' fontFamily='Jost' sx={{ mb: 0.5 }}>
        {title}
      </CustomTypo>

      <CustomTypo variant='body2' fontFamily='Jost'>
        {label}
      </CustomTypo>
    </BoxSt>
  );
};

const BoxSt = styled(Box, {
  shouldForwardProp: (props) => props !== 'isSelected',
})(({ theme, isSelected }) => ({
  maxWidth: '200px',
  minHeight: '110px',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  flexDirection: 'column',
  borderRadius: '10px',
  border: `1px solid ${theme.palette.divider}`,
  padding: '0.6rem',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 12px',
    border: `2px solid ${theme.palette.primary.main}`,
  },
  ...(isSelected && { border: `2px solid ${theme.palette.primary.main}` }),
}));

export default ConditionField;
