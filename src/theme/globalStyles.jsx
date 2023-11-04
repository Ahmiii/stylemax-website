import { GlobalStyles as MUIGlobalStyles } from '@mui/material';

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={{
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        html: {
          width: '100vw',
          height: '100vh',
          '-ms-text-size-adjust': '100%',
          '-webkit-overflow-scrolling': 'touch',
        },
        body: {
          width: '100%',
          height: '100vh',
        },
        '#root': {
          width: '100%',
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        },
        // a: {
        //   textDecoration: 'none',
        //   color: 'inherit',
        // },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: { display: 'block', maxWidth: '100%' },
        '.textUppercase': {
          textTransform: 'uppercase',
        },
      }}
    />
  );

  return inputGlobalStyles;
}
