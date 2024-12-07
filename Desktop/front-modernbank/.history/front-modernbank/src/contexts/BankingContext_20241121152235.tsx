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
    deposit: (amount: number, accountType: keyof BankingData) => void;
    withdraw: (amount: number, accountType: keyof BankingData) => void;
}

const BankingContext = createContext<BankingContextType | undefined>(undefined);

export const useBanking = () => {
    const context = useContext(BankingContext);
    if(!context){
        throw new Error('useBanking must be used with BankingProvider')
    }
    return context;
}

export const BankingProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const {user} = useAuth();
    const [bankingData, setBankingData] = useState<BankingData>({
        checking:{balance: 0, transactions:[]},
        savings:{ba}
    })
}