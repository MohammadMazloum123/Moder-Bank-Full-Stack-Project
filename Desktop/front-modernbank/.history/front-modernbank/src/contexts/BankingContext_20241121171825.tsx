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

interface SavingsAccountData extends AccountData {
    goalName: string;
    goalAmount: number;
}

interface BankingData {
    checking: AccountData;
    savings: { [accountName: string]: SavingsAccountData };
    investment: AccountData;
}

interface BankingContextType {
    bankingData: BankingData;
    isLoading: boolean;
    error: string | null;
    addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
    refreshBankingData: () => Promise<void>;
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
    });
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
    setBankingData({
        checking: { balance: 0, transactions: [] },
        savings: {},
        investment: { balance: 0, transactions: [] },
      });
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
      const newData = { ...prevData };

      // Update balances
      if (transaction.type === 'transfer') {
        newData[transaction.fromAccount].balance -= transaction.amount;
        if (transaction.toAccount.startsWith('savings-')) {
          const savingsAccountName = transaction.toAccount.replace('savings-', '');
          newData.savings[savingsAccountName].balance += transaction.amount;
        } else {
          newData[transaction.toAccount].balance += transaction.amount;
        }
      } else {
        const accountType = transaction.type === 'deposit' ? transaction.toAccount : transaction.fromAccount;
        if (accountType.startsWith('savings-')) {
          const savingsAccountName = accountType.replace('savings-', '');
          newData.savings[savingsAccountName].balance += transaction.type === 'deposit' ? transaction.amount : -transaction.amount;
        } else {
          newData[accountType].balance += transaction.type === 'deposit' ? transaction.amount : -transaction.amount;
        }
      }

      // Add transaction to relevant accounts
      if (transaction.fromAccount.startsWith('savings-')) {
        const savingsAccountName = transaction.fromAccount.replace('savings-', '');
        newData.savings[savingsAccountName].transactions.unshift(newTransaction);
      } else {
        newData[transaction.fromAccount].transactions.unshift(newTransaction);
      }

      if (transaction.toAccount && transaction.toAccount !== transaction.fromAccount) {
        if (transaction.toAccount.startsWith('savings-')) {
          const savingsAccountName = transaction.toAccount.replace('savings-', '');
          newData.savings[savingsAccountName].transactions.unshift(newTransaction);
        } else {
          newData[transaction.toAccount].transactions.unshift(newTransaction);
        }
      }

      return newData;
    });
  };

  const refreshBankingData = fetchBankingData;

  return (
    <BankingContext.Provider value={{ bankingData, isLoading, error, addTransaction, refreshBankingData }}>
      {children}
    </BankingContext.Provider>
  );
};