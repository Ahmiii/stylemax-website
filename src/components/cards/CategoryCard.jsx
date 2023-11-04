import { Typography, Card, CardContent, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import { extendQueryParams } from '../../utils/filterMethods';
import { remoteUrl } from '../../api';

function CategoryCard(props) {
  const MyButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#535C3D',
    color: '#fff',
    fontFamily: 'Jost',
    borderRadius: '20px',
    padding: '5px 50px',
    fontSize: '20px',
    fontWeight: '500',
    '&:hover': {
      backgroundColor: '#535C3D',
    },
  }));

  const StyledCard = styled(Card)({
    background: `url(${props.imgUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    display: 'flex',
    flexDirection: 'column',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignText: 'center',
    height: props?.height || '440px',
    maxHeight: '700px',
  });

  const navigate = useNavigate();

  return (
    <StyledCard>
      <Typography
        variant='h3'
        component='h2'
        align='center'
        marginBottom={10}
        paddingX={'15px'}
      >
        {props?.title}
        <br />
        {props?.title2}
      </Typography>

      {props?.title2 ? (
        <MyButton
          variant='contained'
          sx={{ marginTop: -6 }}
          onClick={props.handleClick}
        >
          SEE COLLECTION
        </MyButton>
      ) : (
        <MyButton variant='contained' onClick={() => props.handleClick()}>
          SEE COLLECTION
        </MyButton>
      )}
    </StyledCard>
  );
}

// CategoryCard.propTypes = {
//   title: PropTypes.string,
//   title2: PropTypes.string,
//   imgUrl: PropTypes.string,
//   height: PropTypes.number,
//   category: PropTypes.string,
//   subcategory: PropTypes.string,
// };

export default CategoryCard;
