import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton } from '@mui/material';
import LogoSection from './Logo';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CustomTypo from './common/CustomTypo';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import SearchBar from './common/Search';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const drawerWidth = 300;

const navSecList = [
  { label: 'How It Works', value: 'howitworks', link: '/howitworks' },
  { label: 'Sell with Us', value: 'sellwithus', link: '/listing/create' },
  {
    label: 'Bridal Collection',
    value: 'bridalcollection',
    link: '/products?category=bridal',
  },
];

export default function NavDrawer() {
  const [state, setState] = React.useState(false);
  const location = useLocation();

  const [navItems, setNavItems] = React.useState([
    { label: 'New Arrivals', value: 'new', link: '/products' },
    { label: 'Sale', value: 'sale', link: '/sale' },
  ]);

  const { categories, fetching: catFetching } = useSelector(
    (st) => st.category
  );
  const NavLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
  });

  const toggleDrawer = (e) => {
    setState((st) => !st);
  };

  React.useEffect(() => {
    if (categories?.length) {
      let data = [
        ...navItems,
        ...categories.map((cat) => {
          return {
            label: cat.label,
            value: cat.label,
            link: `/products?category=${cat.id}`,
          };
        }),
      ];
      data = [...new Map(data.map((item) => [item.label, item])).values()];

      setNavItems(data);
    }
  }, [categories]);

  const list = () => (
    <Box
      sx={{ width: '100%', px: 2, py: 3 }}
      role='presentation'
      onClick={(e) => toggleDrawer(e)}
      onKeyDown={toggleDrawer}
      display='flex'
      flexDirection='column'
      gap={3}
    >
      <Box
        display='flex'
        gap={2}
        justifyContent='space-between'
        alignItems='center'
      >
        <LogoSection />
        <IconButton
          onClick={setState}
          sx={{ color: (theme) => theme.palette.text.primary }}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
      </Box>
      {/* <SearchBar /> */}
      <List>
        {navItems?.map((el, index) => (
          <ListItem key={el.value} disablePadding>
            <ListItemButton>
              <NavLink to='/registeration'>
                <CustomTypo
                  fontFamily='KoHo'
                  variant='h5'
                  sx={{ color: (theme) => location.pathname === el.link }}
                >
                  {el.label}
                </CustomTypo>
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {navSecList.map((el, index) => (
          <ListItem key={el.value} disablePadding>
            <ListItemButton>
              <NavLink to='/registeration'>
                <CustomTypo
                  fontFamily='KoHo'
                  variant='h5'
                  sx={{ color: (theme) => location.pathname === el.link }}
                >
                  {el.label}
                </CustomTypo>
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <IconButton
        size='small'
        onClick={toggleDrawer}
        sx={{ color: (theme) => theme.palette.text.primary }}
      >
        <MenuIcon fontSize='small' />
      </IconButton>
      <Drawer
        anchor='left'
        open={state}
        onClose={toggleDrawer}
        onKeyDown={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {list()}
      </Drawer>
    </React.Fragment>
  );
}
