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
    const [exo, setexo] = useState(second)
return (
    <div>
        
    </div>
)
}

export default TrackExpenses
