import {makeAutoObservable} from "mobx";
import React from "react";
import {Transaction} from "../utilities/types";


const LOCAL_STORAGE_TRANSACTIONS_KEY = 'transactions';
const LOCAL_STORAGE_INITIAL_BALANCE_KEY = 'initial-balance';

export default class Store {
  public transactions: Transaction[];

  public initialBalance: string;

  public editingInitialBalance: string;

  public constructor() {
    makeAutoObservable(this, {}, {autoBind: true});
    const transactions = localStorage.getItem(LOCAL_STORAGE_TRANSACTIONS_KEY);
    const initialBalance = localStorage.getItem(LOCAL_STORAGE_INITIAL_BALANCE_KEY);

    if (transactions != null) {
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

    if (initialBalance != null) {
      this.initialBalance = JSON.parse(initialBalance);
    }
    else {
      this.initialBalance = "0";
      this.setLocalStorageInitialBalance();
    }
    this.editingInitialBalance = this.initialBalance;

    // TODO: write a reaction to update the localStorage transactions when this.transactions are updated
  }
  
  public setEditingInitialBalance(event: React.ChangeEvent<HTMLInputElement>): void {
    if (parseInt(event.target.value) < 0) {
      return;
    }
    // FIXME: 2 decimals should be allowed as well
    this.editingInitialBalance = parseInt(event.target.value || "0").toString();
  }

  public updateInitialBalance(): void {
    this.initialBalance = this.editingInitialBalance;
    this.setLocalStorageInitialBalance();
  }

  public rollback(): void {
    this.editingInitialBalance = this.initialBalance;
  }

  public createTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
    this.setLocalStorageTransactions();
  }
  
  public get balance(): number {
    return parseInt(this.initialBalance) + 
      this.transactions.reduce((total, {amount}) => total + amount, 0);
  }
  
  private setLocalStorageTransactions(): void {
    localStorage.setItem(LOCAL_STORAGE_TRANSACTIONS_KEY, JSON.stringify(this.transactions));
  }

  private setLocalStorageInitialBalance(): void {
    localStorage.setItem(LOCAL_STORAGE_INITIAL_BALANCE_KEY, JSON.stringify(this.balance));
  }
}