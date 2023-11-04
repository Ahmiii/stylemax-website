import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
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
import CustomTypo from '../common/CustomTypo';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import queryString from 'query-string';
import NoData from '../common/Nodata';
import { extendQueryParams } from '../../utils/filterMethods';

const ColorFilter = ({ colors = [] }) => {
  console.log('colors', colors);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [checkedList, setCheckedList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let query = new URLSearchParams(location.search).get('colour');
    if (!query) return setCheckedList([]);
    query = query.split(',');
    let newChckLst = colors
      .filter((el) => query.includes(el.colour))
      .map((el) => ({ [el.colour]: el.colour }));
    setCheckedList(newChckLst);
  }, [location.search]);

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
    let searchColors = checkedList.map((obj) => Object.values(obj)[0]);
    const query = queryString.stringify(
      { colour: searchColors },
      { arrayFormat: 'separator', arrayFormatSeparator: ',' }
    );
    const extendedUrl = extendQueryParams(location.href, query);
    navigate(`?${extendedUrl.split('?')[1]}`);
    handleClose();
  };

  const handleReset = () => {
    let removeColors = location.pathname.split('?');
    handleClose();
    navigate(removeColors[0]);
  };

  const open = Boolean(anchorEl);
  const colour = open ? 'simple-popover' : undefined;

  return (
    <React.Fragment>
      <MenuButton
        variant='contained'
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClick}
      >
        Colors
      </MenuButton>
      <PopoverExt
        id={colour}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ContentWrapper>
          {colors.length !== 0 ? (
            colors?.map((el) => (
              <Box
                key={el.colour}
                display='flex'
                alignItems='center'
                gap={1}
                justifyContent='space-between'
              >
                <CustomTypo fontFamily='Inter' variant='body1'>
                  {el.colour}
                </CustomTypo>
                <FormControlLabel
                  label={el.count}
                  control={
                    <Checkbox
                      name={`${el.colour}`}
                      onChange={handleChecked}
                      value={el.colour}
                      label={el.count}
                      checked={
                        checkedList?.filter((e) =>
                          e.hasOwnProperty(el.colour)
                        )[0]
                          ? true
                          : false
                      }
                      inputProps={{ 'aria-label': 'controlled' }}
                      sx={{ p: 0, ml: '10px' }}
                    />
                  }
                  labelPlacement='start'
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
            color='inherit'
            sx={{ flex: 1 }}
            onClick={handleReset}
          >
            Reset
          </ButtonDefault>
          <Button
            disabled={checkedList.length === 0}
            variant='contained'
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

export default ColorFilter;
