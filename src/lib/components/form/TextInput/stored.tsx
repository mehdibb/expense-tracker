import {InputItem} from "_/store";
import Input, {Props as InputProps} from '.';
import {memo} from "_/utilities/memo";


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
      error={instance.customError}
      {...props}
    />
  )
}

export default memo(StoredTextInput);