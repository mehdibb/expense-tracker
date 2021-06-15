import {useContext, useMemo} from 'react';
import {StoreContext} from '../../lib/store';
import {MonthSection, StyledTransactionsList, TransactionsWrapper, YearSection} from './styles';
import Item from './item';
import {Placeholder} from '../../lib/components';
import {memo, monthMap} from '../../lib/utilities';
import React from 'react';


interface Props {
  className?: string;
}

function TransactionsListComponent({className}: Props): React.ReactElement {
  const store = useContext(StoreContext);
  
  const transactionItems = useMemo(() => {
    return Object.entries(store.transactionsDateMap).length === 0
      ? <Placeholder description="No transactions."/>
      : Object.keys(store.transactionsDateMap)
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
                    .sort(({date: firstDate}, {date: secondDate}) => secondDate.getDay() - firstDate.getDay())
                    .map((transaction) => (
                      <Item key={transaction.id} item={transaction}/>
                    ))}
                </React.Fragment>
            ))}
          </React.Fragment>
        ))
  }, [store.transactions.length, store.transactionsDateMap]);
  
  return (
    <div className={className}>
      <TransactionsWrapper>
        {transactionItems}
      </TransactionsWrapper>
    </div>
  )
}

export default memo(TransactionsListComponent, StyledTransactionsList);