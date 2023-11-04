import { Breadcrumbs, styled, Typography } from '@mui/material';
import React from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function handleClick(event) {
  event.preventDefault();
}

const BreadCrumbsExt = () => {
  const location = useLocation();
  const [value, setValue] = useState(null);

  const bc = location.pathname
    .split('/')
    .slice(1)
    .filter((el) => el !== '');
  let currentLink = '/';

  if (location.pathname === '/' || location.pathname === '/registeration')
    return;

  return (
    <Breadcrumbs
      color='text.primary'
      separator={<NavigateNextIcon fontSize='small' />}
      aria-label='breadcrumb'
      marginBottom='2%'
      sx={{
        textTransform: 'uppercase',
      }}
    >
      <LinkExt underline='hover' color='text.primary' to='/'>
        Home
      </LinkExt>
      {bc.map((el, ind) => {
        currentLink = currentLink + el;
        return (
          <React.Fragment>
            {ind < bc.length - 1 ? (
              <LinkExt
                underline='hover'
                key={`${el}-${ind}`}
                color='text.primary'
                to={currentLink}
              >
                {el}
              </LinkExt>
            ) : bc[0] === 'product' ? (
              <Typography key={`${el}-${ind}`} color='text.primary'>
                {location?.state?.product?.label}
              </Typography>
            ) : (
              <Typography key={`${el}-${ind}`} color='text.primary'>
                {el}
              </Typography>
            )}
          </React.Fragment>
        );
      })}
    </Breadcrumbs>
  );
};

const LinkExt = styled(Link)(({ theme }) => ({
  color: `${theme.palette.primary.main} !important`,
  fontFamily: 'inherit',
  textDecoration: 'none',
}));

export default BreadCrumbsExt;
