import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { useBanking } from '../contexts/BankingContext';

export default function AccountsPage() {

    const { bankingData, isLoading, error } = useBanking();

    if (isLoading) {
    return <Typography>Loading...</Typography>;
    }

    if (error) {
    return <Typography color="error">{error}</Typography>;
    }

    const totalSavings = Object.values(bankingData.savings).reduce((total, account) => total + account.balance, 0);
    const totalBalance = bankingData.checking.balance + totalSavings + bankingData.investment.balance;

    const accountTypes = [
    { name: 'Checking', balance: bankingData.checking.balance },
    { name: 'Savings', balance: totalSavings },
    { name: 'Investment', balance: bankingData.investment.balance },
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Your Accounts
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <Typography variant="h5" gutterBottom>
          Total Balance
        </Typography>
        <Typography variant="h3" component="p">
          ${totalBalance.toFixed(2)}
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {accountTypes.map((account) => (
          <Grid item xs={12} md={4} key={account.name}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {account.name}
                </Typography>
                <Typography variant="h4" component="p">
                  ${account.balance.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => router.push(`/${account.name.toLowerCase()}`)}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/transactions/new')}
        >
          New Transaction
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => router.push('/savings/goals')}
        >
          Savings Goals
        </Button>
      </Box>
    </Box>
  );
}