import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project import
import Logo from './Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => (
  <ButtonBase disableRipple component={Link} to={!to ? '/' : to} sx={sx}>
    <Logo />
  </ButtonBase>
);

export default LogoSection;
