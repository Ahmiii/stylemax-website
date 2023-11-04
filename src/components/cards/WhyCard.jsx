import { Typography, Card, CardContent } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

function WhyCard(props) {
  const StyledCard = styled(Card)({
    background: `url(${props.imgUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '550px',
    width: '100%',
    flex: 1,
    minWidth: '300px',
    maxWidth: '450px',
    padding: '0px 30px 0px 30px',
  });

  // const InnerBox = styled(CardContent)({
  //   position: 'relative',
  //   top: '280px',
  //   borderRadius: '8px',
  //   height: '302px',
  //   // paddingY: "50px",
  //   // marginX: 10,
  //   background: (theme) => '#535C3D',
  //   // backgroundColor: (theme) => `${theme.custom.olive}`,
  //   color: 'white',
  //   opacity: 0.9,
  //   margin: '0 auto',
  // });
  return (
    <StyledCard>
      <InnerBox>
        <Typography variant='h3' component='h2' align='center' gutterBottom>
          {props.title}
        </Typography>
        <Typography
          variant='h6'
          component='span'
          // fontSize={'20px'}
          fontWeight={400}
        >
          {props.description}
        </Typography>
      </InnerBox>
    </StyledCard>
  );
}
const InnerBox = styled(CardContent)(({ theme }) => ({
  position: 'relative',
  top: '230px',
  borderRadius: '8px',
  height: '280px',
  // paddingY: "50px",
  // marginX: 10,
  // background: (theme) => '#535C3D',
  backgroundColor: alpha(theme.custom.olive, 0.7),
  color: 'white',
  opacity: 0.9,
  margin: '0 auto',
}));

WhyCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imgUrl: PropTypes.string,
};

export default WhyCard;
