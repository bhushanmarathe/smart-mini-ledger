export interface Transaction {
  id: string;
  title: string;
  amount: string;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: string;
}

export interface Summary {
  income: number;
  expense: number;
  balance: number;
}

export interface CreateTransaction {
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: string;
}
