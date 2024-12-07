import React, { useState } from 'react';
import {
  Typography,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  SelectChangeEvent,
} from '@mui/material';

const mockTransactions = [
    { id: 1, date: '2023-05-01', type: 'deposit', amount: 1000, description: 'Salary' },
    { id: 2, date: '2023-05-05', type: 'withdrawal', amount: 200, description: 'ATM Withdrawal' },
    { id: 3, date: '2023-05-10', type: 'transfer', amount: 300, description: 'Rent Payment' },
    { id: 4, date: '2023-05-15', type: 'deposit', amount: 500, description: 'Freelance Work' },
    { id: 5, date: '2023-05-20', type: 'withdrawal', amount: 150, description: 'Grocery Shopping' },
]

const TransactionsHistory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [transactionType, settransactionType] = useState('all');

const handleSearchChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
}

const handleTypeChange = (event : SelectChangeEvent) => {
    settransactionType(event.target.value as string)
}

const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLocaleLowerCase());
    const matchesType = transactionType === 'all' || transaction.type === transactionType;
    return matchesSearch && matchesType
})

return (
    <Box sx={{maxWidth: 800, mx:'auto', p:3}}>
        <Typography component="h1" variant='h5' gutterBottom sx={{fontWeight:'bold'}}>
            Transactions History
        </Typography>
        <Box sx={{display:'flex', mb: 3, gap: 2}}>
            <TextField
            label="Search Transactions"
            variant='outlined'
            size='small'
            value={searchTerm}
            onChange={handleSearchChange}
            sx
            />
        </Box>
    </Box>  
)
}

export default TransactionsHistory
