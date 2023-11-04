import {
  Alert,
  Box,
  Button,
  Collapse,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import API_URL, { END_POINTS } from '../../config';

export function CommentsContainer({ likeCommentsShares, getProduct, prodId }) {
  const [commentInput, setCommentInput] = useState('');
  const [alertType, setAlertType] = useState({ severity: '', text: '' });

  const access_token = JSON.parse(
    localStorage.getItem('userData')
  )?.access_token;

  const postAComment = () => {
    if (access_token) {
      axios
        .post(
          API_URL + END_POINTS.comments,
          {
            comment: commentInput,
            product_id: prodId,
          },
          { params: { access_token } }
        )
        .then((res) => {
          setCommentInput('');
          getProduct(prodId);
        });
    } else
      setAlertType({
        severity: 'error',
        text: 'Please signin to comment on product',
      });
  };

  const renderComment = (comment) => {
    const today = new Date();
    let difference = today.getTime() - new Date(comment.createdAt).getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) - 1;
    return (
      <>
        <Box display='flex' marginTop='10px'>
          <Typography
            color='#b25555'
            variant='p'
            sx={{
              textAlign: { xs: 'center', md: 'unset' },
              marginRight: '20px',
            }}
            minWidth='100px'
          >
            {comment.user.firstName + ' ' + comment.user.lastName}
          </Typography>

          <Typography
            variant='p'
            sx={{
              textAlign: { xs: 'center', md: 'unset' },
            }}
          >
            {comment.comment}
          </Typography>
        </Box>
        <Typography
          color='#8a8a8a'
          variant='p'
          sx={{
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          {TotalDays === 0
            ? 'Today'
            : TotalDays === 1
            ? `${TotalDays} Day ago`
            : `${TotalDays} Days ago`}
        </Typography>
      </>
    );
  };

  return (
    <Box
      width='100%'
      bgcolor='#F5F5F5'
      borderRadius='10px'
      padding='10px 20px 10px 20px'
      marginTop='30px'
    >
      <Box
        minHeight='50px'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <Typography
          variant='p'
          sx={{
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          {likeCommentsShares.likes.length + ' people like this product'}
        </Typography>
        <Box>
          <Typography
            variant='p'
            sx={{
              textAlign: { xs: 'center', md: 'unset' },
              marginRight: '15px',
            }}
          >
            {likeCommentsShares.shares}{' '}
            {likeCommentsShares.shares < 2 ? ' share' : ' shares'}
          </Typography>
          <Typography
            variant='p'
            sx={{
              textAlign: { xs: 'center', md: 'unset' },
            }}
          >
            {likeCommentsShares.comments.length}{' '}
            {likeCommentsShares.comments.length < 2 ? ' comment' : ' comments'}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{ maxHeight: '350px', overflowY: 'auto' }}
        overflow='auto'
        marginTop='10px'
        marginBottom='10px'
      >
        {likeCommentsShares.comments.map((comment) => renderComment(comment))}
      </Box>
      <Divider />
      <Box marginTop='10px'>
        <TextField
          value={commentInput}
          placeholder='Add a comment'
          fullWidth
          sx={{ borderRadius: '8px', marginBottom: '5px' }}
          onChange={(e) => {
            setCommentInput(e.target.value);
          }}
        />
        <Box display='flex' justifyContent='flex-end' mb={2}>
          <Button
            color='primary'
            variant='outlined'
            fullWidth={false}
            onClick={postAComment}
            disabled={commentInput.length === 0}
          >
            Send
          </Button>
        </Box>
        {alertType.severity !== '' && (
          <Collapse in={open !== null}>
            <Alert severity={alertType.severity}>{alertType.text}</Alert>
          </Collapse>
        )}
      </Box>
    </Box>
  );
}
