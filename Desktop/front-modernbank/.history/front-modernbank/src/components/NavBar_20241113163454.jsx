import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

const NavBar = () => {
return (
    <AppBar position='sticky'>
        <Toolbar>
            <Typography>
            NavBar
            </Typography>
        </Toolbar>
    </AppBar>
)
}

export default NavBar