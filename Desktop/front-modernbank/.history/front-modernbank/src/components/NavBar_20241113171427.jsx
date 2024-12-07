import { AppBar, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'

const NavBar = () => {
return (
    <AppBar position='sticky' sx={{bgcolor:"#063970"}}>
        <Toolbar>
            <MenuIcon/>
            <Typography>
                NavBar
            </Typography>
        </Toolbar>
    </AppBar>
)
}

export default NavBar
