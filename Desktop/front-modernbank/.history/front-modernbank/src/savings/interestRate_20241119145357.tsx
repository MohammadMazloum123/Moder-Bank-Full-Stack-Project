import React from 'react';
import {
    Typography,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
    Card,
    CardContent,
    Button,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for interest rates
const interestRates = [
    { product: 'Standard Savings', rate: 0.05, minBalance: 0 },
    { product: 'High-Yield Savings', rate: 0.5, minBalance: 1000 },
    { product: 'Money Market', rate: 0.8, minBalance: 5000 },
    { product: 'Certificate of Deposit (1 Year)', rate: 1.2, minBalance: 500 },
    { product: 'Certificate of Deposit (5 Year)', rate: 2.0, minBalance: 500 },
];

// Data for the comparison chart
const comparisonData = [
    { name: 'Standard Savings', rate: 0.05 },
    { name: 'High-Yield Savings', rate: 0.5 },
    { name: 'Money Market', rate: 0.8 },
    { name: 'CD (1 Year)', rate: 1.2 },
    { name: 'CD (5 Year)', rate: 2.0 },
    { name: 'National Average', rate: 0.3 },
];

const InterestRate = () => {
return (
    <Box sx={{minWidth:1200, mx:'auto', p:3}}>
        <Typography variant='h4' component="h1" gutterBottom sx={{fontWeight:'bold', mb:3}}>
            Savings Interest Rates
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                <TableContainer component={Paper} elevation={3}>
                    <Table sx={{minWidth:650}} aria-label='interest rates table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Savings Product</TableCell>
                                <TableCell align='right'>Interest Rate (APY)</TableCell>
                                <TableCell align='right'>Minimum Balance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {interestRates.map((row) => (
                                <TableRow key={row.product}>
                                    <TableCell component="th" scope='row'>
                                        {row.product}
                                    </TableCell>
                                    <TableCell align='right'>{(row.rate * 100).toFixed(2)}%</TableCell>
                                    <TableCell align='right'>${row.minBalance.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card elevation={3}>
                    <CardContent>
                        <Typography variant='h6' gutterBottom>
                            Why Our Rates Matters
                        </Typography>
                        <Typography variant="body2" sx={{color:"#64748b"}} paragraph>
                            Our competitive interest rates help your money grow faster. With higher returns on your savings, you can reach your financial goals sooner.
                        </Typography>
                        <Typography variant="body2" sx={{color:"#64748b"}} paragraph>
                            We regularly review and adjust our rates to ensure you're getting the best possible returns on your savings.
                        </Typography>
                        <Button variant="contained" color="primary">
                            Open a Savings Account
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{p:3}}>
                    <Typography variant='h6' gutterBottom>
                        Interest Rate Comparison
                    </Typography>
                    <Box sx={{height:400}}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                            data={comparisonData}
                            margin={{
                                top:20,
                                right:30,
                                left:20,
                                bottom:5
                            }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="rate" fill="#8884d8" name="Interest Rate (%)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Important Information
            </Typography>
            <Typography variant="body2" paragraph>
              Annual Percentage Yield (APY) is accurate as of {new Date().toLocaleDateString()}. Rates may change after the account is opened. Fees could reduce earnings on the account. Minimum balance requirements may apply.
            </Typography>
            <Typography variant="body2" paragraph>
              For Certificates of Deposit (CDs), there may be a penalty for early withdrawal. Please consult with a bank representative for full terms and conditions.
            </Typography>
            <Typography variant="body2">
              The National Average rate is based on the FDIC's published national rates and is provided for comparison purposes only.
            </Typography>
          </Paper>
        </Grid>
        </Grid>
    </Box>
)
}

export default InterestRate
