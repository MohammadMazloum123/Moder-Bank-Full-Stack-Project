import React, { useState, useEffect } from 'react';
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
    const [expensesByCategory, setExpensesByCategory] = useState([]);

    useEffect(() => {
        calculateTotalExpenses();
        calculateExpensesByCategory();
    }, [expenses])
    const calculateTotalExpenses = () => {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        setTotalexpenses(total);
    }
    const calculateExpensesByCategory = () => {
        const categoryTotals = expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});
        const data = Object.keys(categoryTotals).map(category => ({
            name: category,
            
        }))
    }
return (
    <div>
        
    </div>
)
}

export default TrackExpenses
