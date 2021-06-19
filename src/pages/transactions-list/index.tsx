import {useCallback, useContext, useMemo} from 'react';
import {StoreContext, Transaction} from '_/store';
import {MonthSection, StyledTransactionsList, TransactionsWrapper, YearSection} from './styles';
import Item from './item';
import {Placeholder} from '#';
import {memo, monthMap} from '_/utilities';
import React from 'react';
import {useHistory} from 'react-router';


interface Props {
  className?: string;
}

function TransactionsListComponent({className}: Props): React.ReactElement {
  const store = useContext(StoreContext);
  
  const history = useHistory();
  
  const handleItemActivate = useCallback((item: Transaction) => {
    store.setUpdatingTransaction(item);
    history.push(`/transactions/${item.id}`);
  }, []);
  
  const transactionItems = useMemo(() => {
    return Object.keys(store.transactionsDateMap)
        .sort((firstYear, secondYear) => parseInt(secondYear) - parseInt(firstYear))
        .map((year) => (
          <React.Fragment key={year}>
            <YearSection>{year}</YearSection>
            {Object.keys(store.transactionsDateMap[year])
              .sort((firstMonth, secondMonth) => parseInt(secondMonth) - parseInt(firstMonth))
              .map((month) => (
                <React.Fragment key={month}>
                  <MonthSection>{monthMap[month]}</MonthSection>
                  {store.transactionsDateMap[year][month]
                    .sort((
                      {date: {dateValue: firstDate}},
                      {date: {dateValue: secondDate}},
                    ) => secondDate.getDay() - firstDate.getDay())
                    .map((transaction) => (
                      <Item key={transaction.id} item={transaction} onActivate={handleItemActivate}/>
                    ))}
                </React.Fragment>
            ))}
          </React.Fragment>
        ))
  }, [store.transactions, store.transactionsDateMap]);
  
  return (
    <div className={className} data-testid="transactions-list">
      {Object.entries(store.transactionsDateMap).length === 0
        ? <Placeholder description="No transactions."/>
        : <TransactionsWrapper>
          {transactionItems}
        </TransactionsWrapper>}
    </div>
  )
}

export default memo(TransactionsListComponent, StyledTransactionsList);