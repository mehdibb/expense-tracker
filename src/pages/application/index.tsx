import {
  StyledApplication,
} from './styles';
import {Header, TransactionsList} from '../../pages';
import {Store, StoreContext} from '../../lib/store';
import {useMemo} from 'react';
import {Button} from '../../lib/components';
import {Add} from '../../lib/assets/images';


interface Props {
  className?: string;
}

function ApplicationComponent({ className }: Props): React.ReactElement {
  const store = useMemo(() => new Store(), []);
  
  return (
    <main className={className}>
      <StoreContext.Provider value={store}>
        <Header />
        <Button Icon={Add}>
          Add Transaction
        </Button>
        <TransactionsList />
      </StoreContext.Provider>
    </main>
  );
}

export default StyledApplication.withComponent(ApplicationComponent);
