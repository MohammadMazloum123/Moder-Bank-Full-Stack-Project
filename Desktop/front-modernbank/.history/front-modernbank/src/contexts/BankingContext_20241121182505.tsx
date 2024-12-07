import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './';

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
  addSavingsAccount: (name: string, goalName: string, goalAmount: number) => void;
  contributeSavings: (accountName: string, amount: number) => void;
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

      const updateAccountBalance = (accountType: string, amount: number) => {
        if (accountType === 'external') return;

        if (accountType.startsWith('savings-')) {
          const savingsAccountName = accountType.replace('savings-', '');
          if (newData.savings[savingsAccountName]) {
            newData.savings[savingsAccountName].balance += amount;
          } else {
            console.error(`Savings account ${savingsAccountName} not found`);
          }
        } else if (newData[accountType as keyof BankingData]) {
          (newData[accountType as keyof BankingData] as AccountData).balance += amount;
        } else {
          console.error(`Account ${accountType} not found`);
        }
      };

      const addTransactionToAccount = (accountType: string) => {
        if (accountType === 'external') return;

        if (accountType.startsWith('savings-')) {
          const savingsAccountName = accountType.replace('savings-', '');
          if (newData.savings[savingsAccountName]) {
            newData.savings[savingsAccountName].transactions.unshift(newTransaction);
          } else {
            console.error(`Savings account ${savingsAccountName} not found`);
          }
        } else if (newData[accountType as keyof BankingData]) {
          (newData[accountType as keyof BankingData] as AccountData).transactions.unshift(newTransaction);
        } else {
          console.error(`Account ${accountType} not found`);
        }
      };

      if (transaction.type === 'transfer') {
        updateAccountBalance(transaction.fromAccount, -transaction.amount);
        updateAccountBalance(transaction.toAccount, transaction.amount);
      } else {
        const accountType = transaction.type === 'deposit' ? transaction.toAccount : transaction.fromAccount;
        updateAccountBalance(accountType, transaction.type === 'deposit' ? transaction.amount : -transaction.amount);
      }

      addTransactionToAccount(transaction.fromAccount);
      if (transaction.toAccount && transaction.toAccount !== transaction.fromAccount) {
        addTransactionToAccount(transaction.toAccount);
      }

      return newData;
    });
  };

  const addSavingsAccount = (name: string, goalName: string, goalAmount: number) => {
    setBankingData(prevData => ({
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
    }));
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
    }}>
      {children}
    </BankingContext.Provider>
  );
};

