import {
  StyledApplication,
} from './styles';
import {Header} from '../../pages';


interface Props {
  className?: string;
}

function ApplicationComponent({ className }: Props): React.ReactElement {
  return (
    <main className={className}>
      <Header />
      Application
    </main>
  );
}

export default StyledApplication.withComponent(ApplicationComponent);
