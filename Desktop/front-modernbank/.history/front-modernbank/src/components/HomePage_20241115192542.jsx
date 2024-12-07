import {Box, Button, Grid2, Typography } from '@mui/material'
import React from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  Container, 
} from '@mui/material';


const HomePage = () => {
return (
    <>
    <Box>
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
    </Box>
    </>
)
}

export default HomePage
