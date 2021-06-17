import InputItem from './item';


export default class DateItem extends InputItem {
  public get dateValue(): Date {
    return new Date(this.value);
  }

  public get dateEditingValue(): Date {
    return new Date(this.editingValue);
  }
}