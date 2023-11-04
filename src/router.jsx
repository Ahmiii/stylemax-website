import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loadable from './components/common/Loadable';

import LayoutMain from './layout/LayoutMain';

import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import Login from './pages/Login';
import HomePage from './pages';
import ProductDetails from './pages/ProductDetails';
import CreateListing from './pages/CreateListing';
import Basket from './pages/Basket';
import Checkout from './pages/Checkout';
import ProductListing from './pages/ProductListing';
import FullPageLoader from './components/loader/FullPageLoader';
import { getMe, getShippingDetails } from './store/slices/auth/extraReducers';

import ShippingDelivery from './pages/ShippingDelivery';
import ReturnPolicy from './pages/ReturnPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import GuideToStylemax from './pages/Faq';
import ContactUs from './pages/ContactUs';
import HowItWorks from './pages/HowItWorks';
import AboutUs from './pages/AboutUs';
import VerifyEmail from './pages/VerifyEmail';
import ResetPassword from './pages/ResetPassword';
import BuyerProtectionPolicy from './pages/BuyerProtectionPolicy';
import CategoryShowcase from './pages/CategoryShowcase';
import { getAllBrands } from './store/slices/brand/extraReducers';
import MyAccount from './pages/MyAccount';
import UserProfile from './components/dashboard/UserProfile';
import SaleItems from './components/dashboard/SaleItems';
import MyPurchases from './components/dashboard/MyPurchases';
import MyLikes from './components/dashboard/MyLikes';
import MySales from './components/dashboard/MySales';
import ClosetInsights from './components/dashboard/ClosetInsights';
import MyBalance from './components/dashboard/MyBalance';
import MySaleReport from './components/dashboard/MysaleReport';
import InventoryReport from './components/dashboard/InventoryReport';
import { getMyFav } from './store/slices/favourite/extraReducers';
import { getCart } from './store/slices/cart/extraReducers';
import InviteFriend from './components/dashboard/InviteFriends';
import OrderDetails from './components/dashboard/OrderDetails';
import PromoRegisteration from './pages/PromotionRegisteration';

const Router = () => {
  const dispatch = useDispatch();
  const { authenticating, user } = useSelector((st) => st.auth);

  useEffect(() => {
    dispatch(getMe()).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(getShippingDetails());
        dispatch(getMyFav());
        dispatch(getCart());
      }
    });
    dispatch(getAllBrands());
  }, []);

  if (authenticating) return <FullPageLoader />;

  return (
    <Routes>
      <Route path='registeration' element={<PromoRegisteration />} />
      <Route path='/' element={<LayoutMain />}>
        {/* <Route path='/' element={<Navigate to='/' />} /> */}
        <Route path='' element={<HomePage />} />
        <Route path='intermediary' element={<CategoryShowcase />} />
        <Route path='products' element={<ProductListing />} />
        <Route path='product/:id' element={<ProductDetails />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='forgotpassword' element={<ForgotPassword />} />
        <Route path='verify-email' element={<VerifyEmail />} />
        <Route path='shipping-delivery' element={<ShippingDelivery />} />
        <Route path='return-policy' element={<ReturnPolicy />} />
        <Route path='privacy-policy' element={<PrivacyPolicy />} />
        <Route path='terms-conditions' element={<TermsConditions />} />
        <Route path='guidetostylemax' element={<GuideToStylemax />} />
        <Route
          path='buyerprotectionpolicy'
          element={<BuyerProtectionPolicy />}
        />
        <Route path='contactus' element={<ContactUs />} />
        <Route path='howitworks' element={<HowItWorks />} />
        <Route path='aboutus' element={<AboutUs />} />
        <Route path='reset-password' element={<ResetPassword />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='myaccount' element={<MyAccount />}>
          <Route path='' element={<UserProfile />} />
          <Route path='mysaleItems' element={<SaleItems />} />
          <Route path='mypurchases' element={<MyPurchases />} />
          <Route path='mylikes' element={<MyLikes />} />
          <Route path='mysales' element={<MySales />} />
          <Route path='mysales/:id' element={<OrderDetails />} />
          <Route path='closetinsight' element={<ClosetInsights />} />
          <Route path='mybalance' element={<MyBalance />} />
          <Route path='salereport' element={<MySaleReport />} />
          <Route path='inventoryreport' element={<InventoryReport />} />
          <Route path='invitefriend' element={<InviteFriend />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>

        {user ? (
          <Route>
            <Route path='cart' element={<Basket />} />
            <Route path='listing/create' element={<CreateListing />} />
          </Route>
        ) : (
          <Route path='*' element={<Navigate to='/' replace />} />
        )}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  );
};

export default Router;
