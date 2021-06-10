import {observable} from "mobx";
import {Transaction} from "../utilities/types";

export default class Store {
  @observable public transactions: Transaction[] = [
    {
      amount: 20000,
      date: new Date(),
      id: '1',
      description: 'description 1'
    },
    {
      amount: -1500,
      date :new Date(),
      id: '2',
      description: 'description 2'
    }
  ];
}