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
    transactions: Transaction[];
}
interface BankingData{
    checking: AccountData
    savings: AccountData
    investement: AccountData
}
interface BankingContextType{
    bankingData: BankingData;
    isLoading: boolean;
    error: string | null;
    
}