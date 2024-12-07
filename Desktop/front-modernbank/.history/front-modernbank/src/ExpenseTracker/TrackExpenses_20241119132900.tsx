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

// Mock data for initial expenses
const initialExpenses = [
    { id: 1, description: 'Groceries', amount: 50, category: 'Food' },
    { id: 2, description: 'Electric Bill', amount: 80, category: 'Utilities' },
    { id: 3, description: 'Movie Tickets', amount: 30, category: 'Entertainment' },
    ];
    const categories = ['Food', 'Utilities', 'Entertainment', 'Transportation', 'Other'];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];


const TrackExpenses = () => {
    const [expenses, setExpenses] = useState(initialExpenses);
    const [newexpenses, setNewexpenses] = useState({description:'', amount:'', category:''})
    const [totalexpenses, setTotalexpenses] = useState(0);
    const [expensesByCategory, setExpensesByCategory] = useState(
        categories.map(category => ({ name: category, value: 0 }))
    );
    const calculateTotalExpenses = useCallback(() => {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        setTotalexpenses(total);
    }, [expenses]);
    
    const calculateExpensesByCategory = useCallback(() => {
        const categoryTotals = expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});
        const data = Object.keys(categoryTotals).map(category => ({
            name: category,
            value: categoryTotals[category],
        }));
        setExpensesByCategory(data);
    }, [expenses]);
    
    useEffect(() => {
        calculateTotalExpenses();
        calculateExpensesByCategory();
    }, [calculateTotalExpenses, calculateExpensesByCategory]);
    
    const handleAddExpenses = () => {
        if(newexpenses.amount && newexpenses.category && newexpenses.description){
            const expense = {
                id: expenses.length + 1,
                description: newexpenses.description,
                amount : parseFloat(newexpenses.amount),
                category: newexpenses.category,
            };
            setExpenses([...expenses, expense]);
            setNewexpenses({description:'', amount:'', category:''});
        }
    };
    const handleDeleteExpense = (id) => {
        setExpenses(expenses.filter(expense => expense.id !== id));
    };
    
return (
    <Box sx={{maxWidth:800, mx:'auto', p:3}}>
        <Typography component="h1" variant='h4' gutterBottom sx={{mb:3, fontWeight:'bold'}}>
            Expense Tracker
        </Typography>
        <Gri d>

        </Gri>
    </Box>
)
}

export default TrackExpenses
