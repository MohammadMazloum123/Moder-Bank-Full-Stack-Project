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
    {id:1, type:"deposit", amount: 1000, description:'salary'},
    {id:2, type:"withdrawal", amount: 500, description:''},
    {id:1, type:"deposit", amount: 1000, description:'salary'},
    {id:1, type:"deposit", amount: 1000, description:'salary'},
    {id:1, type:"deposit", amount: 1000, description:'salary'},
]
const TransactionsHistory = () => {
return (
    <div>
        
    </div>
)
}

export default TransactionsHistory
