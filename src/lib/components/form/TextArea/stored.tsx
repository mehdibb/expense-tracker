import {InputItem} from "_/store";
import TextArea, {Props as InputProps} from '.';
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
    <TextArea
      value={instance.editingValue}
      onChange={instance.handleChange}
      {...props}
    />
  )
}

export default memo(StoredTextInput);