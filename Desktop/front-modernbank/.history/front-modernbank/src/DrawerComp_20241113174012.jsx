import React from 'react'
import { 
    Drawer,
    List, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText 
    } from '@mui/material'

const DrawerComp = () => {
    const [Open, setOpen] = useState(second)
return (
    <>
        <Drawer>
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
