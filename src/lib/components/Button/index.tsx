import {StyledButton} from './styles';
import {memo} from '_/utilities';
import React from 'react';


export type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title' | 'children'> &
  {
    flat?: boolean;
    purple?: boolean;
  } &
  // This forces to provide title when the button does not have a text (i.e Icon Button) for a11y reasons
  (
    {
      children: React.ReactNode;
      Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
      title?: string;
    } |
    {
      children?: undefined;
      Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
      title: string;
    }
  )

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