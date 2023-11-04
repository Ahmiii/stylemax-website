import {
  Box,
  Button,
  Checkbox,
  Divider,
  InputAdornment,
  OutlinedInput,
  Slider,
  styled,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  ButtonDefault,
  ContentWrapper,
  MenuButton,
  PopoverExt,
} from './CustomComp';
import SearchIcon from '@mui/icons-material/Search';
import CustomTypo from '../common/CustomTypo';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import queryString from 'query-string';
import {
  extendQueryParams,
  isUrlContainsParams,
  removeQueryParamIfExists,
} from '../../utils/filterMethods';
import { max } from 'date-fns';
import { toast } from 'react-toastify';

function valuetext(value) {
  return `$${value}`;
}

const PriceFilter = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [priceTxt, setPriceTxt] = useState({
    min: 0,
    max: 300,
  });
  const [value, setValue] = React.useState([priceTxt.min, priceTxt.max]);

  const handleTxtChange = (e) => {
    if (e.target.name === 'max' && e.target.value > 500)
      return toast.info('Price should be less than 500');

    if (e.target.name === 'max') setValue((st) => [st[0], e.target.value]);
    else setValue((st) => [e.target.value, st[1]]);
    setPriceTxt((st) => ({ ...st, [e.target.name]: +e.target.value }));
  };
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue([priceTxt.min, priceTxt.max]);
  }, [priceTxt]);

  useEffect(() => {
    let query = new URLSearchParams(location.search).get('price');
    if (!query) return setValue([0, 300]);
    query = query.split(',');
    setValue(query);
  }, [location.search]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApply = () => {
    const query = queryString.stringify(
      { price: [value[0], value[1]] },
      { arrayFormat: 'separator', arrayFormatSeparator: ',' }
    );
    const extendedUrl = extendQueryParams(location.href, query);
    navigate(`?${extendedUrl.split('?')[1]}`);
    handleClose();
  };

  const handleReset = () => {
    setValue([0, 300]);
    let newUrl = removeQueryParamIfExists(location.href, 'price');
    handleClose();
    navigate(isUrlContainsParams(newUrl) ? `?${newUrl.split('?')[1]}` : ``);
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
        Price
      </MenuButton>
      <PopoverExt
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box display='flex' gap={1}>
          <InputExt
            name='min'
            value={priceTxt.min}
            type='number'
            onChange={handleTxtChange}
            fullWidth
            size='small'
            startAdornment={<InputAdornment position='start'>$</InputAdornment>}
          />
          <InputExt
            name='max'
            value={priceTxt.max}
            type='number'
            onChange={handleTxtChange}
            size='small'
            fullWidth
            startAdornment={<InputAdornment position='start'>$</InputAdornment>}
          />
        </Box>
        <Box width='100%' overflowX='hidden' height='100%' display='flex'>
          <SliderExt
            value={value}
            onChange={handleSliderChange}
            valueLabelDisplay='auto'
            getAriaValueText={valuetext}
            min={priceTxt.min}
            max={priceTxt.max}
            sx={{
              width: '90%',
              marginInline: 'auto',
            }}
          />
        </Box>
        <Box>
          <Divider />
        </Box>
        <Box
          display='flex'
          gap={1}
          justifyContent='space-between'
          // sx={{
          //   borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          //   pt: 2,
          // }}
        >
          <ButtonDefault
            variant='contained'
            // disabled={checkedList.length === 0}
            // size='large'
            color='inherit'
            sx={{ flex: 1 }}
            onClick={handleReset}
            disabled={value[0] === priceTxt.min && value[1] === priceTxt.max}
          >
            Reset
          </ButtonDefault>
          <Button
            variant='contained'
            // size='large'
            sx={{ flex: 1 }}
            onClick={handleApply}
            // disabled={value[0] === priceTxt.min && value[1] === priceTxt.max}
          >
            Apply
          </Button>
        </Box>
      </PopoverExt>
    </React.Fragment>
  );
};

const InputExt = styled(OutlinedInput)(({ theme }) => ({
  paddingLeft: 14,
  fontWeight: 500,
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '6px',
    border: `1px solid ${theme.palette.grey[500]}`,
  },
}));

const SliderExt = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-thumb': {
    color: '#fff',
    border: `1px solid ${theme.palette.grey[500]}`,
    boxShadow: 'rgba(0, 0, 0, 0.1) -4px 9px 25px -6px',
  },
  '& .MuiSlider-track': {
    backgroundColor: theme.custom.purple,
  },
}));

export default PriceFilter;
