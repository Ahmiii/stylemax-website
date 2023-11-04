import { Box, styled } from '@mui/material';
import React from 'react';
import Container from '../components/common/Container';
import CustomTypo from '../components/common/CustomTypo';
import Page from '../components/common/Page';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InlineLink from '../components/common/Link';

const GuideToStyleMax = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Page title='StyleMax | Guide To StyleMax'>
      <Container>
        <CustomTypo
          fontFamily='KoHo'
          variant='h3'
          sx={{ textAlign: 'center', mb: 1 }}
        >
          Guide To StyleMax
        </CustomTypo>
        <CustomTypo fontFamily='KoHo' variant='h5' sx={{ textAlign: 'center' }}>
          Best Tips for Sellers
        </CustomTypo>

        <Box mt={3} maxWidth='800px' marginInline='auto'>
          <Accordion
            defaultExpanded={true}
            // expanded={expanded === 'panel1'}
            // onChange={handleChange('panel1')}
          >
            <AccordionSummaryExt
              expandIcon={
                expanded && expanded === 'panel1' ? (
                  <RemoveIcon sx={{ color: '#fff' }} />
                ) : (
                  <AddIcon sx={{ color: '#fff' }} />
                )
              }
              aria-controls='panel1bh-content'
              id='panel1bh-header'
            >
              <Typography variant='subtitle1' sx={{ flexShrink: 0 }}>
                Tell the truth and be honest
              </Typography>
            </AccordionSummaryExt>
            <AccordionDetailsExt>
              <Typography variant='body1'>
                Honesty is the best policy and it starts from the listing of
                your items. Take multiple original well-lit photos, write a
                clear description with as much as possible and be open and
                accurate about any flaws.
                <br />
                <br />
                Keep in mind that buyers can report any issues for purchased
                item once they receive it, so it is crucial to have complete
                honesty about your items on origins, condition, quality, color,
                size and defects.
              </Typography>
            </AccordionDetailsExt>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummaryExt
              expandIcon={
                expanded && expanded === 'panel2' ? (
                  <RemoveIcon sx={{ color: '#fff' }} />
                ) : (
                  <AddIcon
                    sx={{
                      color: '#fff',
                    }}
                  />
                )
              }
              aria-controls='panel2bh-content'
              id='panel2bh-header'
            >
              <Typography variant='subtitle1' sx={{ flexShrink: 0 }}>
                Sell what you can ship
              </Typography>
            </AccordionSummaryExt>
            <AccordionDetailsExt>
              <Typography variant='body1'>
                It happens some time you already sold your item elsewhere (or
                reserved for someone) is still listed on the Stylemax.
                Unfortunately, this means that a hopeful buyer could snap it up
                and end up disappointed. Cancelled sales will negatively impact
                your seller status. It only takes a click removing items that
                are no longer available to sell and makes better reputation for
                you.
              </Typography>
            </AccordionDetailsExt>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummaryExt
              expandIcon={
                expanded && expanded === 'panel3' ? (
                  <RemoveIcon sx={{ color: '#fff' }} />
                ) : (
                  <AddIcon
                    sx={{
                      color: '#fff',
                    }}
                  />
                )
              }
              aria-controls='panel3bh-content'
              id='panel3bh-header'
            >
              <Typography variant='subtitle1' sx={{ flexShrink: 0 }}>
                Think seasonality
              </Typography>
            </AccordionSummaryExt>
            <AccordionDetailsExt>
              <Typography variant='body1'>
                To sell your items quickly make sure to sell them at a right
                season. You may not have great success trying to sell boots in
                summer, so select the right moment.
              </Typography>
            </AccordionDetailsExt>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummaryExt
              expandIcon={
                expanded && expanded === 'panel4' ? (
                  <RemoveIcon sx={{ color: '#fff' }} />
                ) : (
                  <AddIcon
                    sx={{
                      color: '#fff',
                    }}
                  />
                )
              }
              aria-controls='panel4bh-content'
              id='panel4bh-header'
            >
              <Typography variant='subtitle1' sx={{ flexShrink: 0 }}>
                Price wisely
              </Typography>
            </AccordionSummaryExt>
            <AccordionDetailsExt>
              <Typography variant='body1'>
                It’s all about balancing money and selling on time. You want to
                get the most money for your item possible but at the same time
                you also want to ensure it sells fast. Check out similar items
                on stylemax listing and take a note of those that have sold and
                those that haven’t.
              </Typography>
            </AccordionDetailsExt>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummaryExt
              expandIcon={
                expanded && expanded === 'panel5' ? (
                  <RemoveIcon sx={{ color: '#fff' }} />
                ) : (
                  <AddIcon
                    sx={{
                      color: '#fff',
                    }}
                  />
                )
              }
              aria-controls='panel5bh-content'
              id='panel5bh-header'
            >
              <Typography variant='subtitle1' sx={{ flexShrink: 0 }}>
                Ship it fast
              </Typography>
            </AccordionSummaryExt>
            <AccordionDetailsExt>
              <Typography variant='body1'>
                All items sold on stylemax need to be shipped within 3 days of
                purchase, or the sale will be automatically cancelled - so it
                pays to be speedy shipper. When you have made a sale via direct
                shipping you will be sending the items directly to your buyer.
                Take care over the packaging and don’t hesitate to send a
                friendly note in the parcel to make someone’s day.
              </Typography>
            </AccordionDetailsExt>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummaryExt
              expandIcon={
                expanded && expanded === 'panel6' ? (
                  <RemoveIcon sx={{ color: '#fff' }} />
                ) : (
                  <AddIcon
                    sx={{
                      color: '#fff',
                    }}
                  />
                )
              }
              aria-controls='panel6bh-content'
              id='panel6bh-header'
            >
              <Typography variant='subtitle1' sx={{ flexShrink: 0 }}>
                Stay connect
              </Typography>
            </AccordionSummaryExt>
            <AccordionDetailsExt>
              <Typography variant='body1'>
                Respond promptly to the buyers post requesting info about an
                item that they are interested. Speedy responses can mean speedy
                sales.
              </Typography>
            </AccordionDetailsExt>
          </Accordion>{' '}
          <Accordion defaultExpanded={true}>
            <AccordionSummaryExt
              expandIcon={
                expanded && expanded === 'panel6' ? (
                  <RemoveIcon sx={{ color: '#fff' }} />
                ) : (
                  <AddIcon
                    sx={{
                      color: '#fff',
                    }}
                  />
                )
              }
              aria-controls='panel6bh-content'
              id='panel6bh-header'
            >
              <Typography variant='subtitle1' sx={{ flexShrink: 0 }}>
                How To Sell on StyleMax
              </Typography>
            </AccordionSummaryExt>
            <AccordionDetailsExt>
              <Typography variant='body1'>
                More Content to be added here. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Iure, reprehenderit ab. Placeat
                soluta expedita omnis.
              </Typography>
            </AccordionDetailsExt>
          </Accordion>
        </Box>
      </Container>
    </Page>
  );
};

const AccordionDetailsExt = styled(AccordionDetails)(({ theme }) => ({
  background: theme.palette.grey[100],
}));

const AccordionSummaryExt = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
}));

export default GuideToStyleMax;
