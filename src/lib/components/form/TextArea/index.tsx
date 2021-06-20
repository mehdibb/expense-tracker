import {StyledTextArea, TextArea} from './styles';
import {Label} from '../base-input-styles';
import {useMemo} from 'react';
import {v4 as uuid} from 'uuid';
import {memo} from '_/utilities';


export interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

function TextAreaComponent({className, label, ...props}: Props): React.ReactElement {
  const inputId = useMemo(uuid, []);

  return (
    <div className={className}>
      {label
        ? <Label htmlFor={inputId}>
          {label}
        </Label>
        : null}
      <TextArea {...props} id={inputId} />
    </div>
  )
}

export default memo(TextAreaComponent, StyledTextArea);
export {default as StoredTextArea} from './stored';
