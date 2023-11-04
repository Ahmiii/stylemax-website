import { Avatar, Box, Button, Typography } from '@mui/material';
import React from 'react';
import CustomTypo from '../common/CustomTypo';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const CompletedStep = (props) => {
  const { title, description, handleEdit, stepNo } = props;
  return (
    <React.Fragment>
      <Box
        mb={1}
        display='flex'
        gap={2}
        sx={{
          backgroundColor: (theme) => theme.palette.grey[200],
          padding: '2rem 1rem 1rem',
        }}
      >
        <Avatar
          sx={{
            background: (theme) => theme.palette.success.light,
            height: '30px',
            width: '30px',
            '& *': {
              fontSize: '1.2rem',
            },
          }}
        >
          <CheckOutlinedIcon />
        </Avatar>
        <Box>
          <CustomTypo fontFamily='KoHo' variant='h5' color='secondary'>
            {title}
          </CustomTypo>
          <CustomTypo
            fontFamily='KoHo'
            variant='subtitle1'
            color='secondary'
            sx={{ mt: 1 }}
          >
            {description}
          </CustomTypo>
        </Box>
        <Box flex={2} sx={{ textAlign: 'right' }}>
          <Button
            disableRipple
            onClick={() => handleEdit(stepNo)}
            sx={{ fontFamily: 'KoHo', fontWeight: 600 }}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default CompletedStep;
