import {Box, Button, Typography } from '@mui/material'
import React from 'react'

const HomePage = () => {
return (
    <>
        <Typography variant='h3' sx={{textAlign:"center", color:"#0f172a", mt:4, p:1}}>
            Welcome To ModernBank
        </Typography>
        <Typography variant='h6' sx={{textAlign:"center", mt:2, color:"#64748b"}}>
            Empowering Your Financial Future
        </Typography>
        <Box>
        <Button variant='contained' sx={{textAlign:"center"}}>
            Get Started
        </Button>
        </Box>
    </>
)
}

export default HomePage
