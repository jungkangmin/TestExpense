import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Expense {
  id: string;
  amount: number;
  description: string;
  paymentMethod: string;
  timestamp: string;
}

interface ExpenseContextData {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id' | 'timestamp'>) => void;
}

const ExpenseContext = createContext<ExpenseContextData | undefined>(undefined);

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Omit<Expense, 'id' | 'timestamp'>) => {
    setExpenses([...expenses, { ...expense, id: Date.now().toString(), timestamp: new Date().toISOString() }]);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};
