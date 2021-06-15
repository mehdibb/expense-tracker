import {useContext, useMemo} from 'react';
import {StoreContext} from '../../lib/store';
import {StyledTransactionsList} from './styles';
import Item from './item';
import {Placeholder} from '../../lib/components';
import {memo} from '../../lib/utilities';


interface Props {
  className?: string;
}

function TransactionsListComponent({className}: Props): React.ReactElement {
  const store = useContext(StoreContext);
  
  const transactionItems = useMemo(() => store.transactions.length === 0
    ? <Placeholder description="No transactions."/>
    : [...store.transactions]
      .sort(({date: firstDate}, {date: secondDate}) => secondDate.getTime() - firstDate.getTime())
      .map((transaction) => (
        <Item key={transaction.id} item={transaction} />
      ))
  , [store.transactions.length, store.transactions]);

  return (
    <ul className={className}>
      {transactionItems}
    </ul>
  )
}

export default memo(TransactionsListComponent, StyledTransactionsList);