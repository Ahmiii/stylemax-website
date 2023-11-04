// import { alpha } from '@material-ui/core/styles';

import { alpha } from '@mui/material';

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12), //
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const PRIMARY = {
  light: '#3f4555',
  main: '#0F172A',
  dark: '#030508',
  contrastText: '#fff',
};
const SECONDARY = {
  light: '#a4a6a7',
  main: '#686a6d',
  dark: '#3e4041',
  contrastText: '#fff',
};
const INFO = {
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  contrastText: '#fff',
};
const SUCCESS = {
  light: '#8ED366',
  main: '#77B255',
  dark: '#6DA14F',
  contrastText: '#fff',
};
const WARNING = {
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  contrastText: GREY[800],
};
const ERROR = {
  light: '#FF0A0A',
  main: '#C90707',
  dark: '#900707',
  contrastText: '#fff',
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const palette = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  gradients: GRADIENTS,
  divider: '#CEC9C9',
  text: { primary: '#000', secondary: '#BFBFBF', disabled: GREY[500] },
  // text: { primary: GREY[800], secondary: '#BFBFBF', disabled: GREY[500] },
  background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
  action: {
    active: GREY[600],
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
