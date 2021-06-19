import React, {useCallback} from 'react';
import {dateFormat} from '_/utilities';
import {Transaction} from '_/store';
import {
  StyledTransactionsListItem,
  Amount,
  Day,
  Description,
  Type,
} from './styles';
import {memo} from '_/utilities';


interface Props {
  className?: string;
  item: Transaction;
  onActivate: (item: Transaction) => void;
}

function TransactionsListItemComponent({className, item, onActivate}: Props): React.ReactElement {
  const handleClick = useCallback(() => {
    onActivate(item);
  }, [onActivate, item]);
  
  return (
    <li className={className} onClick={handleClick}>
      <Day>{dateFormat(item.date.dateValue, {day: true, twoDigitDay: true})}</Day>
      <Type>{item.transactionDirection.selectedItem?.text}</Type>
      <Description>{item.description.value}</Description>
      <Amount direction={item.transactionDirection.storingParam} data-testid="transaction-amount">
        {item.displayAmount}
      </Amount>
    </li>
  )
}

export default memo(TransactionsListItemComponent, StyledTransactionsListItem);