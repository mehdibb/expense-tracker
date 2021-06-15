import {makeAutoObservable} from "mobx";
import React from "react";
import {SelectBoxItemType} from "../components";
import {monthMap} from "../utilities";
import {Transaction} from "../utilities/types";


const LOCAL_STORAGE_TRANSACTIONS_KEY = 'transactions';
const LOCAL_STORAGE_INITIAL_BALANCE_KEY = 'initial-balance';

export default class Store {
  public transactions: Transaction[];

  public initialBalance: string;

  public editingInitialBalance: string;

  public activeYearFilterItem: SelectBoxItemType;

  public monthFilterItems: SelectBoxItemType[] = [
    ...Object.entries(monthMap).map(([id, month]) => ({id, text: month})),
    {
      id: 'all',
      text: 'All'
    }
  ]
  
  public activeMonthFilterItem: SelectBoxItemType;

  public typeFilterItems: SelectBoxItemType[] = [
    {
      id: 'income',
      text: 'Income'
    },
    {
      id: 'expense',
      text: 'Expense'
    },
    {
      id: 'all',
      text: 'All'
    }
  ]

  public activeTypeFilterItem: SelectBoxItemType;

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

    this.activeYearFilterItem = this.yearFilterItems.find(({id}) => id === 'all') as SelectBoxItemType;
    this.activeMonthFilterItem = this.monthFilterItems.find(({id}) => id === 'all') as SelectBoxItemType;
    this.activeTypeFilterItem = this.typeFilterItems.find(({id}) => id === 'all') as SelectBoxItemType;
    
    // TODO: write a reaction to update the localStorage transactions when this.transactions are updated
  }
  
  public setEditingInitialBalance(event: React.ChangeEvent<HTMLInputElement>): void {
    if (
      parseInt(event.target.value) < 0 ||
      event.target.value.length >= (Number.MAX_SAFE_INTEGER).toString().length - 1
    ) {
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

  public setActiveYearFilterItem(activeItem: SelectBoxItemType): void {
    this.activeYearFilterItem = activeItem;
  }

  public setActiveMonthFilterItem(activeItem: SelectBoxItemType): void {
    this.activeMonthFilterItem = activeItem;
  }

  public setActiveTypeFilterItem(activeItem: SelectBoxItemType): void {
    this.activeTypeFilterItem = activeItem;
  }
  
  public get balance(): number {
    return parseInt(this.initialBalance) + 
      this.transactions.reduce((total, {amount}) => total + amount, 0);
  }

  public get transactionsDateMap(): Record<string, Record<string, Transaction[]>> {
    return this.transactions
    .filter(({date}) => this.activeYearFilterItem.id === 'all' ||
      date.getFullYear().toString() === this.activeYearFilterItem.id)
    .filter(({date}) => this.activeMonthFilterItem.id === 'all' ||
      date.getMonth().toString() === this.activeMonthFilterItem.id)
    .filter(({amount}) => this.activeTypeFilterItem.id === 'all' ||
      (this.activeTypeFilterItem.id === 'income' ? amount > 0 : amount < 0)
      )
    .reduce((accumulator, transaction) => {
      return {
        ...accumulator,
        [transaction.date.getFullYear()]: {
          ...accumulator[transaction.date.getFullYear()] || [],
          [transaction.date.getMonth()]: [
            ...accumulator[transaction.date.getFullYear()]?.[transaction.date.getMonth()] || [],
            transaction
          ]
        }
      }
    }, {} as Record<string, Record<string, Transaction[]>>);
  }

  public get yearFilterItems(): SelectBoxItemType[] {
    return [
      ...[
        ...new Set(
          this.transactions.map(({date}) => date.getFullYear()),
        )
      ].sort((firstYear, secondYear) => secondYear - firstYear)
      .map((year) => ({
        id: year.toString(),
        text: year.toString()
      })),
      {
        id: 'all',
        text: 'All'
      }
    ]
  }
  
  private setLocalStorageTransactions(): void {
    localStorage.setItem(LOCAL_STORAGE_TRANSACTIONS_KEY, JSON.stringify(this.transactions));
  }

  private setLocalStorageInitialBalance(): void {
    localStorage.setItem(LOCAL_STORAGE_INITIAL_BALANCE_KEY, JSON.stringify(this.initialBalance));
  }
}