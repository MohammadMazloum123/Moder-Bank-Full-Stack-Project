import { 
    AccountBalanceWalletOutlined, 
    CreditCardOutlined, 
    SavingsOutlined, 
    TrendingUpOutlined 
    } from '@mui/icons-material';
    import { Link } from 'react-router-dom';
    import { 
    Box, 
    Button, 
    Grid, 
    Typography, 
    Card, 
    CardContent, 
    CardHeader, 
    Container, 
    LinearProgress 
    } from '@mui/material';
    import { useBanking } from '../contexts/BankingContext';
    import React from 'react';

const HomePage = () => {
    const { bankingData, isLoading, error } = useBanking();
    const totalBalance = bankingData.checking.balance + 
    Object.values(bankingData.savings).reduce((sum, account) => sum + account.balance, 0) + 
    bankingData.investment.balance;

  const recentTransactions = [
    ...bankingData.checking.transactions,
    ...Object.values(bankingData.savings).flatMap(account => account.transactions),
    ...bankingData.investment.transactions
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  const savingsGoal = Object.values(bankingData.savings)[0] || { balance: 0, goalAmount: 1 };
  const savingsProgress = (savingsGoal.balance / savingsGoal.goalAmount) * 100;

  // For this example, we'll assume a fixed monthly budget
  const monthlyBudget = 2000;
  const currentExpenses = recentTransactions
    .filter(t => t.type === 'withdrawal')
    .reduce((sum, t) => sum + t.amount, 0);
  const expenseProgress = (currentExpenses / monthlyBudget) * 100;
    return (
    <>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          {/* Header */}
            <Box textAlign="center" mb={6}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Welcome To Your Banking Dashboard
                </Typography>
                <Typography variant="h6" color="#64748b" paragraph>
                    Manage your finances with ease and security
                </Typography>
                <Button variant="contained" color="primary" size="large">
                    Get Started
                </Button>
        </Box>

          {/* Grid Layout */}
        <Grid container spacing={4}>
            {/* Account Balance */}
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader
                    avatar={<AccountBalanceWalletOutlined />}
                    title="Account Balance"
                    titleTypographyProps={{ variant: "subtitle1" }}
                    />
                <CardContent>
                    <Typography variant="h4" component="div">
                        $5,255.80
                    </Typography>
                    <Typography variant="body2" color="#64748b">
                    Available Balance
                    </Typography>
                </CardContent>
                </Card>
            </Grid>

            {/* Recent Transactions */}
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                <CardHeader
                    avatar={<CreditCardOutlined />}
                    title="Recent Transactions"
                    titleTypographyProps={{ variant: "subtitle1" }}
                />
                <CardContent>
                    <Typography variant="body2" paragraph>
                        Grocery Store - $85.20
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Monthly Rent - $885.20
                    </Typography>
                    <Typography variant="body2">
                        Online Shopping - $70.20
                    </Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* Savings Goal */}
        <Grid item xs={12} sm={6} md={3}>
            <Card>
            <CardHeader
                avatar={<SavingsOutlined />}
                title="Savings Goal"
                titleTypographyProps={{ variant: "subtitle1" }}
            />
            <CardContent>
                <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="h6" component="div">
                    $3,500
                </Typography>
                <Typography variant="body2" color="#64748b">
                    / $5,000
                </Typography>
                </Box>
                <LinearProgress
                variant="determinate"
                value={70}
                sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="body2" color="text.secondary" mt={1}>
                Vacation Fund
                </Typography>
            </CardContent>
            </Card>
        </Grid>

            {/* Expense Tracker */}
        <Grid item xs={12} sm={6} md={3}>
            <Card>
            <CardHeader
                avatar={<TrendingUpOutlined />}
                title="Expense Tracker"
                titleTypographyProps={{ variant: "subtitle1" }}
            />
            <CardContent>
                <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="h6" component="div">
                    $1,250
                </Typography>
                <Typography variant="body2" color="#64748b">
                    / $2,000
                </Typography>
                </Box>
                <LinearProgress
                variant="determinate"
                value={62.5}
                sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="body2" color="text.secondary" mt={1}>
                Monthly budget
                </Typography>
            </CardContent>
            </Card>
        </Grid>
        </Grid>

          {/* Quick Actions */}
        <Box mt={6} textAlign="center">
        <Typography variant="h5" gutterBottom>
            Quick Actions
        </Typography>
        <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
            <Button LinkComponent={Link} to="/new-transactions" variant="outlined">New Transaction</Button>
            <Button LinkComponent={Link} to="/savings-account" variant="outlined">View Savings</Button>
            <Button LinkComponent={Link} to="/track-expenses" variant="outlined">Track Expenses</Button>
        </Box>
        </Box>
    </Container>
    </>
);
};

    export default HomePage;
