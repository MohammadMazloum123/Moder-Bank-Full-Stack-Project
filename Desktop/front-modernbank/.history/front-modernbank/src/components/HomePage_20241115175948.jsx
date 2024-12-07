import {Box, Button, Grid2, Typography } from '@mui/material'
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
        <Box display="flex" justifyContent="center" mt={4}>
            <Button variant='contained' sx={{width:"130px" ,textAlign:"center", borderRadius:"5px", p: 1}}>
                Get Started
            </Button>
        </Box>

        <Grid2 container>
            <Grid2 size={8} sx={{border:""}}>
                Hi I am in love 
            </Grid2>
        </Grid2>
    </>
)
}

export default HomePage
