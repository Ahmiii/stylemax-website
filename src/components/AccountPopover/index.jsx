import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CustomTypo from '../common/CustomTypo';

import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/auth/extraReducers';
import { useNavigate } from 'react-router-dom';
import { popoverItems } from './popoverItems';
import { remoteUrl } from '../../api';

export default function AccountMenu({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account'>
          <IconButton
            onClick={handleClick}
            size='small'
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            {user.picture ? (
              <Avatar
                src={`${remoteUrl}${user.picture}`}
                sx={{ width: 32, height: 32 }}
              />
            ) : (
              <Avatar
                sx={{ width: 32, height: 32, textTransform: 'uppercase' }}
              >
                {user.firstName[0]}
              </Avatar>
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box px='16px' py='6px'>
          <CustomTypo
            fontFamily='KoHo'
            variant='subtitle1'
            sx={{ textAlign: 'center' }}
          >
            {user.firstName} {user.lastName}
          </CustomTypo>
        </Box>
        <Divider />
        {popoverItems.map((el) => (
          <MenuItem
            onClick={() => {
              handleClose();
              navigate(`${el.url}`);
            }}
          >
            {el.label}
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => {
            // usersAPI.logout();
            localStorage.removeItem('access_token');
            localStorage.removeItem('userData');
            dispatch(logout());
            handleClose();
          }}
        >
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
