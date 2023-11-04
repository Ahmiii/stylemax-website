import PropTypes from 'prop-types';
import { useMemo } from 'react';
import shape from './shape';
import palette from './palette';
import shadows from './shadows';
import typography from './typography';
import breakpoints from './breakpoints';
import GlobalStyles from './globalStyles';
import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import components from './components';

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node,
};

export default function ThemeConfig({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      components,
      shadows,
      breakpoints,
      customShadows: {
        primary: '0px 15px 22px 2px rgba(0,0,0,0.02)',
      },
      custom: {
        olive: '#535C3D',
        red: {
          light: '#ba4941',
          main: '#a91c12',
          dark: '#87160e',
        },
        cherryRed: '#EB5757',
        lightBack: '#F1F1F1',
        inputBack: '#F6F6F6',
        menuBtnLight: '#f1f5f9',
        menuBtnSelec: '#e2e8f0',
      },
    }),
    []
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
