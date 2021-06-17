import React from 'react';
import {dateFormat} from '../../../lib/utilities';
import {Transaction} from '../../../lib/store';
import {
  StyledTransactionsListItem,
  Amount,
  Day,
  Description,
  Type,
} from './styles';
import {memo} from '../../../lib/utilities';


interface Props {
  className?: string;
  item: Transaction;
}

function TransactionsListItemComponent({className, item}: Props): React.ReactElement {
  
  return (
    <li className={className}>
      <Day>{dateFormat(item.date.dateValue, {day: true, twoDigitDay: true})}</Day>
      <Type>{item.transactionDirection.selectedItem?.text}</Type>
      <Description>{item.description.value}</Description>
      <Amount direction={item.transactionDirection.storingParam}>
        {item.displayAmount}
      </Amount>
    </li>
  )
}

export default memo(TransactionsListItemComponent, StyledTransactionsListItem);