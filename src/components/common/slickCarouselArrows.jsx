import { Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const common = {
  background: (theme) => `${theme.palette.secondary.main} !important`,
  borderRadius: '50%',
  zIndex: 22,
  display: 'flex !important',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 2,
  width: '35px !important',
  height: '35px !important',

  '&:before': {
    display: 'none',
  },
  '& svg': {
    color: '#fff',
  },
};

export const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      sx={{
        ...common,
        right: props?.right || '1% !important',
      }}
      onClick={onClick}
    >
      <ArrowForwardIcon />
    </Box>
  );
};

export const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      sx={{
        ...common,
        left: props?.left || '1% !important',
      }}
      onClick={onClick}
    >
      <ArrowBackIcon />
    </Box>
  );
};
