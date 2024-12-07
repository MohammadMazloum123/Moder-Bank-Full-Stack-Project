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
    AccountBalanceOutlined,
    PercentOutlined,
    AttachMoneyOutlined

} from "@mui/icons-material";


const DrawerComp = () => {
    const [OpenDrawer, setOpenDrawer] = useState(false);
      // Dropdown states
        const [transactionsOpen, setTransactionsOpen] = useState(false);
        const [savingsOpen, setSavingsOpen] = useState(false);
        const [expenseTracker, setExpenseTracker] = useState(false);


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
                    <ListItemText primary="Transactions"/>
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
                <Divider/>
                {/* Savings Dropdown */}
                <ListItemButton onClick={() => setSavingsOpen(!savingsOpen)}>
                    <ListItemIcon>
                        <SavingsOutlined/>
                    </ListItemIcon>
                    <ListItemText primary="Savings"/>
                    {savingsOpen ? <ExpandLess/> : <ExpandMore/>}
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
                            <ListItemText primary="Savings Goals"/>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <PercentOutlined/>
                            </ListItemIcon>
                            <ListItemText primary="Interest Rate"/>
                        </ListItemButton>
                    </List>
                </Collapse>
            <ListItemButton onClick={() => setExpenseTracker(!expenseTracker)}>
                <ListItemIcon>
                    <AttachMoneyOutlined />
                </ListItemIcon>
                    <ListItemText primary="Expense Tracker" />
            </ListItemButton>
            <Collapse in={expenseTracker} timeout="auto" unmountOnExit>
                
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