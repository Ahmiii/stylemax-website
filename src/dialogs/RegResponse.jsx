import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  IconButton,
  Typography,
} from '@mui/material';

import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import Logo from '../components/Logo/Logo';

export default function Registeration({ open, handleClose, status }) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogTitle align='center'>Join StyleMax</DialogTitle>
      <DialogContent align='center'>
        <Box mx='auto' width='190px' my={3}>
          <Logo />
        </Box>
        <Typography variant='subtitle1' sx={{ maxWidth: 340 }}>
          {status}
        </Typography>
        <Typography
          variant='h5'
          sx={{
            maxWidth: 340,
            color: (theme) => theme.palette.success.dark,
            marginTop: '1rem',
          }}
        >
          Stay Tuned, we'er launching soon...
        </Typography>
      </DialogContent>
      <Box position='absolute' top='0' right='0'>
        <IconButton onClick={handleClose} color='inherit' disableRipple>
          <HighlightOffOutlinedIcon sx={{ fontSize: '1.75rem' }} />
        </IconButton>
      </Box>
    </Dialog>
  );
}
