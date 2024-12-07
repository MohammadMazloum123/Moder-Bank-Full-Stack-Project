import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axiosInstance from '../lib/axios';

interface Transaction {
    id: string;
    description: string;
    amount: number;
    date: string;
    type: 'deposit' | 'withdrawal' | 'transfer';
    fromAccount: string;
    toAccount: string;
}

interface AccountData {
    balance: number;
    transactions: Transaction[];
}

interface Expense {
    id: number;
    description: string;
    amount: number;
    category: string;
    date: string;
}

interface SavingsAccountData extends AccountData {
    goalName: string;
    goalAmount: number;
}

interface BankingData {
    checking: AccountData;
    savings: { [accountName: string]: SavingsAccountData };
    investment: AccountData;
    expenses: Expense[];
}

type AccountType = keyof BankingData | `savings-${string}`;

interface BankingContextType {
    bankingData: BankingData;
    isLoading: boolean;
    error: string | null;
    addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => Promise<{ success: boolean; message: string }>;
    refreshBankingData: () => Promise<void>;
    addSavingsAccount: (name: string, goalName: string, goalAmount: number) => Promise<{ success: boolean; message: string }>;
    contributeSavings: (accountName: string, amount: number) => Promise<{ success: boolean; message: string }>;
    addExpense: (expense: Omit<Expense, 'id' | 'date'>) => Promise<{ success: boolean; message: string }>;
    deleteExpense: (id: number) => Promise<{ success: boolean; message: string }>;
}

const BankingContext = createContext<BankingContextType | undefined>(undefined);

export const useBanking = () => {
    const context = useContext(BankingContext);
    if (!context) {
        throw new Error('useBanking must be used within a BankingProvider');
    }
    return context;
};

export const BankingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [bankingData, setBankingData] = useState<BankingData>({
        checking: { balance: 0, transactions: [] },
        savings: {},
        investment: { balance: 0, transactions: [] },
        expenses: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBankingData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get('/banking/data');
            setBankingData(response.data);
        } catch (error) {
            setError('Failed to fetch banking data');
            console.error('Error fetching banking data:', error);
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
                savings: {},
                investment: { balance: 0, transactions: [] },
                expenses: [],
            });
            setIsLoading(false);
        }
    }, [user]);

    const addTransaction = async (transaction: Omit<Transaction, 'id' | 'date'>): Promise<{ success: boolean; message: string }> => {
        try {
            const response = await axiosInstance.post('/banking/transaction', transaction);
            const newTransaction = response.data;

            setBankingData(prevData => {
                const newData = { ...prevData };

                const updateAccount = (accountType: string, amount: number) => {
                    if (accountType.startsWith('savings-')) {
                        const savingsName = accountType.replace('savings-', '');
                        if (newData.savings[savingsName]) {
                            newData.savings[savingsName].balance += amount;
                            newData.savings[savingsName].transactions.unshift(newTransaction);
                        }
                    } else if (accountType === 'checking' || accountType === 'investment') {
                        newData[accountType].balance += amount;
                        newData[accountType].transactions.unshift(newTransaction);
                    }
                };

                if (transaction.type === 'transfer') {
                    updateAccount(transaction.fromAccount, -transaction.amount);
                    updateAccount(transaction.toAccount, transaction.amount);
                } else if (transaction.type === 'deposit') {
                    updateAccount(transaction.toAccount, transaction.amount);
                } else if (transaction.type === 'withdrawal') {
                    updateAccount(transaction.fromAccount, -transaction.amount);
                }

                return newData;
            });

            return { success: true, message: 'Transaction completed successfully.' };
        } catch (error) {
            console.error('Error processing transaction:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Error processing transaction. Please try again.'
            };
        }
    };

    const addSavingsAccount = async (name: string, goalName: string, goalAmount: number): Promise<{ success: boolean; message: string }> => {
        try {
            const response = await axiosInstance.post('/banking/savings', { name, goalName, goalAmount });
            const newSavingsAccount = response.data;
            setBankingData(prevData => ({
                ...prevData,
                savings: {
                    ...prevData.savings,
                    [name]: newSavingsAccount
                }
            }));
            return { success: true, message: 'Savings Account Added Successfully!' };
        } catch (error) {
            console.error('Error adding savings account:', error);
            return { success: false, message: 'Failed to add savings account. Please try again.' };
        }
    };

    const contributeSavings = async (accountName: string, amount: number): Promise<{ success: boolean; message: string }> => {
        return addTransaction({
            description: `Contribution to ${accountName}`,
            amount,
            type: 'transfer',
            fromAccount: 'checking',
            toAccount: `savings-${accountName}`,
        });
    };

    const addExpense = async (expense: Omit<Expense, 'id' | 'date'>): Promise<{ success: boolean; message: string }> => {
        try {
            const response = await axiosInstance.post('/banking/expense', expense);
            const newExpense = response.data;

            setBankingData(prevData => ({
                ...prevData,
                expenses: [newExpense, ...prevData.expenses]
            }));

            return { success: true, message: 'Expense added successfully.' };
        } catch (error) {
            console.error('Error adding expense:', error);
            return { success: false, message: 'Failed to add expense. Please try again.' };
        }
    };

    const deleteExpense = async (id: number): Promise<{ success: boolean; message: string }> => {
        try {
            await axiosInstance.delete(`/banking/expense/${id}`);

            setBankingData(prevData => ({
                ...prevData,
                expenses: prevData.expenses.filter(expense => expense.id !== id)
            }));

            return { success: true, message: 'Expense deleted successfully.' };
        } catch (error) {
            console.error('Error deleting expense:', error);
            return { success: false, message: 'Failed to delete expense. Please try again.' };
        }
    };

    return (
        <BankingContext.Provider value={{
            bankingData,
            isLoading,
            error,
            addTransaction,
            refreshBankingData: fetchBankingData,
            addSavingsAccount,
            contributeSavings,
            addExpense,
            deleteExpense,
        }}>
            {children}
        </BankingContext.Provider>
    );
};

