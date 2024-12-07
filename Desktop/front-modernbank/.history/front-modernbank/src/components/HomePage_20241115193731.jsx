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
            <Typography variant='h6' color=''>

            </Typography>
        </Box>
    </Container>
    </>
)
}

export default HomePage
