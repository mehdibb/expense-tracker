import {StyledPlaceholder} from './styles';


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

export default StyledPlaceholder.withComponent(PlaceholderComponent);