import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext.tsx';

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
        checking:{ balance: 0, transactions: []},
        savings:{ balance: 0, transactions: []},
        investement:{ balance: 0, transactions: []}
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBankingData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          // In a real application, you would make an API call to fetch the user's banking data
          // For this example, we'll simulate an API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockData: BankingData = {
            checking: { balance: 1000, transactions: [] },
            savings: { balance: 5000, transactions: [] },
            investement: { balance: 10000, transactions: [] },
        };
            setBankingData(mockData);
        } catch (err) {
            setError('Failed to fetch banking data');
        } finally {
            setIsLoading(false);
        }
    };
    
        useEffect(() => {
        if (user) {
            fetchBankingData();
        } else {
            setBankingData({
            checking: { balance: 0, transactions: [] },
            savings: { balance: 0, transactions: [] },
            investement: { balance: 0, transactions: [] },
            });
            setIsLoading(false);
        }
        }, [user]);
    
    const updateBalance = (accountType: keyof BankingData, amount: number) => {
        setBankingData(prev => ({
            ...prev,
            [accountType]: {
            ...prev[accountType],
            balance: prev[accountType].balance + amount,
            transactions: [
            {
                id: Date.now(),
                description: amount > 0 ? 'Deposit' : 'Withdrawal',
                amount: Math.abs(amount),
                date: new Date().toISOString(),
            },
            ...prev[accountType].transactions,
            ],
        },
        }));
    };
    
    const deposit = (amount: number, accountType: keyof BankingData) => {
        updateBalance(accountType, amount);
    };
    
    const withdraw = (amount: number, accountType: keyof BankingData) => {
        updateBalance(accountType, -amount);
    };
    
    const refreshBankingData = fetchBankingData;
    
    return (
        <BankingContext.Provider value={{ bankingData, isLoading, error, deposit, withdraw, refreshBankingData }}>
            {children}
        </BankingContext.Provider>
    );
};

