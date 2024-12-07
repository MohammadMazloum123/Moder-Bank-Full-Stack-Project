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
     <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Your Banking Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Manage your finances with ease and security
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Get Started
          </Button>
        </Box>
)
}

export default HomePage
