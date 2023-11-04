import {
  Box,
  Button,
  Checkbox,
  Divider,
  InputAdornment,
  OutlinedInput,
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

const BrandFilter = ({ brands }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [checkedList, setCheckedList] = useState([]);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    let query = new URLSearchParams(location.search).get('brand');
    if (!query) return setCheckedList([]);

    query = query.split(',');
    let newChckLst = brands
      ?.filter((el) => query.includes(el.label.toLowerCase()))
      ?.map((el) => ({ [el.id]: el.label }));
    setCheckedList(newChckLst);
  }, [location.search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChecked = useCallback(
    (e) => {
      if (e.target.checked)
        setCheckedList((prevList) => [
          ...prevList,
          { [e.target.name]: e.target.value },
        ]);
      else
        setCheckedList((prevList) =>
          prevList.filter((obj) => !obj.hasOwnProperty(e.target.name))
        );
    },
    [setCheckedList]
  );

  const handleApply = () => {
    let searchBrands = checkedList.map((obj) =>
      Object.values(obj)[0].toLowerCase()
    );

    const query = queryString.stringify(
      { brand: searchBrands },
      { arrayFormat: 'separator', arrayFormatSeparator: ',' }
    );
    const extendedUrl = extendQueryParams(location.href, query);
    navigate(`?${extendedUrl.split('?')[1]}`);
    handleClose();
  };

  const handleReset = () => {
    let newUrl = removeQueryParamIfExists(location.href, 'brand');
    handleClose();
    navigate(isUrlContainsParams(newUrl) ? `?${newUrl.split('?')[1]}` : ``);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover-price' : undefined;

  return (
    <React.Fragment>
      <MenuButton
        variant='contained'
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClick}
      >
        Brand
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
        <Box>
          <InputExt
            id='outlined-adornment-weight'
            value={search}
            name='search'
            onChange={handleChange}
            startAdornment={
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            }
            aria-describedby='outlined-weight-helper-text'
            inputProps={{
              'aria-label': 'weight',
            }}
            size='small'
            fullWidth
            placeholder='Search'
          />
        </Box>
        <ContentWrapper>
          {brands?.length > 0 ? (
            brands
              ?.filter((e) => e.label.toLowerCase().includes(search))
              ?.map((el) => (
                <Box
                  key={el.id}
                  display='flex'
                  alignItems='center'
                  gap={1}
                  justifyContent='space-between'
                >
                  <CustomTypo fontFamily='Inter' variant='body1'>
                    {el.label}
                  </CustomTypo>
                  <Checkbox
                    name={`${el.id}`}
                    onChange={handleChecked}
                    value={el.label}
                    checked={
                      checkedList?.filter((e) => e.hasOwnProperty(el.id))[0]
                        ? true
                        : false
                    }
                    inputProps={{ 'aria-label': 'controlled' }}
                    sx={{ p: 0 }}
                  />
                </Box>
              ))
          ) : (
            // <NoData minHeight='100px' svgWidth='80px' />
            <Box width='100%' textAlign='center'>
              <CustomTypo fontFamily='Jost' variant='body2'>
                No Options
              </CustomTypo>
            </Box>
          )}
        </ContentWrapper>
        <Box>
          <Divider />
        </Box>
        <Box display='flex' gap={1} justifyContent='space-between'>
          <ButtonDefault
            variant='contained'
            disabled={checkedList.length === 0}
            // size='large'
            color='inherit'
            sx={{ flex: 1 }}
            onClick={handleReset}
          >
            Reset
          </ButtonDefault>
          <Button
            disabled={checkedList.length === 0}
            variant='contained'
            // size='large'
            sx={{ flex: 1 }}
            onClick={handleApply}
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
  '& .MuiInputAdornment-root': {
    marginLeft: '-1px',
    marginTop: '1px',
    marginRight: '8px',
    '& svg': {
      color: theme.palette.grey[500],
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '6px',
    border: `1px solid ${theme.palette.grey[500]}`,
  },
}));

export default BrandFilter;
