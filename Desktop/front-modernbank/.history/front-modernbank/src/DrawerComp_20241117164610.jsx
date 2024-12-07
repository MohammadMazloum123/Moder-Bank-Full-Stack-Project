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
    Box,
    Switch
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
    AttachMoneyOutlined,
    ShowChartOutlined,
    LogoutOutlined,
} from "@mui/icons-material";
import { Link } from 'react-router-dom';


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
        sx={{padding: "16px"}}
        >
        <Typography
            variant="h6"
            sx={{
            padding: 2,
            textAlign: "center",
            bgcolor: "#0f172a",
            color: "white",
        }}
        >
            Modern Bank
        </Typography>
        <Divider/>

            <List sx={{p: 2 ,width:"340px"}}>
                {/* Account Transactions Dropdown */}
                <ListItemButton component={} onClick={() => setTransactionsOpen(!transactionsOpen)}>
                    <ListItemIcon>
                        <CreditCardOutlined/>
                    </ListItemIcon>
                    <ListItemText primary="Transactions"/>
                    {transactionsOpen ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={transactionsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{pl : 2}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddOutlined fontSize='small'/>
                            </ListItemIcon>
                        <ListItemText primary="New Transactions"/>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <HistoryOutlined fontSize='small'/>
                            </ListItemIcon>
                        <ListItemText primary="Transactions History"/>
                        </ListItemButton>
                    </List>
                </Collapse>
                <Divider/>
                {/* Savings Dropdown */}
                <ListItemButton onClick={() => setSavingsOpen(!savingsOpen)}>
                    <ListItemIcon>
                        <SavingsOutlined fontSize='small'/>
                    </ListItemIcon>
                    <ListItemText primary="Savings"/>
                    {savingsOpen ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={savingsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{pl : 2}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountBalanceOutlined fontSize='small'/>
                            </ListItemIcon>
                            <ListItemText primary="Savings Account"/>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <TrendingUpOutlined fontSize='small'/>
                            </ListItemIcon>
                            <ListItemText primary="Savings Goals"/>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <PercentOutlined fontSize='small'/>
                            </ListItemIcon>
                            <ListItemText primary="Interest Rate"/>
                        </ListItemButton>
                    </List>
                </Collapse>
                <Divider/>
            <ListItemButton onClick={() => setExpenseTracker(!expenseTracker)}>
                <ListItemIcon>
                    <AttachMoneyOutlined fontSize='small'/>
                </ListItemIcon>
                    <ListItemText primary="Expense Tracker" />
                    {transactionsOpen ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={expenseTracker} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{pl : 2}}>
                    <ListItemButton>
                        <ListItemIcon>
                            <ShowChartOutlined fontSize='small'/>
                        </ListItemIcon>
                        <ListItemText primary="Track Expenses"/>
                    </ListItemButton>
                </List>
            </Collapse>
              {/* Dark Mode Switch */}
        <Box display="flex" alignItems="center" mt={2}>
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
                Dark Mode
            </Typography>
            <Switch
                inputProps={{ 'aria-label': 'Dark Mode Switch' }}
            />

            <ListItemButton>
                        <ListItemText primary="Log Out"/>
                        <ListItemIcon>
                            <LogoutOutlined/>
                        </ListItemIcon>
                    </ListItemButton>
        </Box>
            </List>
        </Drawer>
        {/* Drawer Toggle Button */}
        <IconButton onClick={() => setOpenDrawer(!OpenDrawer)}>
            <MenuIcon sx={{color:"#64748b"}}/>
        </IconButton>
    </>
)
}

export default DrawerComp
