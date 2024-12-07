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
                                <TableCell></TableCell>
                                <TableCell>Inte</TableCell>
                                <TableCell>Minimum Balance</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    </Box>
)
}

export default InterestRate
