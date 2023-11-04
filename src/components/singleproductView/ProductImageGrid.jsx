import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  styled,
} from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import API_URL, { END_POINTS } from '../../config';
import ShareListing from '../../dialogs/ShareListing';
import axios from 'axios';
import { CommentsContainer } from '../common/CommentsContainer';
import { useDispatch } from 'react-redux';
import { getMyFav } from '../../store/slices/favourite/extraReducers';
// import { ShareDialog } from './ShareListing';

const ProductImageGrid = ({
  images,
  prodId,
  likeCommentsShares,
  getProduct,
  isLiked,
}) => {
  const [currentImg, setCurrentImg] = useState(`${API_URL}${images[0]}`);
  const [isDialogOpen, toggleDialogOpen] = useState(false);
  const [open, setOpen] = useState(null);
  const [alertType, setAlertType] = useState({ severity: '', text: '' });

  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentImg(`${API_URL}${images[0]}`);
  }, [prodId, images]);

  const toggleInput = () => {
    toggleDialogOpen((st) => !st);
  };

  const handleLikeSubmit = (isLiked) => {
    if (
      JSON.parse(localStorage.getItem('userData'))?.access_token &&
      !isLiked
    ) {
      axios
        .post(
          API_URL +
            END_POINTS.like +
            `/?access_token=${
              JSON.parse(localStorage.getItem('userData'))?.access_token
            }`,
          { product_id: prodId }
        )
        .then((res) => {
          setOpen(true);
          setAlertType({ severity: 'success', text: 'Product liked!' });
          getProduct(prodId);
          dispatch(getMyFav());
        })
        .catch((e) => {
          setOpen(true);
          if (e.response.status === 400)
            setAlertType({
              severity: 'error',
              text: e.response.data.message,
            });
        });
    } else if (
      JSON.parse(localStorage.getItem('userData'))?.access_token &&
      isLiked
    ) {
      axios
        .delete(
          API_URL +
            END_POINTS.like +
            `/?access_token=${
              JSON.parse(localStorage.getItem('userData'))?.access_token
            }`,
          { product_id: prodId }
        )
        .then((res) => {
          setOpen(true);
          setAlertType({ severity: 'success', text: 'Product Disliked' });
          getProduct(prodId);
          dispatch(getMyFav());
        })
        .catch((e) => {
          setOpen(true);
          if (e.response.status === 400)
            setAlertType({
              severity: 'error',
              text: e.response.data.message,
            });
        });
    } else {
      setOpen(true);
      setAlertType({
        severity: 'error',
        text: 'Please sign in to add like',
      });
    }
  };
  const handleShareSubmit = () => {
    if (JSON.parse(localStorage.getItem('userData')).access_token) {
      axios
        .post(
          API_URL +
            END_POINTS.share +
            `/?access_token=${
              JSON.parse(localStorage.getItem('userData')).access_token
            }`,
          { product_id: prodId }
        )
        .then((res) => {
          setOpen(true);
          setAlertType({ severity: 'success', text: 'Product Shared!' });
          toggleDialogOpen(false);
          getProduct(prodId);
        })
        .catch((e) => {
          setOpen(true);
          setAlertType({
            severity: 'error',
            text: 'Something went down at the server',
          });
        });
    } else {
      setOpen(true);
      setAlertType({
        severity: 'error',
        text: 'Please sign in to add share',
      });
    }
  };

  return (
    <Box width='100%'>
      <Collapse in={open !== null}>
        <Alert severity={alertType.severity}>{alertType.text}</Alert>
      </Collapse>

      <GridExt container spacing={1.5}>
        <Grid item xs={12} sm={3}>
          <Box
            display='flex'
            flexDirection='column'
            alignItems='stretch'
            gap={1.5}
            sx={{ flexDirection: { xs: 'row', sm: 'column' } }}
          >
            {images.map(
              (el, ind) =>
                ind <= 4 && (
                  <Card
                    key={ind}
                    sx={{
                      boxShadow: 'none',
                      borderRadius: 1,
                      flexBasis: { xs: '25%', sm: '50%' },
                      overflowX: 'auto',
                    }}
                  >
                    <CardMedia
                      // className={classes.cardMediaSm}
                      image={API_URL + el}
                      data-image={API_URL + el}
                      sx={{
                        cursor: 'pointer',
                        height: { xs: '100px', sm: '145px' },
                        backgroundSize: 'contain',
                      }}
                      onClick={() => {
                        setCurrentImg(`${API_URL}${el}`);
                      }}
                    />
                  </Card>
                )
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Card sx={{ boxShadow: 'none', borderRadius: 1 }}>
            <CardMedia
              //   className={classes.cardMedia}
              image={currentImg}
              data-image={currentImg}
              sx={{
                cursor: 'pointer',
                height: '100%',
                minHeight: '615px',
                backgroundSize: 'contain',
              }}
            />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Box display='flex' alignItems='center' gap={2} justifyContent='end'>
            <ButtonExt
              startIcon={<FavoriteBorderIcon />}
              color={isLiked ? 'error' : 'secondary'}
              size='large'
              disableRipple
              onClick={() => handleLikeSubmit(isLiked)}
            >
              Like
            </ButtonExt>
            <ButtonExt
              startIcon={
                <ChatBubbleOutlineOutlinedIcon
                // fontSize='small'
                // sx={{ fontSize: '1px !important', backgroundColor: 'black' }}
                />
              }
              color='secondary'
              size='small'
              disableRipple
            >
              Comment
            </ButtonExt>
            <ButtonExt
              startIcon={<ShareIcon />}
              color='secondary'
              size='large'
              disableRipple
              onClick={toggleInput}
            >
              Share
            </ButtonExt>
          </Box>
        </Grid>
        {
          <CommentsContainer
            likeCommentsShares={likeCommentsShares}
            getProduct={getProduct}
            prodId={prodId}
          />
        }
      </GridExt>
      <ShareListing
        open={isDialogOpen}
        toggleDialog={toggleInput}
        prodId={prodId}
        prodImg={currentImg}
        handleListItemSubmit={handleShareSubmit}
      />
    </Box>
  );
};

const GridExt = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
  },
}));

const ButtonExt = styled(Button)(({ theme }) => ({
  fontFamily: 'Koho',
  fontSize: '1.2rem',
  '& svg': {
    marginRight: '0.5rem',
  },
  '& *': {
    fontSize: '1.7rem !important',
  },
}));

ProductImageGrid.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ProductImageGrid;
