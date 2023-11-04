import { Box, Button, Popover, styled } from '@mui/material';

export const ContentWrapper = styled(Box)(({ theme }) => ({
  maxHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  overflowY: 'auto',
  // borderBottom: `1px solid ${theme.custom.lightBack}`,
}));

export const MenuButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.custom.menuBtnLight,
  borderRadius: 25,
  color: '#000',
  '&:hover': {
    backgroundColor: theme.custom.menuBtnSelec,
  },
}));

export const PopoverExt = styled(Popover)(({ theme }) => ({
  '& .MuiPopover-paper': {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    paddingBlock: '1rem',
    maxWidth: '270px',
    overflow: 'hidden',
    '& > div': {
      paddingInline: '1rem',
    },
  },
}));

export const ButtonDefault = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  '&:hover': {
    backgroundColor: theme.palette.grey[400],
  },
}));
