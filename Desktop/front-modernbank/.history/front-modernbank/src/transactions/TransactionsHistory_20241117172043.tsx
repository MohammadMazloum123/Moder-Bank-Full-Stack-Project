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

const MockTransactions = [
    { id: 1, date: '2023-05-01', type: 'deposit', amount: 1000, description: 'Salary' },
    { id: 2, date: '2023-05-05', type: 'withdrawal', amount: 200, description: 'ATM Withdrawal' },
    { id: 3, date: '2023-05-10', type: 'transfer', amount: 300, description: 'Rent Payment' },
    { id: 4, date: '2023-05-15', type: 'deposit', amount: 500, description: 'Freelance Work' },
    { id: 5, date: '2023-05-20', type: 'withdrawal', amount: 150, description: 'Grocery Shopping' },
]

const TransactionsHistory = () => {
    const [setsearchTerm, setSearchTerm] = useState('');
    const [transactionType, settransactionType] = useState('all');
const handleSearchChange = (event : React.ChangeEvent<Html>) => {
    setSearchTerm(event?.target.value)
}
return (
    <div>
        
    </div>
)
}

export default TransactionsHistory
