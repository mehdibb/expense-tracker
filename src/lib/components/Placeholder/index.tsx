import {StyledPlaceholder} from './styles';
import {memo} from '_/utilities';


interface Props {
  className?: string;
  description: string;
}

function PlaceholderComponent({className, description}: Props): React.ReactElement {

  return (
    <span className={className}>
      {description}
    </span>
  )
}

export default memo(PlaceholderComponent, StyledPlaceholder);
