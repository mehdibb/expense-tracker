import {
  StyledApplication,
} from './styles';
import {CreateTransaction, Header, TransactionsList} from '../../pages';
import {Store, StoreContext} from '../../lib/store';
import {useCallback, useMemo} from 'react';
import {Button, Placeholder} from '../../lib/components';
import {Add} from '../../lib/assets/images';
import {Switch, Route, Redirect, useHistory} from 'react-router'
import {memo} from '../../lib/utilities';


interface Props {
  className?: string;
}

function ApplicationComponent({ className }: Props): React.ReactElement {
  const store = useMemo(() => new Store(), []);
  
  const history = useHistory();
  
  const handleCreateTransactionClick = useCallback(() => {
    history.push('/create-transaction');
  }, []);
  
  return (
    <main className={className}>
      <StoreContext.Provider value={store}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Button Icon={Add} onClick={handleCreateTransactionClick}>
              Add Transaction
            </Button>
            <TransactionsList />
          </Route>
          <Route path="/home" exact>
            <Redirect to="/"/>
          </Route>
          <Route path="/create-transaction" exact>
            <CreateTransaction />
          </Route>
          <Route path="*">
            <Placeholder description="404 Not Found" />
          </Route>
        </Switch>
      </StoreContext.Provider>
    </main>
  );
}

export default memo(ApplicationComponent, StyledApplication);
