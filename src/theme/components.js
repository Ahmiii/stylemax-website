import palette from './palette';

const components = {
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        backgroundColor: '#fff',
      },
      notchedOutline: {
        borderColor: palette.divider,
        borderWidth: '1px',
        borderRadius: '3px',
      },
      input: {
        fontFamily: "'Jost', sans-serif",
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        fontWeight: 400,
        fontFamily: 'Inter, san-serif',
        '&:hover,&:active': {
          boxShadow: 'none',
        },
      },
      startIcon: {
        marginRight: 0,
      },
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: {
        color: '#000',
      },
      positionStart: {
        marginRight: 15,
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: 0,
        fontWeight: 400,
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      rounded: {
        borderRadius: 5,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 5,
        height: 'fit-content',
        fontSize: '0.6rem',
        fontWeight: 500,
      },
    },
  },
  // MuiPopover: {
  //   styleOverrides: {
  //     paper: {
  //       // backgroundColor: '#232323',
  //       backgroundColor: palette.primary.main,
  //       color: '#fff',
  //       '& ul': {
  //         paddingBlock: 0,
  //       },
  //       '& li': {
  //         justifyContent: 'center',
  //         minWidth: '100px',
  //         paddingBlock: '8px',
  //         '&:hover': {
  //           backgroundColor: palette.primary.dark,
  //         },
  //       },
  //       '& li:not(:last-of-type)': {
  //         borderBottom: '1px solid #fff',
  //       },
  //     },
  //   },
  // },
  MuiTablePagination: {
    styleOverrides: {
      toolbar: {
        flexDirection: 'row-reverse',
      },
      spacer: {
        display: 'none',
      },
    },
  },
  // MuiDialog: {
  //   styleOverrides: {
  //     paper: {
  //       // maxWidth: 450,
  //       // width: 450,
  //     },
  //   },
  // },
  // MuiDialogContent: {
  //   styleOverrides: {
  //     root: {
  //       paddingInline: 40,
  //     },
  //   },
  // },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        paddingBlock: '20px',
        justifyContent: 'center',
      },
    },
  },

  //   Mui: {
  //     styleOverrides: {
  //       focused: {
  //         borderColor: 'transparent',
  //       },
  //     },
  //   },
};

export default components;
