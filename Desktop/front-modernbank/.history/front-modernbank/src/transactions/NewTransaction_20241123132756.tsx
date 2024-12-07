'use client'

import React, { useState } from 'react';
import {
    Typography,
    Box,
    Paper,
    TextField,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
    Snackbar,
    Alert,
} from '@mui/material';
import { useBanking } from '../../../contexts/BankingContext';

const NewTransaction = () => {
    const { addTransaction } = useBanking();
    const [transactionType, setTransactionType] = useState<'deposit' | 'withdrawal' | 'transfer'>('deposit');
    const [amount, setAmount] = useState('');
    const [fromAccount, setFromAccount] = useState('checking');
    const [toAccount, setToAccount] = useState('checking');
    const [description, setDescription] = useState('');
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

    const handleTransactionTypeChange = (event: SelectChangeEvent) => {
        setTransactionType(event.target.value as 'deposit' | 'withdrawal' | 'transfer');
        setToAccount('checking');
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const amountValue = parseFloat(amount);

        if (isNaN(amountValue) || amountValue <= 0) {
            setNotification({
                open: true,
                message: 'Please enter a valid amount.',
                severity: 'error'
            });
            return;
        }

        const result = addTransaction({
            description,
            amount: amountValue,
            type: transactionType,
            fromAccount: transactionType === 'deposit' ? 'external' : fromAccount,
            toAccount: transactionType === 'withdrawal' ? 'external' : toAccount,
        });

        if (result.success) {
            setNotification({
                open: true,
                message: 'Transaction submitted successfully!',
                severity: 'success'
            });

            // Reset form
            setAmount('');
            setDescription('');
        } else {
            setNotification({
                open: true,
                message: result.message || 'Failed to submit transaction. Please try again.',
                severity: 'error'
            });
        }
    };

    const handleCloseNotification = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({ ...notification, open: false });
    };

    return (
        <Box sx={{maxWidth:600, mx:'auto', p:3}}>
            <Paper elevation={3} sx={{p:4, borderRadius: 2, border:"1px solid #e0e0e0"}}>
                <Typography component="h1" variant='h5' gutterBottom sx={{fontWeight: "bold"}}>
                    New Transaction
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    Create a new transaction for your account.
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{display:"flex", flexDirection:"column", gap: 3, mt: 3}}>
                    <FormControl fullWidth>
                        <InputLabel id="transaction-type-label">Transaction Type</InputLabel>
                        <Select
                        labelId='transaction-type-label'
                        id='transaction-type'
                        value={transactionType}
                        label="Transaction Type"
                        onChange={handleTransactionTypeChange}
                        >
                            <MenuItem value="deposit">Deposit</MenuItem>
                            <MenuItem value="withdrawal">Withdrawal</MenuItem>
                            <MenuItem value="transfer">Transfer</MenuItem>
                        </Select>
                        <Typography variant='caption' color='text.secondary' sx={{mt: 0.5}}>
                            Choose the type of transaction you want to make.
                        </Typography>
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        label="Amount"
                        placeholder='Enter your amount'
                        />
                        <Typography variant='caption' color="text.secondary" sx={{mt : 0.5}}>
                            Enter the amount for the transaction.
                        </Typography>
                    </FormControl>
                    {transactionType !== 'deposit' && (
                        <FormControl fullWidth>
                            <InputLabel id="from-account-label">From Account</InputLabel>
                            <Select
                            labelId='from-account-label'
                            id='from-account'
                            value={fromAccount}
                            label="From Account"
                            onChange={(e) => setFromAccount(e.target.value)}
                            >
                                <MenuItem value="checking">Checking</MenuItem>
                                <MenuItem value="savings">Savings</MenuItem>
                                <MenuItem value="investment">Investment</MenuItem>
                            </Select>
                            <Typography variant='caption' color="text.secondary" sx={{mt : 0.5}}>
                                Select the account to withdraw from.
                            </Typography>
                        </FormControl>
                    )}
                    {transactionType !== 'withdrawal' && (
                        <FormControl fullWidth>
                            <InputLabel id="to-account-label">To Account</InputLabel>
                            <Select
                            labelId='to-account-label'
                            id='to-account'
                            value={toAccount}
                            label="To Account"
                            onChange={(e) => setToAccount(e.target.value)}
                            >
                                <MenuItem value="checking">Checking</MenuItem>
                                <MenuItem value="savings">Savings</MenuItem>
                                <MenuItem value="investment">Investment</MenuItem>
                            </Select>
                            <Typography variant='caption' color="text.secondary" sx={{mt : 0.5}}>
                                Select the account to deposit to.
                            </Typography>
                        </FormControl>
                    )}
                    <FormControl fullWidth>
                        <TextField
                        label="Description (Optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Enter a description for this transaction'
                        multiline
                        rows={2}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                            Add a brief description for your records.
                        </Typography>
                    </FormControl>
                    <Button
                    type="submit" 
                    variant="contained" 
                    sx={{ 
                        mt: 2,
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                        bgcolor: 'primary.dark',
                        },
                        textTransform: 'none',
                        py: 1.5
                    }}
                    >
                        Submit Transaction
                    </Button>
                </Box>
            </Paper>
            <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
                <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Box>  
    );
};

export default NewTransaction;