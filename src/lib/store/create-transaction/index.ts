import {makeAutoObservable} from "mobx";
import React from "react";
import {SelectBoxItemType} from "../../components";
import {parseDateFromString, Transaction} from "../../utilities";
import {v4 as uuid} from 'uuid';


export default class Store {
  public amount = '';
  
  public note = '';
  
  public date = '';
  
  public readonly typeItems: SelectBoxItemType[] = [
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
  public typeActiveItem: SelectBoxItemType = this.typeItems
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
  
  public setTypeActiveItem = (item: SelectBoxItemType): void => {
    this.typeActiveItem = item;
  }

  get isValid(): boolean {
    return this.amount !== "" &&
      parseInt(this.amount) > 0 &&
      this.note !== "" &&
      this.date !== "";
  }
  
  get storingParams(): Transaction {
    return {
      amount: (this.typeActiveItem.id === 'expense' ? -1 : 1) * parseInt(this.amount),
      date: parseDateFromString(this.date),
      description: this.note,
      id: uuid(),
    }
  }
}