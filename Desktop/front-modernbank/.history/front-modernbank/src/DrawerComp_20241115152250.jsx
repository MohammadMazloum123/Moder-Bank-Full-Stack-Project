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
    B
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
        sx={{padding: "16px"}}
        >
         <Box display="flex" alignItems="center" mb={2}> {/* Box to center icon and text */}
          <AccountBalance sx={{ color: "primary.main", mr: 1 }} /> {/* Bank Icon */}
          <Typography variant="h6" color="textPrimary">
            Modern Bank {/* "Modern Bank" text */}
          </Typography>
        </Box>
        <Divider/>

            <List sx={{p: 2 ,width:"340px"}}>
                {/* Account Transactions Dropdown */}
                <ListItemButton onClick={() => setTransactionsOpen(!transactionsOpen)}>
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
