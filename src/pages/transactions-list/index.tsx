import {useContext} from 'react';
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

  return (
    <ul className={className}>
      {store.transactions.length === 0
        ? <Placeholder description="No transactions."/>
        : store.transactions.map((transaction) => (
        <Item key={transaction.id} item={transaction} />
      ))}
    </ul>
  )
}

export default memo(TransactionsListComponent, StyledTransactionsList);