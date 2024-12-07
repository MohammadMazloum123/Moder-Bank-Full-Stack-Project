import { AppBar, Toolbar, Typography, Tabs, Tab, Button, Box } from '@mui/material'
import React, { useState } from 'react'
import DrawerComp from '../DrawerComp';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const NavBar = () => {
    const [value, setvalue] = useState();
return (
    <AppBar position='sticky' sx={{bgcolor:"#063970"}}>
        <Toolbar>
            
                <DrawerComp/>
                <Box display="flex" flex={3}>
                    <Typography ml={3}>
                        Modern Bank
                    </Typography>
                </Box>

            <Box display="flex" flex={1} justifyContent="center"> 
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
            <Box display="flex" flex={0.6} alignItems="center" justifyContent="center">
                <NotificationsNoneOutlinedIcon sx={{mr:4}}/>
                <EmailOutlinedIcon/>
            </Box>
            <Box display="flex" justifyContent="flex-end">
                <Button sx={{marginLeft:'auto'}} variant='contained'>Log In</Button>
            </Box>
        </Toolbar>
    </AppBar>
)
}

export default NavBar