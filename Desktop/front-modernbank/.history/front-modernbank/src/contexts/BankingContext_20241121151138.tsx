import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface Transaction {
    id: number;
    description: string;
    amount: number;
    date: string;
}
interface AccountData {
    balance: number;
    transaction
}