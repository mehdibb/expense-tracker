import {ActionsWrapper, Divider, StyledTransactionForm} from './styles';
import {Button, StoredTextInput, StoredTextArea, StoredSelectBox} from '../../lib/components';
import React, {useCallback, useContext} from 'react';
import {StoreContext, Transaction} from '../../lib/store';
import {memo} from '../../lib/utilities/memo';
import {useHistory} from 'react-router';



interface Props {
  className?: string;
  transaction: Transaction;
}

function TransactionFormComponent({className, transaction}: Props): React.ReactElement {
  const store = useContext(StoreContext);
  const history = useHistory();
  
  const handleCancelClick = useCallback(() => {
    history.push('/');
  }, []);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.createTransaction();
    history.push('/');
  }, []);

  return (
    <form className={className} onSubmit={handleSubmit}>
      <StoredTextInput
        type="number"
        label="Enter amount"
        instance={transaction.amount}
        />
      <StoredTextArea label="Note" instance={transaction.description}/>
      <StoredTextInput type="date" label="Date" instance={transaction.date}/>
      <StoredSelectBox
        instance={transaction.transactionDirection}
        label='Category'
      />
      <Divider />
      <ActionsWrapper>
        <Button flat onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button type="submit" disabled={!transaction.isValid}>
          Save Transaction
        </Button>
      </ActionsWrapper>
    </form>
  )
}

export default memo(TransactionFormComponent, StyledTransactionForm);