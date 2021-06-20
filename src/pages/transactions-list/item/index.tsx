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
  const handleKeyPress= useCallback((event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onActivate(item);
    }
  }, [onActivate, item]);
  
  const handleClick = useCallback(() => {
    onActivate(item);
  }, [onActivate, item]);
  
  return (
    // TODO: using button here is more accessible but html semantics will be ruined
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex
    <li className={className} onClick={handleClick} tabIndex={0} onKeyPress={handleKeyPress}>
      <Day>{dateFormat(item.date.dateValue, {day: true, twoDigitDay: true})}</Day>
      <Type>{item.transactionDirection.selectedItem?.text}</Type>
      <Description>{item.description.value}</Description>
      <Amount direction={item.transactionDirection.storingParam} data-testid='transaction-amount'>
        {item.displayAmount}
      </Amount>
    </li>
  )
}

export default memo(TransactionsListItemComponent, StyledTransactionsListItem);
