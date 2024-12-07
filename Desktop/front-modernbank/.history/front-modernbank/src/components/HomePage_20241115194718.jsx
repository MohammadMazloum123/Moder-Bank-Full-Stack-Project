import { AccountBalanceWalletOutlined } from '@mui/icons-material';
import {Box, 
        Button,
        Grid2, 
        Typography,
        Card, 
        CardContent, 
        CardHeader, 
        Container,
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
                    <Card
                </Card>
            </Grid2>
        </Grid2>
    </Container>
    </>
)
}

export default HomePage
