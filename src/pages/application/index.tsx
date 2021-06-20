import {
  StyledApplication,
  ActionsWrapper,
  FiltersWrapper,
} from './styles';
import {TransactionForm, Header, TransactionsList} from '../../pages';
import {Store, StoreContext, Transaction} from '_/store';
import {useCallback, useContext, useEffect, useMemo} from 'react';
import {Button, Placeholder, StoredSelectBox, SelectBox} from '#';
import {Add} from '_/assets/images';
import {Switch, Route, Redirect, useHistory, useLocation, useParams} from 'react-router'
import {memo} from '_/utilities';


interface UpdateTransactionProps {
  onTransactionNotFound: () => void;
  onSubmit: () => void;
  onDelete: (transaction: Transaction) => void;
  onDiscard: () => void;
}

function UpdateTransactionComponent({
  onTransactionNotFound,
  onSubmit,
  onDelete,
  onDiscard,
}: UpdateTransactionProps): React.ReactElement | null {
  const store = useContext(StoreContext);
  const params = useParams<{transactionId: string}>();

  const transaction = useMemo(() => {
    return store.transactions.find(({id}) => id === params.transactionId)
  }, []);
  
  if (!transaction) {
    onTransactionNotFound();
    return null;
  }
  else {
    store.setUpdatingTransaction(transaction);
  }
  
  return <TransactionForm transaction={transaction} onSubmit={onSubmit} onDelete={onDelete} onDiscard={onDiscard}/>;
}

const MemoizedUpdateTransactionComponent = memo(UpdateTransactionComponent);

interface Props {
  className?: string;
}

function ApplicationComponent({className}: Props): React.ReactElement {
  const store = useMemo(() => new Store(), []);
  
  const history = useHistory();
  
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname === '/create-transaction') {
      store.setCreatingTransaction();
    }
  }, [location]);

  // TODO: find a better way to handle the situation where a transaction is not found
  const handleTransactionNotFound = useCallback(() => {
    history.push('/sorry');
  }, []);
  
  const handleCreateTransaction = useCallback(() => {
    store.createTransaction();
    history.push('/');
  }, []);

  const handleUpdateTransaction = useCallback(() => {
    store.updateTransaction();
    history.push('/');
  }, []);

  const handleDeleteTransaction = useCallback((transaction: Transaction) => {
    store.deleteTransaction(transaction);
    history.push('/');
  }, []);

  const handleDiscardTransactionForm = useCallback(() => {
    if (store.updatingTransaction) {
      store.updatingTransaction.rollback();
      history.push('/');
    }
    else if (store.creatingTransaction) {
      store.clearCreatingTransaction();
      history.push('/');
    }
  }, []);
  
  const handleCreateTransactionClick = useCallback(() => {
    store.setCreatingTransaction();
    history.push('/create-transaction');
  }, []);

  const handleResetButtonClick = useCallback(() => {
    store.resetFilters();
  }, []);
  
  return (
    <main className={className}>
      <StoreContext.Provider value={store}>
        <Header />
        <Switch>
          <Route path='/' exact>
            <ActionsWrapper>
              <FiltersWrapper>
                <SelectBox
                  items={store.yearFilterItems}
                  activeItem={store.activeYearFilterItem}
                  onActiveItemChange={store.setActiveYearFilterItem}
                  label='Year'
                />
                <StoredSelectBox
                  instance={store.monthFilter}
                  label='Month'
                />
                <StoredSelectBox
                  instance={store.typeFilter}
                  label='Type'
                />
                {store.filtersEdited
                  ? <Button type='button' flat onClick={handleResetButtonClick}>
                    Reset
                  </Button>
                  : null}
              </FiltersWrapper>
              <Button Icon={Add} onClick={handleCreateTransactionClick}>
                Add Transaction
              </Button>
            </ActionsWrapper>
            <TransactionsList />
          </Route>
          <Route path={['/home', '/transactions']} exact>
            <Redirect to='/'/>
          </Route>
          <Route path='/create-transaction'>
            {store.creatingTransaction
              ? <TransactionForm
                transaction={store.creatingTransaction}
                onSubmit={handleCreateTransaction}
                onDiscard={handleDiscardTransactionForm}
              />
              : null}
          </Route>
          <Route path='/transactions/:transactionId'>
            <MemoizedUpdateTransactionComponent
              onTransactionNotFound={handleTransactionNotFound}
              onSubmit={handleUpdateTransaction}
              onDelete={handleDeleteTransaction}
              onDiscard={handleDiscardTransactionForm}
            />
          </Route>
          <Route path={['*', '/sorry']}>
            <Placeholder description='404 Not Found' />
          </Route>
        </Switch>
      </StoreContext.Provider>
    </main>
  );
}

export default memo(ApplicationComponent, StyledApplication);
