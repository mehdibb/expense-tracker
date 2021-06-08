import {
  StyledApplication,
} from './styles';

interface Props {
  className?: string;
}

function ApplicationComponent({ className }: Props): React.ReactElement {
  return (
    <div className={className}>
      Application
    </div>
  );
}

export default StyledApplication.withComponent(ApplicationComponent);
