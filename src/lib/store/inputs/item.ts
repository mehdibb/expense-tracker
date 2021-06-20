import {action, makeObservable, observable} from 'mobx';
import {ChangeEvent} from 'react';


export default class InputItem {
  public value: string;

  public editingValue: string;

  public required: boolean;

  public customError?: string;

  public constructor(initialValue?: string, required = false) {
    makeObservable(this, {
      commit: action.bound,
      editingValue: observable,
      handleChange: action.bound,
      rollback: action.bound,
      setEditingValue: action.bound,
      setValue: action.bound,
      value: observable,
      customError: observable,
      setCustomError: action.bound,
      clearCustomError: action.bound,
    });
    if (initialValue != null) {
      this.value = initialValue;
      this.editingValue = this.value;
    }
    else {
      this.value = '';
      this.editingValue = '';
    }
    this.required = required;
  }

  public handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    this.setEditingValue(event.target.value);
  }
  
  public setValue(value: string): void {
    this.value = value;
    this.editingValue = this.value;
  }

  public setEditingValue(value: string): void {
    this.editingValue = value;
  }

  public setCustomError(errorValue: string): void {
    this.customError = errorValue;
  }

  public clearCustomError(): void {
    this.customError = undefined;
  }
  
  public commit(): void {
    this.value = this.editingValue;
  }

  public rollback(): void {
    this.editingValue = this.value;
  }

  public get isValid(): boolean {
    return !this.required && this.editingValue !== '' && !this.customError
  }
}
