import React, { useState } from 'react';
import {
    Typography,
    Box,
    Paper,
    Grid,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';

// Mock data for demonstration
const mockSavingsAccounts = [
    { id: 1, name: 'Emergency Fund', balance: 5000, goal: 10000, interestRate: 1.5, lastTransaction: '2023-05-15' },
    { id: 2, name: 'Vacation Savings', balance: 2500, goal: 5000, interestRate: 2.0, lastTransaction: '2023-05-10' },
    { id: 3, name: 'New Car Fund', balance: 7500, goal: 15000, interestRate: 1.8, lastTransaction: '2023-05-20' },
];

const SavingsAccount = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [accounts, setAccounts] = useState(mockSavingsAccounts);
    const [newAccount, setNewAccount] = useState({name:'', goal:''})

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const handleAddAccount = () => {
        if(newAccount.name && newAccount.goal){
            const newAccountData = {
                id: accounts.length + 1,
                name: newAccount.name,
                balance: 0 ,
                goal: parseFloat(newAccount.name),
                interestRate : 1.5,
                lastTransaction: new Date().toISOString().split('T')[0],
            };
            setAccounts([...accounts, newAccountData]);
            setNewAccount({name:'', goal:''});
            handleCloseDialog();
        }
    };
return (
    <Box sx={{maxWidth:1200, mx:'auto', p:3}}>
        <Typography component="h1" variant='h4' gutterBottom sx={{fontWeight:'bold', mb:3}}>
            Savings Account
        </Typography>
        <Grid container spacing={3} sx={{mb:4}}>
            {accounts.map((account) =>(
                <Grid item xs={12} md={4} key={account.id}>
                    <Paper elevation={3} sx={{display:'flex', height:'100%', flexDirection:'column', p: 3}}>
                        <Typography variant='h6' gutterBottom>{account.name}</Typography>
                        <Box sx={{display:'flex', justifyContent:'space-between', mb:2}}>
                            <Typography variant='body1'>Balance:</Typography>
                            <Typography variant='body1' fontWeight='bold'>${account.balance.toFixed(2)}</Typography>
                        </Box>
                        <Box sx={{mb: 2}}>
                            <Typography variant='body2' gutterBottom>Progress to Goal:</Typography>
                            <LinearProgress
                            variant='determinate'
                            value={(account.balance / account.goal * 100)}
                            sx={{height : 10, borderRadius : 5}}
                            />
                            <Typography variant='body2' gutterBottom align='right' sx={{mt:0.5}}>
                                ${account.balance.toFixed(2)} / ${account.goal.toFixed(2)}
                            </Typography>
                            <Box sx={{m:'auto'}}>
                                <Chip label={`${account.interestRate}% APY`} size="small" sx={{mr:1}}/>
                                <Chip label={`Last Transaction: ${account.lastTransaction}`} size="small"/>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
        <Button
        variant='contained'
        onClick={handleOpenDialog}
        sx={{mt:4, mb: 2}}
        >
            + Add New Savings Account
        </Button>

        <TableContainer component={Paper}>
            <Table sx={{minWidth:650}} aria-label='savings account table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Account Name</TableCell>
                        <TableCell align="right">Balance</TableCell>
                        <TableCell align="right">Goal</TableCell>
                        <TableCell align="right">Progress</TableCell>
                        <TableCell align="right">Interest Rate</TableCell>
                        <TableCell>Last Transaction</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {accounts.map((account) => (
                        <TableRow key={account.id}>
                            <TableCell component="th" scope='row'>{account.name}</TableCell>
                            <TableCell align='right'>${account.balance.toFixed(2)}</TableCell>
                            <TableCell align='right'>${account.goal.toFixed(2)}</TableCell>
                            <TableCell align='right'>
                                <LinearProgress
                                variant='determinate'
                                value={(account.balance / account.goal) * 100}
                                sx={{width: 100, display:"inline-block", mr:1}}
                                />
                                {((account.balance / account.goal) * 100).toFixed(0)}%
                            </TableCell>
                            <TableCell align="right">{account.interestRate}%</TableCell>
                            <TableCell>{account.lastTransaction}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Add New Savings Account</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin='dense'
                id="name"
                label="Account Name"
                type='text'
                variant='outlined'
                fullWidth
                value={newAccount.name}
                onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                />
                <TextField
                autoFocus
                margin='dense'
                id="goal"
                label="Goal Name"
                type='text'
                variant='outlined'
                fullWidth
                value={newAccount.goal}
                onChange={(e) => setNewAccount({...newAccount, goal: e.target.value})}
                />
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={handleCloseDialog}>Cancel</Button>
                <Button variant='contained' onClick={handleAddAccount}>Add Account</Button>
            </DialogActions>
        </Dialog>
    </Box>
)
}

export default SavingsAccount
