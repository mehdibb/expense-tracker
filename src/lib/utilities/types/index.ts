export enum TransactionDirection {
  Income,
  Expense
}

export interface Transaction {
  date: Date;
  amount: number;
  description: string;
  id: string;
}
