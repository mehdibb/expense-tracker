import {StyledButton} from './styles';


export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

function ButtonComponent({
  Icon,
  children,
  ...props
}: Props): React.ReactElement {

  return (
    <button {...props}>
      {Icon ? <Icon /> : null}
      {children}
    </button>
  )
}

export default StyledButton.withComponent(ButtonComponent);