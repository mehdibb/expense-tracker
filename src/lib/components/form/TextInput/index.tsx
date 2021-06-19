import {useMemo} from 'react';
import {ErrorWrapper, Input, StyledTextInput} from './styles';
import {v4 as uuid} from 'uuid';
import {Label} from '../base-input-styles';
import {memo} from '_/utilities';


export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

function TextInputComponent({label, className, error, ...props}: Props): React.ReactElement {
  const inputId = useMemo(uuid, []);

  return (
    <div className={className}>
      {label
        ? <Label htmlFor={inputId}>
          {label}
        </Label>
        : null}
      <Input {...props} id={inputId}/>
      {error
        ? <ErrorWrapper>{error}</ErrorWrapper>
        : null}
    </div>
  )
}

export default memo(TextInputComponent, StyledTextInput);
export {default as StoredTextInput} from './stored';