import React, {useCallback, useMemo} from 'react';
import {Select, StyledSelectBox, SelectWrapper, IconWrapper} from './styles';
import {v4 as uuid} from 'uuid';
import {Label} from '../base-input-styles';
import {ArrowDropDown} from '../../../assets/images';
import {memo} from '../../../utilities';


interface ItemType {
  id: string;
  text: string;
}

export interface Props {
  items: ItemType[];
  onActiveItemChange: (value: ItemType) => void;
  activeItem?: ItemType;
  label?: string;
  className?: string;
}

function SelectBoxComponent({
  activeItem,
  items,
  onActiveItemChange,
  className,
  label,
}: Props): React.ReactElement {
  const inputId = useMemo(uuid, []);
  
  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    onActiveItemChange(items.find(({id}) => event.target.value === id) as ItemType);
  }, [onActiveItemChange, items])
  
  return (
    <div className={className}>
      {label
        ? <Label htmlFor={inputId}>
          {label}
        </Label>
        : null}
        <SelectWrapper>
          <Select onChange={handleChange} value={activeItem?.id} defaultValue={activeItem ? undefined : "default"}>
            {items.map(({id, text}) => (
              <option key={id} value={id}>{text}</option>
            ))}
            {activeItem
              ? null
              : <option disabled hidden value="default"/>}
          </Select>
          <IconWrapper><ArrowDropDown /></IconWrapper>
        </SelectWrapper>
    </div>
  )
}

export default memo(SelectBoxComponent, StyledSelectBox);
export type {ItemType};
export {default as StoredSelectBox} from './stored';