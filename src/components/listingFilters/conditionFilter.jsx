import { Box, FormControl, InputLabel, MenuItem, Popover } from '@mui/material';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuButton, PopoverExt } from './CustomComp';
import CustomTypo from '../common/CustomTypo';
import queryString from 'query-string';
import {
  extendQueryParams,
  isUrlContainsParams,
  removeQueryParamIfExists,
} from '../../utils/filterMethods';
import { useNavigate } from 'react-router-dom';

const ConditionFilter = ({ conditions = [] }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (value) => {
    if (value === '') {
      let newUrl = removeQueryParamIfExists(location.href, 'condition');
      handleClose();
      return navigate(
        isUrlContainsParams(newUrl) ? `?${newUrl.split('?')[1]}` : ``
      );
    }
    const query = queryString.stringify({ condition: value });
    const extendedUrl = extendQueryParams(location.href, query, false);
    navigate(`?${extendedUrl.split('?')[1]}`);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <React.Fragment>
      <MenuButton
        variant='contained'
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClick}
      >
        Condition
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
        <Box sx={{ px: '0 !important' }}>
          {conditions.length !== 0 ? (
            conditions?.map((option, index) => (
              <Box key={option.value}>
                <MenuItem
                  key={option.value}
                  // selected={index === selectedIndex}
                  onClick={(e) => handleChange(option.label)}
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
        </Box>
      </Popover>
    </React.Fragment>
  );
};

export default ConditionFilter;
