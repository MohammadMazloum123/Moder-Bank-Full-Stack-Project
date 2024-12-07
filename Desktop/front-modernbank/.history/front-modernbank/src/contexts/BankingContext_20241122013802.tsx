import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext.tsx';

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
    addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
    refreshBankingData: () => Promise<void>;
    addSavingsAccount: (name: string, goalName: string, goalAmount: number) => void;
    contributeSavings: (accountName: string, amount: number) => void;
    addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
    deleteExpense: (id: number) => void;
}

const BankingContext = createContext<BankingContextType | undefined>(undefined);

export const useBanking = () => {
    const context = useContext(BankingContext);
    if (!context) {
        throw new Error('useBanking must be used within a BankingProvider');
    }
    return context;
};

const initialBankingData: BankingData = {
    checking: { balance: 0, transactions: [] },
    savings: {},
    investment: { balance: 0, transactions: [] },
    expenses: [],
};

export const BankingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [bankingData, setBankingData] = useState<BankingData>(initialBankingData);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  const fetchBankingData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockData: BankingData = {
        checking: { balance: 1000, transactions: [] },
        savings: {
          'Emergency Fund': { balance: 5000, transactions: [], goalName: 'Emergency Savings', goalAmount: 10000 },
          'Vacation Fund': { balance: 2000, transactions: [], goalName: 'Summer Vacation', goalAmount: 5000 },
        },
        investment: { balance: 10000, transactions: [] },
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
      setBankingData(initialBankingData);
      setIsLoading(false);
    }
  }, [user]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    setBankingData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData)) as BankingData;

      const updateAccountBalance = (accountType: AccountType, amount: number) => {
        if (accountType === 'external') return;

        if (accountType.startsWith('savings-')) {
          const savingsAccountName = accountType.replace('savings-', '');
          if (newData.savings[savingsAccountName]) {
            newData.savings[savingsAccountName].balance += amount;
          } else {
            throw new Error(`Savings account ${savingsAccountName} not found`);
          }
        } else if (accountType in newData) {
          (newData[accountType] as AccountData).balance += amount;
        } else {
          throw new Error(`Account ${accountType} not found`);
        }
      };

      const addTransactionToAccount = (accountType: AccountType) => {
        if (accountType === 'external') return;

        if (accountType.startsWith('savings-')) {
          const savingsAccountName = accountType.replace('savings-', '');
          if (newData.savings[savingsAccountName]) {
            newData.savings[savingsAccountName].transactions.unshift(newTransaction);
          } else {
            throw new Error(`Savings account ${savingsAccountName} not found`);
          }
        } else if (accountType in newData) {
          (newData[accountType] as AccountData).transactions.unshift(newTransaction);
        } else {
          throw new Error(`Account ${accountType} not found`);
        }
      };

      try {
        if (transaction.type === 'transfer') {
          updateAccountBalance(transaction.fromAccount as AccountType, -transaction.amount);
          updateAccountBalance(transaction.toAccount as AccountType, transaction.amount);
        } else {
          const accountType = transaction.type === 'deposit' ? transaction.toAccount : transaction.fromAccount;
          updateAccountBalance(accountType as AccountType, transaction.type === 'deposit' ? transaction.amount : -transaction.amount);
        }

        addTransactionToAccount(transaction.fromAccount as AccountType);
        if (transaction.toAccount && transaction.toAccount !== transaction.fromAccount) {
          addTransactionToAccount(transaction.toAccount as AccountType);
        }
      } catch (error) {
        console.error('Error processing transaction:', error);
        return prevData; // Return previous state if there's an error
      }

      return newData;
    });
  };

  const addSavingsAccount = (name: string, goalName: string, goalAmount: number) => {
    setBankingData(prevData => {
      if (prevData.savings[name]) {
        console.error(`Savings account ${name} already exists`);
        return prevData;
      }
      return {
        ...prevData,
        savings: {
          ...prevData.savings,
          [name]: {
            balance: 0,
            transactions: [],
            goalName,
            goalAmount,
          },
        },
      };
    });
  };

  const contributeSavings = (accountName: string, amount: number) => {
    addTransaction({
      description: `Contribution to ${accountName}`,
      amount,
      type: 'transfer',
      fromAccount: 'checking',
      toAccount: `savings-${accountName}`,
    });
  };
  const addExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
    setBankingData(prevData => ({
      ...prevData,
      expenses: [
        ...prevData.expenses,
        {
          ...expense,
          id: Date.now(),
          date: new Date().toISOString(),
        },
      ],
    }));
  };

const deleteExpense = (id: number) => {
    setBankingData(prevData => ({
        ...prevData,
        expenses: prevData.expenses.filter(expense => expense.id !== id),
    }));
};

    const refreshBankingData = fetchBankingData;

return (
    <BankingContext.Provider value={{
        bankingData,
        isLoading,
        error,
        addTransaction,
        refreshBankingData,
        addSavingsAccount,
        contributeSavings,
        addExpense,
        deleteExpense,
    }}>
        {children}
    </BankingContext.Provider>
    );
};