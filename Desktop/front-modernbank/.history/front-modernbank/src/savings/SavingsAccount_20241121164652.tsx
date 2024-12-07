'use client'

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
import { useBanking } from '../contexts/BankingContext';

export default function SavingsAccount() {
    const { bankingData, isLoading, error, addTransaction } = useBanking();
    const [openDialog, setOpenDialog] = useState(false);
    const [openContributeDialog, setOpenContributeDialog] = useState(false);
    const [newAccount, setNewAccount] = useState({ name: '', goalName: '', goalAmount: '' });
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [contributionAmount, setContributionAmount] = useState('');

    if (isLoading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    const accounts = Object.entries(bankingData.savings).map(([name, account]) => ({
        id: name,
        name,
        balance: account.balance,
        goal: account.goalAmount,
        interestRate: 1.5, // This should come from the backend in a real application
        lastTransaction: account.transactions[0]?.date || 'No transactions yet'
    }));

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewAccount({ name: '', goalName: '', goalAmount: '' });
    };

    const handleOpenContributeDialog = (account) => {
        setSelectedAccount(account);
        setOpenContributeDialog(true);
    };

    const handleCloseContributeDialog = () => {
        setOpenContributeDialog(false);
        setSelectedAccount(null);
        setContributionAmount('');
    };

    const handleAddAccount = () => {
        if (newAccount.name && newAccount.goalName && newAccount.goalAmount) {
            addTransaction({
                type: 'transfer',
                amount: 0,
                description: `New savings account: ${newAccount.name}`,
                fromAccount: 'checking',
                toAccount: `savings-${newAccount.name}`,
                goalName: newAccount.goalName,
                goalAmount: parseFloat(newAccount.goalAmount)
            });
            handleCloseDialog();
        }
    };

    const handleContribute = () => {
        if (selectedAccount && contributionAmount) {
            const amount = parseFloat(contributionAmount);
            if (!isNaN(amount) && amount > 0) {
                addTransaction({
                    type: 'transfer',
                    amount,
                    description: `Contribution to ${selectedAccount.name}`,
                    fromAccount: 'checking',
                    toAccount: `savings-${selectedAccount.name}`
                });
            }
        }
        handleCloseContributeDialog();
    };

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
            <Typography component="h1" variant='h4' gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Savings Account
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {accounts.map((account) => (
                    <Grid item xs={12} md={4} key={account.id}>
                        <Paper elevation={3} sx={{ display: 'flex', height: '100%', flexDirection: 'column', p: 3 }}>
                            <Typography variant='h6' gutterBottom>{account.name}</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant='body1'>Balance:</Typography>
                                <Typography variant='body1' fontWeight='bold'>${account.balance.toFixed(2)}</Typography>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant='body2' gutterBottom>Progress to Goal:</Typography>
                                <LinearProgress
                                    variant='determinate'
                                    value={(account.balance / account.goal * 100)}
                                    sx={{ height: 10, borderRadius: 5 }}
                                />
                                <Typography variant='body2' gutterBottom align='right' sx={{ mt: 0.5 }}>
                                    ${account.balance.toFixed(2)} / ${account.goal.toFixed(2)}
                                </Typography>
                                <Box sx={{ mt: 'auto' }}>
                                    <Chip label={`${account.interestRate}% APY`} size="small" sx={{ mr: 1 }} />
                                    <Chip label={`Last Transaction: ${new Date(account.lastTransaction).toLocaleDateString()}`} size="small" />
                                </Box>
                            </Box>
                            <Button variant="outlined" onClick={() => handleOpenContributeDialog(account)}>
                                Contribute
                            </Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Button
                variant='contained'
                onClick={handleOpenDialog}
                sx={{ mt: 4, mb: 2 }}
            >
                + Add New Savings Account
            </Button>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='savings account table'>
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
                                        sx={{ width: 100, display: "inline-block", mr: 1 }}
                                    />
                                    {((account.balance / account.goal) * 100).toFixed(0)}%
                                </TableCell>
                                <TableCell align="right">{account.interestRate}%</TableCell>
                                <TableCell>{new Date(account.lastTransaction).toLocaleDateString()}</TableCell>
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
                        onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                    />
                    <TextField
                        margin='dense'
                        id="goalName"
                        label="Goal Name"
                        type='text'
                        variant='outlined'
                        fullWidth
                        value={newAccount.goalName}
                        onChange={(e) => setNewAccount({ ...newAccount, goalName: e.target.value })}
                    />
                    <TextField
                        margin='dense'
                        id="goalAmount"
                        label="Goal Amount"
                        type='number'
                        variant='outlined'
                        fullWidth
                        value={newAccount.goalAmount}
                        onChange={(e) => setNewAccount({ ...newAccount, goalAmount: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleAddAccount}>Add Account</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openContributeDialog} onClose={handleCloseContributeDialog}>
                <DialogTitle>Contribute to {selectedAccount?.name}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id="contribution"
                        label="Contribution Amount"
                        type='number'
                        variant='outlined'
                        fullWidth
                        value={contributionAmount}
                        onChange={(e) => setContributionAmount(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseContributeDialog}>Cancel</Button>
                    <Button onClick={handleContribute}>Contribute</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );