import { AppBar, Toolbar, Typography, Tabs, Tab, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react'

const NavBar = () => {
    const [value, setvalue] = useState();
return (

    <AppBar position='sticky' sx={{bgcolor:"#063970"}}>
        <Toolbar>
            <MenuIcon/>
            <Tabs 
            textColor='inherit'
            indicatorColor='secondary'
            value={value}
            onChange={() => }
            >
                <Tab label="Home"/>
                <Tab label="About"/>
                <Tab label="Contact"/>
            </Tabs>
            <Button sx={{marginLeft:'auto'}} variant='contained'>Log In</Button>
        </Toolbar>
    </AppBar>
)
}

export default NavBar
