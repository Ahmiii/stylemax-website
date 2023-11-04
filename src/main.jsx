import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';

import store from './store';
import { Provider as StoreProvider } from 'react-redux';
import './assets/third-party/apex-chart.css';

import 'react-toastify/dist/ReactToastify.css';
import ThemeConfig from './theme';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreProvider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeConfig>
          <App />
          <ToastContainer
            position='top-right'
            autoClose={2000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme='light'
          />
        </ThemeConfig>
      </BrowserRouter>
    </HelmetProvider>
  </StoreProvider>
);
