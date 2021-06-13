import {makeAutoObservable} from "mobx";
import React from "react";
import {SelectBoxItemType} from "../../components";
import {parseDateFromString, Transaction} from "../../utilities";
import {v4 as uuid} from 'uuid';


export default class Store {
  public amount = '';
  
  public note = '';
  
  public date = '';
  
  public readonly categoryItems: SelectBoxItemType[] = [
    {
      id: 'income',
      text: 'Income'
    },
    {
      id: 'expense',
      text: 'Expense'
    }
  ];
  
  // find method is used here to avoid referring to the income item using its index
  public categoryActiveItem: SelectBoxItemType = this.categoryItems
    .find(({id}) => id === 'income') as SelectBoxItemType;

  public constructor() {
    makeAutoObservable(this);
  }

  public setAmount = ({target: {value}}: React.ChangeEvent<HTMLInputElement>): void => {
    this.amount = value;
  }

  public setNote = ({target: {value}}: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.note = value;
  }
  
  public setDate = ({target: {value}}: React.ChangeEvent<HTMLInputElement>): void => {
    this.date = value;
  }
  
  public setCategoryActiveItem = (item: SelectBoxItemType): void => {
    this.categoryActiveItem = item;
  }

  get isValid(): boolean {
    return this.amount !== "" &&
      parseInt(this.amount) > 0 &&
      this.note !== "" &&
      this.date !== "";
  }
  
  get storingParams(): Transaction {
    return {
      amount: parseInt(this.amount),
      date: parseDateFromString(this.date),
      description: this.note,
      id: uuid(),
    }
  }
}