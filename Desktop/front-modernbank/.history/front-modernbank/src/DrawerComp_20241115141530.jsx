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
    CreditCardOutlined,
    TrendingUpOutlined

} from "@mui/icons-material";


const DrawerComp = () => {
    const [OpenDrawer, setOpenDrawer] = useState(false);
      // Dropdown states
        const [transactionsOpen, setTransactionsOpen] = useState(false);
        const [savingsOpen, setSavingsOpen] = useState(false)


return (
    <>
        <Drawer 
        open={OpenDrawer}
        onClose={() => setOpenDrawer(false)}
        >
        <Typography
            variant="h6"
            sx={{
            padding: 2,
            textAlign: "center",
            bgcolor: "#063970",
            color: "white",
        }}
        >
            Modern Bank
        </Typography>
        <Divider/>

            <List sx={{width:"340px"}}>
                {/* Account Transactions Dropdown */}
                <ListItemButton onClick={() => setTransactionsOpen(!transactionsOpen)}>
                    <ListItemIcon>
                        <CreditCardOutlined/>
                    </ListItemIcon>
                    <ListItemText primary="Account Transactions"/>
                    {transactionsOpen ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={transactionsOpen}>

                </Collapse>
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
