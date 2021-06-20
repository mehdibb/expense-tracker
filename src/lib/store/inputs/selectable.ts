import {action, computed, makeObservable, observable} from 'mobx';
import {SelectBoxItemType} from '#';
import InputItem from './item';


export default class SelectableItem extends InputItem {
  public items: SelectBoxItemType[];
  
  public constructor(
    constructorArgs: ConstructorParameters<typeof InputItem>[0],
    items: SelectBoxItemType[],
  ) {
    super(constructorArgs);
    makeObservable(this, {
      selectedItem: computed,
      editingItem: computed,
      setEditingItem: action.bound,
      items: observable,
    });
    this.items = items;
  }

  public get selectedItem(): SelectBoxItemType | undefined {
    return this.items.find(({id}) => id === this.value);
  }

  public get editingItem(): SelectBoxItemType | undefined{
    return this.items.find(({id}) => id === this.editingValue);
  }

  public setEditingItem(item: SelectBoxItemType): void {
    this.setEditingValue(item.id);
  }
}
