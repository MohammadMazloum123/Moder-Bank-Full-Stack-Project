'use client'

import React, { useState, useEffect, useCallback } from 'react';
import {
    Typography,
    Box,
    Paper,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useBanking } from '../../contexts/BankingContext';

const categories = ['Food', 'Utilities', 'Entertainment', 'Transportation', 'Other'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const TrackExpenses = () => {
    const { bankingData, addExpense, deleteExpense } = useBanking();
    const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: '' });
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [expensesByCategory, setExpensesByCategory] = useState(
        categories.map(category => ({ name: category, value: 0 }))
    );

    const calculateTotalExpenses = useCallback(() => {
        const total = bankingData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        setTotalExpenses(total);
    }, [bankingData.expenses]);
    
    const calculateExpensesByCategory = useCallback(() => {
        const categoryTotals = bankingData.expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});
        const data = Object.keys(categoryTotals).map(category => ({
            name: category,
            value: categoryTotals[category],
        }));
        setExpensesByCategory(data);
    }, [bankingData.expenses]);
    
    useEffect(() => {
        calculateTotalExpenses();
        calculateExpensesByCategory();
    }, [calculateTotalExpenses, calculateExpensesByCategory]);
    
    const handleAddExpense = () => {
        if (newExpense.amount && newExpense.category && newExpense.description) {
            addExpense({
                description: newExpense.description,
                amount: parseFloat(newExpense.amount),
                category: newExpense.category,
            });
            setNewExpense({ description: '', amount: '', category: '' });
        }
    };

    const handleDeleteExpense = (id: number) => {
        deleteExpense(id);
    };
    
    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
            <Typography component="h1" variant='h4' gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
                Expense Tracker
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <Typography variant='h6' gutterBottom>
                            Add New Expense
                        </Typography>
                        <TextField
                            fullWidth
                            margin='normal'
                            value={newExpense.description}
                            label="Description"
                            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            margin='normal'
                            value={newExpense.amount}
                            type='number'
                            label="Amount"
                            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={newExpense.category}
                                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value as string })}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>{category}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button variant='contained' color='primary' onClick={handleAddExpense} sx={{ mt: 2 }}>
                            Add Expense
                        </Button>
                    </Paper>
                    <Paper elevation={3} sx={{ maxWidth: 300, overflow: "auto", p: 3 }}>
                        <Typography variant='h6' gutterBottom>Recent Expenses</Typography>
                        <List>
                            {bankingData.expenses.map((expense) => (
                                <ListItem key={expense.id} divider>
                                    <ListItemText
                                        primary={expense.description}
                                        secondary={`${expense.category} - $${expense.amount.toFixed(2)}`}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label='delete' onClick={() => handleDeleteExpense(expense.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <Typography variant='h6' gutterBottom>Expenses Summary</Typography>
                        <Typography variant='h4' sx={{ mb: 2 }}>Total: ${totalExpenses.toFixed(2)}</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List dense sx={{ maxHeight: 200, overflow: "auto" }}>
                            {expensesByCategory.map((category) => (
                                <ListItem key={category.name}>
                                    <ListItemText primary={category.name} />
                                    <Typography variant='body2'>${category.value.toFixed(2)}</Typography>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                    <Paper elevation={3} sx={{ p: 3, height: 300 }}>
                        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>Expense Distribution</Typography>
                        <Box sx={{ height: 250 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={expensesByCategory}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {expensesByCategory.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Tra