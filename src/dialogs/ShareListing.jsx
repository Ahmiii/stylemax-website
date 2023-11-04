import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, styled } from '@mui/material';

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  LineShareButton,
  PinterestShareButton,
  TumblrShareButton,
} from 'react-share';
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  RedditIcon,
  LineIcon,
  TumblrIcon,
  PinterestIcon,
} from 'react-share';
import { remoteUrl } from '../api';
import CustomTypo from '../components/common/CustomTypo';
// import prodimg from '../assets/images/slider05.jpg';
import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ShareListing = ({
  open,
  toggleDialog,
  prodId,
  prodImg,
  handleListItemSubmit,
}) => {
  return (
    <DialogExt
      fullWidth={true}
      maxWidth='sm'
      open={open}
      onClose={toggleDialog}
    >
      <DialogTitle align='center' sx={{ position: 'relative' }}>
        Share Listing
        <IconButton
          disableRipple
          sx={{ position: 'absolute', top: 13, left: 13, fontSize: '1.05rem' }}
          onClick={toggleDialog}
        >
          <ArrowBackIosNewIcon
            sx={{ fontSize: '1rem', mr: 0.5, alignSelf: 'baseline' }}
          />{' '}
          Back
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          noValidate
          component='form'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
          }}
        >
          <CustomTypo
            variant='subtitle1'
            fontFamily='Jost'
            sx={{ mt: 2, textAlign: 'center' }}
          >
            Share your listing to your networks to increase exposure and boost
            sales!
          </CustomTypo>
          <Box display='flex' gap={3} mt={3}>
            <Box
              sx={{
                objectFit: 'contain',
                width: '100%',
                maxWidth: '300px',
                maxHeight: '300px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={prodImg} alt='Produst 1' width='80%' height='80%' />
            </Box>
            <Box
              display={'flex'}
              gap={2}
              flexDirection='column'
              justifyContent='center'
            >
              <Box display='flex' gap={3} justifyContent='space-between'>
                <FacebookIcon size={36} round={true} />
                <FacebookShareButton
                  url={`${remoteUrl}/auctionDetails/${prodId}`}
                >
                  <CustomTypo variant='h6' fontFamily='Jost'>
                    Connect Now
                  </CustomTypo>
                </FacebookShareButton>
              </Box>
              <Box display='flex' gap={3} justifyContent='space-between'>
                <TwitterIcon size={36} round={true} />
                <TwitterShareButton
                  url={`${remoteUrl}/auctionDetails/${prodId}`}
                >
                  <CustomTypo variant='h6' fontFamily='Jost'>
                    Connect Now
                  </CustomTypo>
                </TwitterShareButton>
              </Box>

              <Box display='flex' gap={3} justifyContent='space-between'>
                <TumblrIcon size={36} round={true} />
                <TumblrShareButton
                  url={`${remoteUrl}/auctionDetails/${prodId}`}
                >
                  <CustomTypo variant='h6' fontFamily='Jost'>
                    Connect Now
                  </CustomTypo>
                </TumblrShareButton>
              </Box>

              <Box display='flex' gap={3} justifyContent='space-between'>
                <RedditIcon size={36} round={true} />
                <RedditShareButton
                  url={`${remoteUrl}/auctionDetails/${prodId}`}
                >
                  <CustomTypo variant='h6' fontFamily='Jost'>
                    Connect Now
                  </CustomTypo>
                </RedditShareButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          color='info'
          onClick={() => handleListItemSubmit()}
        >
          List this Item
        </Button>
      </DialogActions>
    </DialogExt>
  );
};

const DialogExt = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '4px',
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.secondary.main,
  },
  '& .MuiDialogTitle-root': {
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
  },
}));

const LinkExt = styled(Link)(({ theme }) => ({
  color: `${theme.palette.primary.main} !important`,
  fontFamily: 'inherit',
  textDecoration: 'none',
}));

export default ShareListing;
