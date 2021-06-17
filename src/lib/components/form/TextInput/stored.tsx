import {InputItem} from "../../../store";
import Input, {Props as InputProps} from '.';
import {memo} from "../../../utilities/memo";


interface Props extends Omit<InputProps, 'value' | 'onChange'> {
  instance: InputItem;
  label?: string;
}

function StoredTextInput({
  instance,
  ...props
}: Props): React.ReactElement {

  return (
    <Input
      value={instance.editingValue}
      onChange={instance.handleChange}
      {...props}
    />
  )
}

export default memo(StoredTextInput);