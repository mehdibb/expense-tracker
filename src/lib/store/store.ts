import {makeAutoObservable} from "mobx";
import {ChangeEvent} from "react";
import {SelectBoxItemType} from "../components";
import {monthMap} from "../utilities";
import {Transaction, TransactionStoringParams} from ".";
import {InputItem} from "./inputs";


const LOCAL_STORAGE_TRANSACTIONS_KEY = 'transactions';
const LOCAL_STORAGE_INITIAL_BALANCE_KEY = 'initial-balance';

class InitialBalance extends InputItem {
  public handleChange(event: ChangeEvent<HTMLInputElement>): void {
    if (
      // FIXME: 2 decimals should be allowed as well
      parseInt(event.target.value) < 0 ||
      event.target.value.length >= (Number.MAX_SAFE_INTEGER).toString().length - 1
    ) {
      return;
    }
    
    this.setEditingValue(parseInt(event.target.value || "0").toString())
  }
}

export default class Store {
  public transactions: Transaction[];

  public initialBalance = new InitialBalance();

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

  public creatingTransaction?: Transaction;

  public updatingTransaction?: Transaction;
  
  public constructor() {
    makeAutoObservable(this, {}, {autoBind: true});
    const transactions = localStorage.getItem(LOCAL_STORAGE_TRANSACTIONS_KEY);
    const initialBalance = localStorage.getItem(LOCAL_STORAGE_INITIAL_BALANCE_KEY);

    if (transactions != null) {
      this.transactions = (JSON.parse(transactions) as TransactionStoringParams[])
        .map((transaction) => new Transaction(transaction));
    }
    else {
      this.transactions = [];
      this.setLocalStorageTransactions();
    }

    if (initialBalance != null && initialBalance !== "") {
      this.initialBalance.setValue(JSON.parse(initialBalance));
    }
    else {
      this.setLocalStorageInitialBalance();
    }

    this.activeYearFilterItem = this.yearFilterItems.find(({id}) => id === 'all') as SelectBoxItemType;
    this.activeMonthFilterItem = this.monthFilterItems.find(({id}) => id === 'all') as SelectBoxItemType;
    this.activeTypeFilterItem = this.typeFilterItems.find(({id}) => id === 'all') as SelectBoxItemType;
    
    // TODO: write a reaction to update the localStorage transactions when this.transactions are updated
  }

  public updateInitialBalance(): void {
    this.initialBalance.commit();
    this.setLocalStorageInitialBalance();
  }

  public rollbackInitialBalance(): void {
    this.initialBalance.rollback();
  }

  public createTransaction(): void {
    if (!this.creatingTransaction) {
      return;
    }
    this.creatingTransaction.commit();
    this.transactions.push(this.creatingTransaction);
    this.setLocalStorageTransactions();
    this.clearCreatingTransaction();
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

  public setCreatingTransaction(): void {
    this.creatingTransaction = new Transaction();
  }

  public clearCreatingTransaction(): void {
    this.creatingTransaction = undefined;
  }
  
  public setUpdatingTransaction(transaction: Transaction): void {
    this.updatingTransaction = transaction;
  }
  
  public get totalBalance(): number {
    return parseInt(this.initialBalance.value) + 
      this.transactions.reduce((total, {amount, transactionDirection}) => {
        return total + amount.integerValue * (transactionDirection.storingParam === 'income' ? 1 : -1)
      }, 0);
  }

  public get transactionsDateMap(): Record<string, Record<string, Transaction[]>> {
    return this.transactions
    .filter(({date}) => this.activeYearFilterItem.id === 'all' ||
      date.dateValue.getFullYear().toString() === this.activeYearFilterItem.id)
    .filter(({date}) => this.activeMonthFilterItem.id === 'all' ||
      date.dateValue.getMonth().toString() === this.activeMonthFilterItem.id)
    .filter(({transactionDirection}) => this.activeTypeFilterItem.id === 'all' ||
      (this.activeTypeFilterItem.id === transactionDirection.storingParam)
      )
    .reduce((accumulator, transaction) => {
      return {
        ...accumulator,
        [transaction.date.dateValue.getFullYear()]: {
          ...accumulator[transaction.date.dateValue.getFullYear()] || [],
          [transaction.date.dateValue.getMonth()]: [
            ...accumulator[transaction.date.dateValue.getFullYear()]?.[transaction.date.dateValue.getMonth()] || [],
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
          this.transactions.map(({date}) => date.dateValue.getFullYear()),
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
    localStorage.setItem(
      LOCAL_STORAGE_TRANSACTIONS_KEY,
      JSON.stringify(this.transactions.map((transaction) => transaction.storingParams)),
    );
  }

  private setLocalStorageInitialBalance(): void {
    localStorage.setItem(LOCAL_STORAGE_INITIAL_BALANCE_KEY, JSON.stringify(this.initialBalance.value || "0"));
  }
}