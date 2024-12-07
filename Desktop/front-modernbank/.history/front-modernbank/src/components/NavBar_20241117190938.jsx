import { AppBar, Toolbar, Typography, Tabs, Tab, Button, Box } from '@mui/material'
import React, { useState } from 'react'
import DrawerComp from '../DrawerComp';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { AccountBalanceOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [value, setvalue] = useState();
return (
    <AppBar position='sticky' sx={{bgcolor:"#0f172a"}}>
        <Toolbar>
            
                <DrawerComp/>
                <Box display="flex" alignItems="center" flex={3} ml={3}>
                    <AccountBalanceOutlined fontSize='medium' sx={{ color: "white", mr: 1 }} />
                        <Typography variant='h6' color='inherit'>
                            Modern Bank
                        </Typography>
                </Box>
            <Box display="flex" flex={0.7} justifyContent="center"> 
                <Tabs 
                textColor='inherit'
                indicatorColor='secondary'
                value={value}
                onChange={(e, value) => setvalue(value)}
                >
                        <Tab LinkComponent={Link} label="Home"/>
                        <Tab label="About"/>
                        <Tab label="Contact"/>
                </Tabs>
            </Box>
            <Box display="flex" flex={0.4} alignItems="center" justifyContent="center">
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
