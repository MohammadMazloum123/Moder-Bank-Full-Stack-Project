import React, {useState} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { 
    Drawer,
    IconButton,
    List, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText,
    Typography,
    Collapse,
    Divider
    } from '@mui/material';

import {
    ExpandLess,
    ExpandMore,
    Add,
    SavingsOutlined,
    HistoryOutlined,
    AccountBalanceWalletOutlined,
    TrendingUpOutlined

} from "@mui/icons-material";


const DrawerComp = () => {
    const [OpenDrawer, setOpenDrawer] = useState(false);
      // Dropdown states



return (
    <>
        <Drawer 
        open={OpenDrawer}
        onClose={() => setOpenDrawer(false)}
        >
            <List sx={{width:"340px"}}>
                <ListItemButton>
                    <ListItemIcon>
                        <ListItemText>
                            Savings
                        </ListItemText>
                    </ListItemIcon>
                </ListItemButton>
            </List>
        </Drawer>
        {/* Drawer Toggle Button */}
        <IconButton onClick={() => setOpenDrawer(!OpenDrawer)}>
            <MenuIcon/>
        </IconButton>
    </>
)
}

export default DrawerComp
