import {useMemo} from 'react';
import {Input, StyledTextInput} from './styles';
import {v4 as uuid} from 'uuid';
import {Label} from '../base-input-styles';
import {memo} from '../../../utilities';


export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function TextInputComponent({label, className, ...props}: Props): React.ReactElement {
  const inputId = useMemo(uuid, []);

  return (
    <div className={className}>
      {label
        ? <Label htmlFor={inputId}>
          {label}
        </Label>
        : null}
      <Input {...props} id={inputId}/>
    </div>
  )
}

export default memo(TextInputComponent, StyledTextInput);
export {default as StoredTextInput} from './stored';