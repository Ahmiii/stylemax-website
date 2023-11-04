import { Box, FormControl, InputLabel, MenuItem, Popover } from '@mui/material';
import React, { useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuButton, PopoverExt } from './CustomComp';
import CustomTypo from '../common/CustomTypo';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import {
  extendQueryParams,
  isUrlContainsParams,
  removeQueryParamIfExists,
} from '../../utils/filterMethods';

const StyleFilter = ({ style = [] }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let query = new URLSearchParams(location.search).get('style');
    if (!query) return;
    // query = query.split(',');
    // let newChckLst = brands
    //   .filter((el) => query.includes(el.label.toLowerCase()))
    //   .map((el) => ({ [el.id]: el.label }));
    // setCheckedList(newChckLst);
  }, [location.search]);

  const handleChange = (value) => {
    if (value === '') {
      let newUrl = removeQueryParamIfExists(location.href, 'style');
      handleClose();
      return navigate(
        isUrlContainsParams(newUrl) ? `?${newUrl.split('?')[1]}` : ``
      );
    }
    const query = queryString.stringify({ style: value });
    const extendedUrl = extendQueryParams(location.href, query, false);
    navigate(`?${extendedUrl.split('?')[1]}`);
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        Style
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
          <MenuItem onClick={() => handleChange('')}>All</MenuItem>
          {style.length !== 0 ? (
            style?.map((option, index) => (
              <Box key={option.value}>
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
        </Box>
      </Popover>
    </React.Fragment>
  );
};

export default StyleFilter;
