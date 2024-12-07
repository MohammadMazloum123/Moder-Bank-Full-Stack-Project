import { AppBar, Toolbar, Typography, Tabs, Tab, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'

const NavBar = () => {
return (
    <AppBar position='sticky' sx={{bgcolor:"#063970"}}>
        <Toolbar>
            <MenuIcon/>
            <Tabs textColor='inherit'>
                <Tab label="Home"/>
                <Tab label="About"/>
                <Tab label="Contact"/>
            </Tabs>
            <Button variant='contained'></Button>
            <Typography>
                NavBar
            </Typography>
        </Toolbar>
    </AppBar>
)
}

export default NavBar
