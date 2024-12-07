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

    const handleAccount = () => {
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
        <Grid container spacing={3} sx={{mb:3}}>
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
                            <Typography variant='body2' gutterBottom align='right' mt={0.5}>
                                ${account.balance.toFixed(2)} / ${account.goal.toFixed(2)}
                            </Typography>
                            <Box>
                                <Chip label={`${}`}/>
                                <Chip/>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            ))}

        </Grid>
    </Box>
)
}

export default SavingsAccount
