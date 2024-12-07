import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  fromAccount: string;
  toAccount: string;
  goalName?: string;
  goalAmount?: number;
}

interface Account {
  id: string;
  type: 'checking' | 'savings' | 'investment';
  balance: number;
  transactions: Transaction[];
  goalName?: string; // Only for savings accounts
  goalAmount?: number; // Only for savings accounts
}

interface BankingData {
  accounts: Account[];
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
  const [bankingData, setBankingData] = useState<BankingData>({ accounts: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBankingData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockData: BankingData = {
        accounts: [
          { id: 'checking', type: 'checking', balance: 1000, transactions: [] },
          { id: 'savings-emergency', type: 'savings', balance: 5000, transactions: [], goalName: 'Emergency Fund', goalAmount: 10000 },
          { id: 'savings-vacation', type: 'savings', balance: 2000, transactions: [], goalName: 'Vacation Fund', goalAmount: 5000 },
          { id: 'investment', type: 'investment', balance: 10000, transactions: [] },
        ],
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
      setBankingData({ accounts: [] });
      setIsLoading(false);
    }
  }, [user]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    switch (transaction.type) {
      case 'deposit':
        handleDeposit(newTransaction);
        break;
      case 'withdrawal':
        handleWithdrawal(newTransaction);
        break;
      case 'transfer':
        handleTransfer(newTransaction);
        break;
      default:
        throw new Error(`Unknown transaction type: ${transaction.type}`);
    }
  };

  const handleDeposit = (transaction: Transaction) => {
    setBankingData(prevData => {
      const accounts = [...prevData.accounts];
      const account = accounts.find(acc => acc.id === transaction.toAccount);

      if (!account) throw new Error(`Account ${transaction.toAccount} not found`);
      account.balance += transaction.amount;
      account.transactions.unshift(transaction);

      return { accounts };
    });
  };

  const handleWithdrawal = (transaction: Transaction) => {
    setBankingData(prevData => {
      const accounts = [...prevData.accounts];
      const account = accounts.find(acc => acc.id === transaction.fromAccount);

      if (!account) throw new Error(`Account ${transaction.fromAccount} not found`);
      account.balance -= transaction.amount;
      account.transactions.unshift(transaction);

      return { accounts };
    });
  };

  const handleTransfer = (transaction: Transaction) => {
    setBankingData(prevData => {
      const accounts = [...prevData.accounts];
      const fromAccount = accounts.find(acc => acc.id === transaction.fromAccount);
      const toAccount = accounts.find(acc => acc.id === transaction.toAccount);

      if (!fromAccount || !toAccount) throw new Error('Invalid accounts for transfer');
      fromAccount.balance -= transaction.amount;
      fromAccount.transactions.unshift(transaction);

      toAccount.balance += transaction.amount;
      toAccount.transactions.unshift(transaction);

      return { accounts };
    });
  };

  const refreshBankingData = fetchBankingData;

  return (
    <BankingContext.Provider value={{ bankingData, isLoading, error, addTransaction, refreshBankingData }}>
      {children}
    </BankingContext.Provider>
  );
};
