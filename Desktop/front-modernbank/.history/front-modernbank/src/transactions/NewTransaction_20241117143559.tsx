
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
} from '@mui/material';

const NewTransaction = () => {
    const [transactionType, settransactionType] = useState("");
    const [amount, setamount] = useState("");
    const [toAccountOrReceipient, setToAccountOrReceipient] = useState("");
    const [description, setDescription] = useState("");

const handleTransactionTypeChange = (event : SelectChangeEvent) => {
    settransactionType(event.target.value as string)
    setToAccountOrReceipient("")
}

const handleSubmit = (event : React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    console.log(transactionType, amount, toAccountOrReceipient, description)
}


return (
    <Box sx={{maxWidth:600, mx:'auto', p:3}}>
        <Paper elevation={3} sx={{p:4, borderRadius: 2, border:"1px solid #e0e0e0"}}>
            <Typography component="h1" variant='h5' gutterBottom sx={{fontWeight: "bold"}}>
                New Transaction
            </Typography>
            <Typography variant='body2' color='#64748b'>
                Create a new transaction for your account.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{display:"flex", flexDirection:"column", gap: 3}}>
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
                        <MenuItem value="withdraw">Withdraw</MenuItem>
                        <MenuItem value="transfer">Transfer</MenuItem>
                    </Select>
                    <Typography variant='caption' color='#64748b' sx={{mt: 0.5}}>
                        Choose the type of transaction you want to make.
                    </Typography>
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                    type="number"
                    value={amount}
                    onChange={(e) => setamount(e.target.value)}
                    label="Amount"
                    placeholder='Enter your amount'
                    />
                    <Typography variant='caption' color="#64748b" sx={{mt : 0.5}}>
                        Enter the amount for the transaction.
                    </Typography>
                </FormControl>
                {transactionType && (
                    <FormControl fullWidth>
                        {transactionType === 'transfer' ? (
                            <TextField
                            value={toAccountOrReceipient}
                            onChange={(e) => setToAccountOrReceipient(e.target.value)}
                            label="Receipient's name"
                            placeholder="Enter receipient's name"
                            />
                        ): (
                            <>
                                <InputLabel id="to-account-label">To Account</InputLabel>
                                <Select
                                labelId='to-account-label'
                                id='to-account'
                                value={toAccountOrReceipient}
                                onChange={(e) => setToAccountOrReceipient(e.target.value)}
                                >
                                    <MenuItem value="checking">Checking</MenuItem>
                                    <MenuItem value="savings">Savings</MenuItem>
                                    <MenuItem value="investement">Investement</MenuItem>
                                </Select>
                            </>
                        )}
                        <Typography variant='caption' color="#64748b" sx={{mt : 0.5}}>
                            {transactionType === 'transfer' 
                            ? "Enter the receipient's name for the transfer."
                            : "Select the account for this transaction."}
                        </Typography>
                    </FormControl>
                )}
                <FormControl fullWidth>
                    <TextField
                    
                    />
                </FormControl>
            </Box>
        </Paper>
    </Box>  
)
}

export default NewTransaction;
