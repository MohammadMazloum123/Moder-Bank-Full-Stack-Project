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
    Divider,
    } from '@mui/material';

import {
    ExpandLess,
    ExpandMore,
    AddOutlined,
    SavingsOutlined,
    HistoryOutlined,
    CreditCardOutlined,
    TrendingUpOutlined,
    AccountBalanceOutlined

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
                <Collapse in={transactionsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{pl : 4}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddOutlined/>
                            </ListItemIcon>
                        <ListItemText primary="New Transactions"/>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <HistoryOutlined/>
                            </ListItemIcon>
                        <ListItemText primary="Transactions History"/>
                        </ListItemButton>
                    </List>
                </Collapse>
                {/* Savings Dropdown */}
                <ListItemButton onClick={() => setSavingsOpen(!savingsOpen)}>
                    <ListItemIcon>
                        <SavingsOutlined/>
                    </ListItemIcon>
                    <ListItemText primary="Savings"/>
                    {setSavingsOpen ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={savingsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{pl : 4}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountBalanceOutlined/>
                            </ListItemIcon>
                            <ListItemText primary="Savings Account"/>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <TrendingUpOutlined/>
                            </ListItemIcon>
                            <ListItemText primary="Savings Account"/>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountBalanceOutlined/>
                            </ListItemIcon>
                            <ListItemText primary="Savings Account"/>
                        </ListItemButton>
                    </List>
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
