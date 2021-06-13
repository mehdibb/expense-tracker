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

interface Props<T> {
  items: T[];
  onActiveItemChange: (value: T) => void;
  activeItem: T;
  label?: string;
  className?: string;
}

function SelectBoxComponent<T extends ItemType>({
  activeItem,
  items,
  onActiveItemChange,
  className,
  label,
}: Props<T>): React.ReactElement {
  const inputId = useMemo(uuid, []);
  
  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    onActiveItemChange(items.find(({id}) => event.target.value === id) as T);
  }, [onActiveItemChange, items])
  
  return (
    <div className={className}>
      {label
        ? <Label htmlFor={inputId}>
          {label}
        </Label>
        : null}
        <SelectWrapper>
          <Select onChange={handleChange} value={activeItem.id}>
            {items.map(({id, text}) => (
              <option key={id} value={id}>{text}</option>
            ))}
          </Select>
          <IconWrapper><ArrowDropDown /></IconWrapper>
        </SelectWrapper>
    </div>
  )
}

export default memo(SelectBoxComponent, StyledSelectBox);
export type {ItemType};