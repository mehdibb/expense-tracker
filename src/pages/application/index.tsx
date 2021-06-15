import {
  StyledApplication,
  ActionsWrapper,
  FiltersWrapper,
} from './styles';
import {CreateTransaction, Header, TransactionsList} from '../../pages';
import {Store, StoreContext} from '../../lib/store';
import {useCallback, useMemo} from 'react';
import {Button, Placeholder, SelectBox} from '../../lib/components';
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
            <ActionsWrapper>
              <FiltersWrapper>
                <SelectBox
                  items={store.yearFilterItems}
                  activeItem={store.activeYearFilterItem}
                  onActiveItemChange={store.setActiveYearFilterItem}
                  label="Year"
                />
                <SelectBox
                  items={store.monthFilterItems}
                  activeItem={store.activeMonthFilterItem}
                  onActiveItemChange={store.setActiveMonthFilterItem}
                  label="Month"
                />
                <SelectBox
                  items={store.typeFilterItems}
                  activeItem={store.activeTypeFilterItem}
                  onActiveItemChange={store.setActiveTypeFilterItem}
                  label="Type"
                />
              </FiltersWrapper>
              <Button Icon={Add} onClick={handleCreateTransactionClick}>
                Add Transaction
              </Button>
            </ActionsWrapper>
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
