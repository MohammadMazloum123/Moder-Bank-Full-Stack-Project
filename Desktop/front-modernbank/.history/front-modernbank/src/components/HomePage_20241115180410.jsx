import {Box, Button, Grid2, Typography } from '@mui/material'
import React from 'react'

const HomePage = () => {
return (
    <>
        <Typography variant='h3' sx={{textAlign:"center", color:"#0f172a", mt:4, p:1}}>
            Welcome To ModernBank
        </Typography>
        <Typography variant='h6' sx={{textAlign:"center", mt:1, color:"#64748b"}}>
            Empowering Your Financial Future
        </Typography>
        <Box display="flex" justifyContent="center" mt={3}>
            <Button variant='contained' sx={{width:"130px" ,textAlign:"center", borderRadius:"5px", p: 1}}>
                Get Started
            </Button>
        </Box>

        <Grid2 container>
            <Grid2 size={6} sx={{border:"1px solid black", borderRadius:"8px", height:"100px"}}>
                Hi I am in love 
            </Grid2>
            <Grid2 size={6} sx={{border:"1px solid black", borderRadius:"8px", height:"100px"}}>
                
            </Grid2>
        </Grid2>
    </>
)
}

export default HomePage
