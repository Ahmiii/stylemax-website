import {
  Autocomplete,
  Box,
  ClickAwayListener,
  InputBase,
  TextField,
  styled,
  useTheme,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import API_URL, { END_POINTS } from '../../config';

const SearchBar = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const theme = useTheme();

  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get('filter');
  const [searchQuery, setSearchQuery] = useState('');
  const [autoFillData, setAutoFillData] = useState([]);
  const [hover, setHover] = useState(null);
  function handleSearch(event) {
    if (event.key === 'Enter') {
      // navigate(`/products?filter=${searchQuery}`);
      navigate('/registeration');
    }
  }

  const fetchProducts = (searchString) => {
    if (searchString !== '') {
      axios
        .get(API_URL + END_POINTS.products + `?filter=${searchString}`)
        .then((res) => {
          setAutoFillData(res.data.products);
        })
        .catch((e) => {
          setAutoFillData([]);
        });
    } else setAutoFillData([]);
  };

  const handleSearchInput = (searchString) => {
    setSearchQuery(searchString);
    fetchProducts(searchString);
  };
  const handleClickAway = () => {
    setAutoFillData([]);
  };

  const normalStyle = {
    // paddingTop: '3px',
    cursor: 'pointer',
    padding: '15px',
    // backgroundColor: '#f7f7f7',
    color: '#706d6d',
    fontWeight: 600,
    fontFamily: 'Jost',
    // borderBottom : '1px solid black'

    // paddingLeft: '5px',
  };
  const hoverStyle = {
    // paddingTop: '3px',
    cursor: 'pointer',
    padding: '15px',
    // backgroundColor: 'rgb(219 219 219)',
    backgroundColor: '#F6F6F6',
    color: theme.palette.error.main,
    fontWeight: 600,
    fontFamily: 'Jost',
    // borderBottom : '1px solid red'
    // color: 'rgb(66 63 63)',
    // paddingLeft: '5px',
  };

  const removeLastChildBorder = {
    borderBottom: 'none',
  };

  const renderAutoFillData = () => {
    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box
          width='67%'
          position='absolute'
          zIndex='10'
          top='62px'
          marginLeft='5px'
          borderRadius='10px'
          boxShadow='rgba(0, 0, 0, 0.08) 0px 4px 12px'
          backgroundColor='white'
          border='2px solid #e8e8e8'
        >
          {autoFillData.map((data, index) => (
            <option
              onMouseEnter={() => setHover(data.id)}
              onMouseLeave={() => setHover(null)}
              style={{
                ...(hover === data.id ? hoverStyle : normalStyle),
                ...(autoFillData.length - 1 == index && removeLastChildBorder),
              }}
              // height='15px'
              // onClick={() => {
              //   navigate(`/product/${data.id}`);
              //   navigate(0);
              //   setAutoFillData([]);
              // }}
            >
              {data.label}
            </option>
          ))}
        </Box>
      </ClickAwayListener>
    );
  };

  useEffect(() => {
    setSearchQuery(filter || '');
  }, [filter]);

  return (
    // <Box display='flex' flexDirection='column' width='100%'>
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon color='secondary' sx={{ color: '#475569' }} />
        </SearchIconWrapper>
        <StyledInputBase
          value={searchQuery}
          placeholder='Search'
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => handleSearchInput(e.target.value)}
          onKeyDown={handleSearch}
        />
      </Search>{' '}
      {/* {autoFillData.length && renderAutoFillData()} */}
    </>
    // </Box>
  );
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '28px',
  borerColor: '#475569',
  border: '1px solid #CBD5E1',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  backgroundColor: '#fff',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#475569',
  display: 'flex',
  flex: 1,
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 1, 2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
  },
}));

export default SearchBar;
