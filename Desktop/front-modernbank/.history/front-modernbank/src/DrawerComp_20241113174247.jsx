import React, {useState} from 'react'
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
        <Drawer open={OpenDrawer} onClose={() => setOpenDrawer(!OpenDrawer)}>
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
        <IconButton
    </>
)
}

export default DrawerComp
