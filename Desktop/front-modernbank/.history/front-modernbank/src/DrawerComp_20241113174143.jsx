import React, {useState} from 'react'
import { 
    Drawer,
    List, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText 
    } from '@mui/material'

const DrawerComp = () => {
    const [OpenDrawer, setOpenDrawer] = useState(false)
return (
    <>
        <Drawer open={ope}>
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
    </>
)
}

export default DrawerComp
