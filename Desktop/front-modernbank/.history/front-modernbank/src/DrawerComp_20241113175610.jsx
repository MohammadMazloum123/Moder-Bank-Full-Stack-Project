import React, {useState} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { 
    Drawer,
    IconButton,
    List, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText 
    } from '@mui/material'

const DrawerComp = () => {
    const [OpenDrawer, setOpenDrawer] = useState(false)
return (
    <>
        <Drawer 
        open={OpenDrawer}
        onClose={() => setOpenDrawer(false)}
        wid
        >
            <List>
                <ListItemButton>
                    <ListItemIcon>
                        <ListItemText>
                            Savings
                        </ListItemText>
                    </ListItemIcon>
                </ListItemButton>
            </List>
        </Drawer>
        <IconButton onClick={() => setOpenDrawer(!OpenDrawer)}>
            <MenuIcon/>
        </IconButton>
    </>
)
}

export default DrawerComp
