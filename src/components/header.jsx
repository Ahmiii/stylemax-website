import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Tabs,
  Tab,
  IconButton,
  Divider,
  Badge,
  Dialog,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { ReactComponent as UserIcon } from '../assets/UserLogo.svg';
import { ReactComponent as CartIcon } from '../assets/CartLogo.svg';
import CommingSoon from '../assets/images/comingSoon.jpg';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AccountMenu from './AccountPopover';
import NavDrawer from './NavDrawer';
import Logo from './Logo';
import SearchBar from './common/Search';
import Container from './common/Container';
import { getAllCategories } from '../store/slices/category/extraReducers';
import authSlice from '../store/slices/auth';

const LoginText = styled('span')({
  fontWeight: 'bold',
  fontSize: '16px',
  marginLeft: '8px',
});

const LTab = styled(Tab)(() => ({
  textTransform: 'none',
  fontWeight: 'normal',
  color: '#0F172A',
  fontSize: '16px',
  '&:hover, &.Mui-selected': {
    fontWeight: 'bold',
    color: '#DF1B0F',
  },
}));

const RTab = styled(Tab)(() => ({
  textTransform: 'none',
  fontWeight: 'normal',
  color: '#0F172A',
  fontSize: '16px',
  '&.Mui-selected': {
    fontWeight: 'bold',
    color: 'inherit',
  },
}));

const LTabs = styled(Tabs)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: 0,
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
}));

const RTabs = styled(Tabs)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: 0,
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#6366F1',
    height: '3px',
  },
}));

function Header() {
  const [lValue, setLValue] = React.useState();
  const [rValue, setRValue] = React.useState(5);
  const [openSubCategories, setOpenSubCategories] = React.useState(null);
  const [openSaleModal, setOpenSaleModal] = React.useState(false);

  const { user } = useSelector((st) => st.auth);
  const { cart } = useSelector((st) => st.cart);
  const { favorites } = useSelector((st) => st.favorite);

  const { categories } = useSelector((st) => st.category);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const paramsCategory = queryParams.get('category');

  useEffect(() => {
    if (paramsCategory) {
      const catId = categories?.filter((catFilter) => {
        if (
          catFilter.label.toLowerCase() === paramsCategory ||
          catFilter.id === +paramsCategory
        )
          return true;
        else return false;
      })[0]?.id;
      setLValue('products?category=' + catId);
    } else if (location.pathname === '/products') {
      setLValue('products');
    }
  }, [categories]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    if (category == 'new') {
      setLValue(0);
      setRValue(null);
    }
    if (category == 'sale') {
      setLValue(6);
      setRValue(null);
    }
    if (category == 'kids') {
      setLValue(3);
      setRValue(null);
    }
    if (category == 'brand') {
      setLValue(4);
      setRValue(null);
    }
    if (category == 'men') {
      setLValue(2);
      setRValue(null);
    }
    if (category == 'women') {
      setLValue(1);
      setRValue(null);
    }
    if (category == 'bridal') {
      setRValue(2);
      setLValue(null);
    }
  }, [location.search]);

  useEffect(() => {
    const currentUrl = window.location.pathname;

    if (currentUrl.includes('/listing')) {
      if (rValue !== 1) setRValue(1);
      setLValue(null);
      return;
    }
    if (currentUrl.includes('/howitworks')) {
      if (rValue !== 0) setRValue(0);
      setLValue(null);
      return;
    }
    if (!currentUrl.includes('/products')) {
      setRValue(null);
      setLValue(null);
      return;
    }
    if (currentUrl.includes('/products')) {
      setRValue(null);
      setLValue(0);
      return;
    }
  }, [window.location.pathname]);

  const handleLChange = (event, newValue) => {
    setLValue(newValue);  
    setRValue(null);

    // if (newValue === 'sale' || newValue === 'products') {
    if (newValue === 'products') {
      navigate('/registeration');
      // navigate(`/${newValue}`);
      // navigate(0);
    }

    // ! Check to remove or not
    const selectedCat = newValue?.split('=')[1];
    setOpenSubCategories(categories.filter((cat) => cat.id == selectedCat)[0]);
  };
  const handleRChange = (event, newValue) => {
    setRValue(newValue);
    setLValue(null);
    if (newValue === 1) {
      return navigate('/registeration');
      // if (user) return navigate('/listing/create');
      // else dispatch(authSlice.actions.showNotLoggedInToast(true));
    }
    if (newValue === 0) {
      return navigate('/registeration');
      // return navigate('/howitworks');
    }
    navigate('/registeration');

    // navigate('/products');
  };

  useEffect(() => {
    if (categories === null || categories?.length === 0)
      dispatch(getAllCategories());
  }, [categories]);

  return (
    <AppBar position='static' sx={{ backgroundColor: 'transparent' }}>
      <Typography
        variant='p'
        component='div'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          flexGrow: 1,
          // backgroundColor: 'transparent',
          backgroundColor: '#686A6D',
          textAlign: 'center',
          textTransform: 'uppercase',
        }}
      >
        <LocalShippingOutlinedIcon />
        Free shipping for orders over $50
      </Typography>
      <Container>
        <Toolbar
          onMouseEnter={() => {
            setOpenSubCategories([]);
          }}
          disableGutters
          sx={{
            backgroundColor: 'transparent',
            justifyContent: 'space-between',
            gap: { xs: 2, sm: 4 },
          }}
        >
          <Box display='flex' alignItems='center' gap={1}>
            <Box
              sx={{
                display: { xs: 'block', md: 'none', alignSelf: 'baseline' },
              }}
            >
              <NavDrawer />
            </Box>
            <Logo />
          </Box>
          <Box sx={{ flex: 1, display: { xs: 'none', md: 'flex' } }}>
            <SearchBar />
            {/* <Search>
            <SearchIconWrapper>
              <SearchIcon color='secondary' sx={{ color: '#475569' }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search'
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          </Box>

          <Box display='flex' gap={1}>
            {user ? (
              <>
                <AccountMenu user={user} />
                <IconButton
                  sx={{ color: '#000' }}
                   onClick={() => navigate('/myaccount/mylikes')}
                   // onClick={() => navigate('/registeration')}
                >
                  <Badge
                    badgeContent={`${favorites?.length || 0}`}
                    color='primary'
                  >
                    <FavoriteBorderOutlinedIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  sx={{ color: '#000' }}
                 // onClick={() => navigate('/registeration')}
                   onClick={() => navigate('/cart')}
                >
                  <Badge
                    badgeContent={`${cart?.cartItems?.length || 0}`}
                    color='primary'
                  >
                    <CartIcon />
                  </Badge>
                </IconButton>
              </>
            ) : (
              <IconButton
                sx={{ color: '#000' }}
                onClick={() => {
                  navigate('/login');
                }}
                // onClick={() => {
                //   navigate('/login');
                // }}
              >
                <UserIcon />
                <LoginText>Log in</LoginText>
              </IconButton>
            )}
          </Box>
        </Toolbar>
        <Toolbar
          disableGutters
          sx={{
            color: '#000',
            backgroundColor: 'transparent',
            justifyContent: 'space-between',
            display: { xs: 'none', md: 'flex' },
          }}
        >
          {' '}
          <LTabs
            value={lValue}
            onChange={handleLChange}
            sx={{ flexGrow: 1 }}
            variant='scrollable'
            scrollButtons
            allowScrollButtonsMobile
          >
            <LTab
              label='NEW ARRIVALS'
              value={'products'}
              onClick={()=>navigate('/products')}
              onMouseEnter={() => {
                setOpenSubCategories([]);
              }}
            />
            {categories?.map((cat) => (
              
              <LTab
                onClick={() => {
                  navigate('/registeration');
                  // navigate('/intermediary?category=' + cat.label.toLowerCase());
                  // navigate(0);
                }}
                id='1'
                label={cat.label.toUpperCase()}
                value={`products?category=${cat.id}`}
                onMouseEnter={() => {
                  setOpenSubCategories(
                    categories.filter(
                      (catFilter) =>
                        catFilter.label.toLowerCase() ===
                        cat.label.toLowerCase()
                    )[0]
                  );
                }}
                onWheel={() => {
                  setOpenSubCategories([]);
                }}
              />
            ))}
          </LTabs>
          <Toolbar sx={{ justifyContent: 'flex-end' }}>
            <RTabs
              value={rValue}
              onChange={handleRChange}
              variant='scrollable'
              scrollButtons
              allowScrollButtonsMobile
            >
              <RTab label='HOW IT WORKS' />
              <RTab label='SELL WITH US' />
              <RTab label='BRIDAL COLLECTION' />
            </RTabs>
          </Toolbar>
        </Toolbar>{' '}
      </Container>{' '}
      {openSubCategories?.subCategories?.length > 0 &&
        openSubCategories?.subCategories && (
          <Box
            position='fixed'
            zIndex='100'
            top='153px'
            bgcolor='#fff'
            display='flex'
            flexWrap='wrap'
            rowGap='1rem'
            width='100%'
            paddingLeft='5%'
            pt={1}
            py={3}
            sx={{
              minWidth: '100%',
              height: '-webkit-fill-available',
              overflowY: 'auto',
            }}
            onMouseEnter={() => {}}
            onMouseLeave={() => {
              setOpenSubCategories([]);
            }}
          >
            {[...openSubCategories?.subCategories]
              ?.sort((a, b) => a.label.localeCompare(b.label))
              ?.map((cat) =>
                cat.parent_subcategory === null ? (
                  <Box
                    display='flex'
                    flexDirection='column'
                    width='200px'
                    padding='10px'
                    sx={{ minWidth: 'max-content', height: 'fit-content' }}
                    height={'100%'}
                  >
                    <Typography variant='h5' fontWeight='500' color='#6a6865'>
                      {cat.label}
                    </Typography>
                    <Divider />

                    {[...openSubCategories?.subCategories]
                      .filter(
                        (children) =>
                          children?.parent_subcategory?.id === cat.id
                      )
                      .sort((a, b) => a.label.localeCompare(b.label))
                      .map((subcat) => (
                        <Box
                          onClick={() => {
                            navigate('/registeration');
                            // navigate(
                            //   `/products/?category=${openSubCategories.id}&sub_category=${subcat.id}`
                            // );
                            // navigate(0);
                          }}
                        >
                          <Typography
                            variant='h6'
                            fontWeight='500'
                            marginTop='4px'
                            color='#6a6865'
                            sx={{
                              cursor: 'pointer',
                              '&:hover': {
                                color: (theme) => theme.palette.error.main,
                              },
                            }}
                          >
                            {subcat.label}
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                ) : (
                  <></>
                )
              )}
          </Box>
        )}
      <CommingSoonModal
        open={openSaleModal}
        onClose={() => setOpenSaleModal(false)}
      />
    </AppBar>
  );
}

export default Header;

function CommingSoonModal(props) {
  const { onClose, open } = props;

  return (
    <Dialog fullWidth onClose={onClose} open={open}>
      <div style={{ padding: '5px' }}>
        <div style={{ position: 'relative' }}>
          <img src={CommingSoon} />
        </div>
        <span
          onClick={onClose}
          style={{
            borderRadius: '50%',
            position: 'absolute',
            top: 10,
            right: 20,
            opacity: '0.75',
            color: 'black',
            cursor: 'pointer',
          }}
        >
          X
        </span>
      </div>
    </Dialog>
  );
}
