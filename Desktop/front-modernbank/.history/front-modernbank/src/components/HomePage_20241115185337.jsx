import {Box, Button, Grid2, Typography } from '@mui/material'
import React from 'react'

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


    <Grid2 container spacing={2} sx={{ height: '100vh', width: '100vw', padding: 2 }}>
      {/* First Box */}
      <Grid item xs={12} sm={6}>
        <Box
          sx={{
            height: '45vh',
            backgroundColor: 'lightblue',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
          }}
        >
          <Typography variant="h5">Box 1</Typography>
        </Box>
      </Grid>

      {/* Second Box */}
      <Grid2 item xs={12} sm={6}>
        <Box
          sx={{
            height: '45vh',
            backgroundColor: 'lightgreen',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
          }}
        >
          <Typography variant="h5">Box 2</Typography>
        </Box>
      </Grid2>

      {/* Third Box */}
      <Grid2 item xs={12} sm={6}>
        <Box
          sx={{
            height: '45vh',
            backgroundColor: 'lightcoral',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
          }}
        >
          <Typography variant="h5">Box 3</Typography>
        </Box>
      </Grid2>

      {/* Fourth Box */}
      <Grid2 item xs={12} sm={6}>
        <Box
          sx={{
            height: '45vh',
            backgroundColor: 'lightyellow',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
          }}
        >
          <Typography variant="h5">Box 4</Typography>
        </Box>
      </Grid2>
    </Grid2>
    </>
)
}

export default HomePage
