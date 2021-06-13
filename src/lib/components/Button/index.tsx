import {StyledButton} from './styles';
import {memo} from '../../utilities';


export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  flat?: boolean;
  purple?: boolean;
}

function ButtonComponent({
  Icon,
  children,
  // passing these two props will cause validateProperty to throw warning
  flat: _flat,
  purple: _purple,
  ...props
}: Props): React.ReactElement {

  return (
    <button {...props}>
      {Icon ? <Icon /> : null}
      {children}
    </button>
  )
}

export default memo(ButtonComponent, StyledButton);