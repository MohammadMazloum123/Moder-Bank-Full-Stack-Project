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
return (
    <div>
        
    </div>
)
}

export default SavingsAccount
