import {Transaction as TransactionType} from "../utilities/types";
import {v4 as uuid} from 'uuid';
import {computed, makeAutoObservable, makeObservable} from "mobx";
import {InputItem, DateItem} from ".";
import {ChangeEvent} from "react";
import {SelectableItem} from "./inputs";
import {currencyFormat} from "../utilities";


class Amount extends InputItem {
  public constructor(...constructorArgs: ConstructorParameters<typeof InputItem>) {
    super(...constructorArgs);
    makeObservable(this, {
      integerValue: computed,
      integerEditingValue: computed,
    })
  }
  
  public get integerValue(): number {
    return parseInt(this.value);
  }

  public get integerEditingValue(): number {
    return parseInt(this.editingValue);
  }

  public handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    if (parseInt(event.target.value) < 0) {
      return;
    }
    super.handleChange(event);
  }
}

class TransactionDirection extends SelectableItem {
  public get storingParam(): 'income' | 'expense' {
    return this.value as 'income' | 'expense';
  }
}

export type StoringParams = Record<keyof TransactionType, string> & {direction: 'income' | 'expense'};

export default class Transaction {
  public amount: Amount;

  public date: DateItem;

  public description: InputItem;

  public id: string;

  public transactionDirection: TransactionDirection;
  
  public constructor(transaction?: StoringParams) {
    makeAutoObservable(this);
    this.transactionDirection = new TransactionDirection('', [
      {
        
        id: 'income',
        text: 'Income'
      },
      {
        id: 'expense',
        text: 'Expense'
      }
    ])
    if (transaction) {
      this.amount = new Amount(transaction.amount);
      this.date = new DateItem(transaction.date);
      this.description = new InputItem(transaction.description);
      this.id = transaction.id;
      this.transactionDirection.setValue(transaction.direction);
    }
    else {
      this.amount = new Amount();
      this.date = new DateItem();
      this.description = new InputItem();
      this.id = uuid();
    }
  }

  public commit(): void {
    this.amount.commit();
    this.date.commit();
    this.description.commit();
    this.transactionDirection.commit();
  }

  public rollback(): void {
    this.amount.rollback();
    this.date.rollback();
    this.description.commit();
    this.transactionDirection.rollback();
  }

  public get displayAmount(): string {
    return currencyFormat(this.amount.integerValue * (this.transactionDirection.value === 'income' ? 1 : -1), true);
  }
  
  public get isValid(): boolean {
    return this.amount.isValid &&
      this.date.isValid &&
      this.description.isValid &&
      this.transactionDirection.isValid;
  }

  public get storingParams(): StoringParams {
    return {
      amount: this.amount.value,
      date: this.date.value,
      description: this.description.value,
      id: this.id,
      direction: this.transactionDirection.storingParam,
    }
  }
}