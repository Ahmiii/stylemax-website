import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import CustomTypo from '../components/common/CustomTypo';
import slider01 from '../assets/images/slider01.jpg';
import Container from '../components/common/Container';
import BasketProducts from '../components/basket/products';
import { faker } from '@faker-js/faker';
import Page from '../components/common/Page';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import userImg from '../assets/user.png';
import { useSelector } from 'react-redux';
import { SidebarList } from '../components/dashboard/data';

// const sidebarListItems = [
//   { label: 'My Profile', url: '' },
//   { label: 'My Items for sale', url: 'mysaleItems' },
//   { label: 'My Likes', url: 'mylikes' },
//   { label: 'My Purchases', url: 'mypurchases' },
//   { label: 'My Sales', url: 'mysales' },
//   { label: 'My Closet Insights', url: 'closetinsight' },
//   { label: 'My Balance', url: 'mybalance' },
//   { label: 'My Sale Report', url: 'salereport' },
//   { label: 'My Inventory Report', url: 'inventoryreport' },
//   { label: 'Invite Friends', url: 'invitefriend' },
// ];

const hightLight = (url, label) => {
  if (url === '' && label === 'MyProfile') {
    let color =
      value.url === location.pathname.split('/').pop()
        ? 'error'
        : 'textPrimary';
  }
};

const MyAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useSelector((st) => st.auth);

  useEffect(() => {
    if (!isLoggedIn) navigate('/');
  }, [isLoggedIn]);

  const handleClick = (e) => {
    const { url } = e.currentTarget.dataset;
    navigate(`${url}`);
  };

  return (
    <Page title='StyleMax | My Account'>
      <Container>
        <CustomTypo
          fontFamily='KoHo'
          variant='h3'
          sx={{ mb: 6, textAlign: 'center' }}
        >
          My Dashboard
        </CustomTypo>
        <Box display='flex' alignItems='stretch' gap={3}>
          <Box
            flexBasis='25%'
            py={1.5}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            <List sx={{ width: '100%' }}>
              {SidebarList.map((value, index) =>
                value?.subList ? (
                  <React.Fragment key={value.label}>
                    <ListItem>
                      <ListItemText
                        primary={value.label}
                        primaryTypographyProps={{
                          variant: 'h5',
                          fontWeight: 600,
                        }}
                      />
                    </ListItem>
                    <Collapse
                      in={true}
                      timeout='auto'
                      unmountOnExit
                      sx={{ mb: 1 }}
                    >
                      <List component='div' disablePadding>
                        {value.subList.map((ele) => (
                          <ListItemButton
                            sx={{ pl: 5, py: 0.5 }}
                            data-url={ele.url}
                            onClick={handleClick}
                          >
                            <ListItemText
                              primary={ele.label}
                              primaryTypographyProps={{
                                variant: 'h6',
                                fontWeight: 600,
                                color:
                                  ele.url ===
                                  `${location.pathname.split('/').pop()}${
                                    location.search
                                  }`
                                    ? 'error'
                                    : 'secondary',
                              }}
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </React.Fragment>
                ) : (
                  <React.Fragment key={value.label}>
                    <ListItem disablePadding>
                      <ListItemButton
                        data-url={value.url}
                        onClick={handleClick}
                      >
                        <ListItemText
                          primary={value.label}
                          primaryTypographyProps={{
                            variant: 'h5',
                            fontWeight: 600,
                            color:
                              value.url === '' &&
                              location.pathname.split('/').pop() === 'myaccount'
                                ? 'error'
                                : value.url ===
                                  location.pathname.split('/').pop()
                                ? 'error'
                                : 'textPrimary',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </React.Fragment>
                )
              )}
            </List>
          </Box>
          {/* <Box
            flexBasis='25%'
            p={2}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            <List sx={{ width: '100%' }}>
              {sidebarListItems.map((value, index) => (
                <React.Fragment key={value.label}>
                  <ListItem disablePadding>
                    <ListItemButton data-url={value.url} onClick={handleClick}>
                      <ListItemText
                        primary={value.label}
                        primaryTypographyProps={{
                          variant: 'h5',
                          fontWeight: 500,
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  {index < sidebarListItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Box> */}
          <OutlinedBox flexBasis='75%' py={3} px={4}>
            <Outlet />
          </OutlinedBox>
        </Box>
      </Container>
    </Page>
  );
};

const OutlinedBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '3px',
  overflowX: 'auto',
  // padding: '1rem',
}));

export default MyAccount;
