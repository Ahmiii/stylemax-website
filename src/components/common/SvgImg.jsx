import { styled } from '@mui/material';
import React from 'react';
import { ReactSVG } from 'react-svg';

const SvgImg = ({ width, height, src, maxWidth }) => {
  return (
    <IconRoot
      width='100%'
      height='inherit'
      sx={{ ...(maxWidth && { maxWidth }) }}
    >
      <ReactSVG src={src} />
    </IconRoot>
  );
};

export const IconRoot = styled('div', {
  shouldForwardProp: (props) => props !== 'width' && props !== 'height',
})(({ width, height }) => ({
  height: '100%',
  '& div': {
    height: height ? height : 22,
    objectFit: 'contain',
  },
  '& svg': {
    fontSize: 'unset',
    width: width ? width : 22,
    height: height ? height : 22,
  },
}));

export default SvgImg;
