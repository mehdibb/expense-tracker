import {SelectableItem} from "../../../store";
import SelectBox, {Props as SelectBoxProps} from '.';
import {memo} from "../../../utilities/memo";


interface Props extends Omit<SelectBoxProps, 'items' | 'onActiveItemChange'> {
  instance: SelectableItem;
  label?: string;
}

function StoredTextInput({
  instance,
  ...props
}: Props): React.ReactElement {

  return (
    <SelectBox
      activeItem={instance.editingItem}
      items={instance.items}
      onActiveItemChange={instance.setEditingItem}
      {...props}
    />
  )
}

export default memo(StoredTextInput);