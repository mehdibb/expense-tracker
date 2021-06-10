import {StyledInput} from './styles';


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

function InputComponent({...props}: Props): React.ReactElement {

  return (
    <input {...props}/>
  )
}

export default StyledInput.withComponent(InputComponent);