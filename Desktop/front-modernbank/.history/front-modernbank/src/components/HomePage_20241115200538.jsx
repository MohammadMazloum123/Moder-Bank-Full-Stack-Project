import { AccountBalanceWalletOutlined, CreditCardOutlined, SavingsOutlined } from '@mui/icons-material';
import {Box, 
        Button,
        Grid2, 
        Typography,
        Card, 
        CardContent, 
        CardHeader, 
        Container,
        LinearProgress,
        } from '@mui/material'
import React from 'react';



const HomePage = () => {
return (
    <>
    <Container maxWidth='lg' sx={{py:8}}>
        {/* header */}
        <Box textAlign="center" mb={6}>
            <Typography variant='h3' component="h1" gutterBottom>
                Welcome To Your Banking Dashboard
            </Typography>
            <Typography variant='h6' color='#64748b' paragraph>
                Manage your finances with ease and security
            </Typography>
            <Button variant='contained' color='primary' size='large'>
                Get Started
            </Button>
        </Box>
        {/* Grid Layout */}
        <Grid2 spacing={4} container>
            {/* Account Balance */}
            <Grid2 item xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader
                    avatar={<AccountBalanceWalletOutlined/>}
                    title="Account Balance"
                    titleTypographyProps={{variant:"subtitle1"}}
                    />
                    <CardContent>
                        <Typography variant='h4' component="div">
                            $5,255.80
                        </Typography>
                        <Typography variant='body2' color='#64748b'>
                            Available Balance
                        </Typography>
                    </CardContent>
                     {/* Recent Transactions */}
                    <Grid2 item xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader
                            avatar={<CreditCardOutlined/>}
                            title="Recent Transactions"
                            titleTypographyProps={{variant:"subtitle1"}}
                            />
                            <CardContent>
                                <Typography variant='body2' paragraph>
                                    Grocery Store - $85.20
                                </Typography>
                                <Typography variant='body2' paragraph>
                                    Monthly Rent- $885.20
                                </Typography>
                                <Typography variant='body2'>
                                    Online Shopping - $70.20
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid2>
                    {/* Savings Goal */}
                    <Grid2 item xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader
                            avatar={<SavingsOutlined/>}
                            title="Savings Goal"
                            titleTypographyProps={{variant:"subtitle1"}}
                            />
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" mb={1}>
                                    <Typography variant="h6" component="div">
                                        $3,500
                                    </Typography>
                                    <Typography variant="body2" color="#64748b">
                                        / $5,000
                                    </Typography>
                                </Box>
                                <LinearProgress variant="determinate" value={70} sx={{ height: 8, borderRadius: 4 }} />
                                <Typography variant="body2" color="text.secondary" mt={1}>
                                    Vacation Fund
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid2>
                </Card>
            </Grid2>
        </Grid2>
    </Container>
    </>
)
}

export default HomePage
