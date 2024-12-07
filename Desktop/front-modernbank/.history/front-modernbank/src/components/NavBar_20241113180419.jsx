import { AppBar, Toolbar, Typography, Tabs, Tab, Button, Box } from '@mui/material'
import React, { useState } from 'react'
import DrawerComp from '../DrawerComp';

const NavBar = () => {
    const [value, setvalue] = useState();
return (

    <AppBar position='sticky' sx={{bgcolor:"#063970"}}>
        <Toolbar>
            <Box flex={1}>
                <DrawerComp/>
                <Typography ml={3}>
                    Modern Bank
                </Typography>
            </Box>
            <Box flex={3}>
                <Tabs 
                textColor='inherit'
                indicatorColor='secondary'
                value={value}
                onChange={(e, value) => setvalue(value)}
                >
                    <Tab label="Home"/>
                    <Tab label="About"/>
                    <Tab label="Contact"/>
                </Tabs>
            </Box>
            <Box >
                <Button sx={{marginLeft:'auto'}} variant='contained'>Log In</Button>
            </Box>
        </Toolbar>
    </AppBar>
)
}

export default NavBar