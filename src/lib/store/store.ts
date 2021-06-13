import {makeAutoObservable, observable} from "mobx";
import {Transaction} from "../utilities/types";


const LOCAL_STORAGE_TRANSACTIONS_KEY = 'transactions';

export default class Store {
  public transactions: Transaction[];

  public constructor() {
    makeAutoObservable(this, {transactions: observable.shallow});
    const transactions = localStorage.getItem(LOCAL_STORAGE_TRANSACTIONS_KEY);

    if (transactions) {
      // TODO: implement a Transaction class to move this inside its constructor
      this.transactions = (JSON.parse(transactions) as Transaction[]).map((transaction) => ({
        ...transaction,
        date: new Date(transaction.date),
      }));
    }
    else {
      this.transactions = [];
      this.setLocalStorageTransactions();
    }
  }

  public createTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
    this.setLocalStorageTransactions();
  }
  
  private setLocalStorageTransactions(): void {
    localStorage.setItem(LOCAL_STORAGE_TRANSACTIONS_KEY, JSON.stringify(this.transactions));
  }
}