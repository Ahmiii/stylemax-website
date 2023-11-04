import { Box, FormControl, InputLabel, MenuItem, Popover } from '@mui/material';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuButton, PopoverExt } from './CustomComp';
import CustomTypo from '../common/CustomTypo';
import {
  extendQueryParams,
  isUrlContainsParams,
  removeQueryParamIfExists,
} from '../../utils/filterMethods';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';

const shippingOptions = [
  { label: 'No Discount', value: 'stdrd_no_discount' },
  { label: '25% Discount', value: 'stdrd_25_discount' },
  { label: '50% Discount', value: 'stdrd_50_discount' },
  { label: 'FREE', value: 'stdrd_free' },
];

const ShippingFilter = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleChange = (value) => {
    if (value === '') {
      let newUrl = removeQueryParamIfExists(location.href, 'shipping');
      handleClose();
      return navigate(
        isUrlContainsParams(newUrl) ? `?${newUrl.split('?')[1]}` : ``
      );
    }
    const query = queryString.stringify({ shipping: value });
    const extendedUrl = extendQueryParams(location.href, query, false);
    navigate(`?${extendedUrl.split('?')[1]}`);
    handleClose();
  };

  return (
    <React.Fragment>
      <MenuButton
        variant='contained'
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClick}
      >
        Shipping
      </MenuButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {shippingOptions.length !== 0 ? (
          shippingOptions?.map((option, index) => (
            <Box key={option.value} sx={{ px: '0 !important' }}>
              <MenuItem
                key={option.value}
                // selected={index === selectedIndex}
                onClick={() => handleChange(option.value)}
              >
                {option.label}
              </MenuItem>
            </Box>
          ))
        ) : (
          <CustomTypo fontFamily='Jost' variant='body2' sx={{ p: '1rem' }}>
            No Options
          </CustomTypo>
        )}
      </Popover>
    </React.Fragment>
  );
};

export default ShippingFilter;
