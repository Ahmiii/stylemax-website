import MainCard from 'components/MainCard';
import React from 'react';
import { Grid } from '@mui/material/index';
import { Box } from '@mui/material/index';
import { Card, CardMedia } from '@mui/material/index';
import ChipLabel from 'components/ChipLabel/index';
import { Typography } from '@mui/material/index';
import { Rating } from '@mui/material/index';
import { faker } from '@faker-js/faker';
import { Comments } from './prodData';
import UserComment from 'components/comment/index';

const ViewProduct = () => {
    const inStock = false;
    return (
        <MainCard sx={{ mt: 2, padding: '30px' }} content={false}>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                    {/* <Box
                        width="100%"
                        height="300px"
                        borderRadius="10px"
                        sx={{
                            backgroundImage: "url('https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1')",
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                            // ...(user?.image && {
                            //     backgroundImage: `url('/assets/images/users/avatar-1.png')`,
                            //     // backgroundImage: `url('${user?.image}')`,
                            //     backgroundSize: 'contain',
                            //     backgroundRepeat: 'no-repeat',
                            //     backgroundPosition: 'center'
                            // }),
                            // ...(!user?.image && {
                            //     backgroundColor: (theme) => theme.custom.lightBack
                            // })
                        }}
                    /> */}
                    <Card sx={{ boxShadow: 'none', borderRadius: 1 }}>
                        <CardMedia
                            image="https://api-prod-minimal-v4.vercel.app/assets/images/products/product_5.jpg"
                            data-image="https://api-prod-minimal-v4.vercel.app/assets/images/products/product_5.jpg"
                            style={{ cursor: 'pointer', backgroundSize: 'cover', height: '300px', borderRadius: '15px' }}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box height="100%" py={1} display="flex" gap={3} flexDirection="column">
                        <ChipLabel
                            color={inStock ? 'success' : 'error'}
                            sx={{ fontSize: '1rem', padding: '0.75rem !important', width: 'fit-content' }}
                        >
                            {inStock ? 'In Stock' : 'Out Of Stock'}
                        </ChipLabel>
                        <Typography variant="h4">Nike Air Force 1 NDESTRUKT</Typography>
                        {/* <Box display="flex" gap={2}>
                            <Rating name="read-only" precision={0.5} value="4" readOnly />
                            <Typography variant="body1">(275 reviews)</Typography>
                        </Box> */}

                        <Box display="flex" gap={1} flexDirection="column">
                            <Box display="flex" gap={1} justifyContent="space-between">
                                <Box display="flex" gap={0.5} flexDirection="column">
                                    <Box>
                                        <Typography variant="h3" component="span">
                                            4
                                        </Typography>{' '}
                                        <Typography variant="h4" component="span" color="secondary">
                                            /5
                                        </Typography>
                                    </Box>
                                    <Typography variant="subtitle1" color="secondary">
                                        Based on 275 reviews
                                    </Typography>
                                    <Rating name="read-only" precision={0.5} value={4} readOnly fontSize="large" />
                                </Box>
                            </Box>
                        </Box>

                        <Box display="flex" gap={1}>
                            <Typography variant="h3" color="secondary" sx={{ textDecoration: 'line-through' }}>
                                $16.19
                            </Typography>
                            <Typography variant="h3">$12.19</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Box my={3} display="flex" gap={1} flexDirection="column">
                <Typography variant="subtitle1">Description</Typography>
                <Typography variant="body2">{faker.lorem.paragraph(8)}</Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap={2}>
                {Comments.map((el) => (
                    <UserComment key={el._id} comment={el} />
                ))}
            </Box>
        </MainCard>
    );
};

export default ViewProduct;
