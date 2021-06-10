import React from 'react';
import {currencyFormat, dateFormat, Transaction, TransactionDirection} from '../../../lib';
import {
  StyledTransactionsListItem,
  Amount,
  Day,
  Description,
  Type,
} from './styles';


interface Props {
  className?: string;
  item: Transaction;
}

function TransactionsListItemComponent({className, item}: Props): React.ReactElement {

  return (
    <li className={className}>
      <Day>{dateFormat(item.date, {day: true, twoDigitDay: true})}</Day>
      <Type>{item.amount > 0 ? 'Income' : 'Expense'}</Type>
      <Description>{item.description}</Description>
      <Amount direction={item.amount > 0 ? TransactionDirection.Income : TransactionDirection.Expense}>
        {currencyFormat(item.amount)}
      </Amount>
    </li>
  )
}

export default StyledTransactionsListItem.withComponent(TransactionsListItemComponent)