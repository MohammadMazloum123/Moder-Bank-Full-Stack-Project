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

import { useBanking } from '../contexts/BankingContext.tsx';

const TransactionsHistory = () => {
    const { bankingData, isLoading, error } = useBanking();
    const [searchTerm, setSearchTerm] = useState('');
    const [transactionType, setTransactionType] = useState('all');

  // Ensure bankingData is properly loaded
    const allTransactions = bankingData?.accounts
        ?.flatMap((account) => account.transactions || [])
        ?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleTypeChange = (event: SelectChangeEvent) => {
        setTransactionType(event.target.value as string);
    };

    const filteredTransactions = allTransactions.filter((transaction) => {
        const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = transactionType === 'all' || transaction.type === transactionType;
    return matchesSearch && matchesType;
  });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography component="h1" variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        Transactions History
      </Typography>
      <Box sx={{ display: 'flex', mb: 3, gap: 2 }}>
        <TextField
          label="Search Transactions"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1 }}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="transaction-type-label">Type</InputLabel>
          <Select
            labelId="transaction-type-label"
            id="transaction-type"
            label="Type"
            value={transactionType}
            onChange={handleTypeChange}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="deposit">Deposit</MenuItem>
            <MenuItem value="withdrawal">Withdrawal</MenuItem>
            <MenuItem value="transfer">Transfer</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="transaction history table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>
                  {transaction.type}
                </TableCell>
                <TableCell align="right">
                  ${transaction.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {filteredTransactions.length === 0 && (
        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          No transactions found.
        </Typography>
      )}
    </Box>
  );
};

export default TransactionsHistory;
