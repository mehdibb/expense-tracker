import {ActionsWrapper, Divider, StyledTransactionForm, DeleteButton} from './styles';
import {Button, StoredTextInput, StoredTextArea, StoredSelectBox} from '#';
import React, {useCallback} from 'react';
import {Transaction} from '_/store';
import {memo} from '_/utilities/memo';


interface Props {
  className?: string;
  transaction: Transaction;
  onSubmit: () => void;
  onDelete?: (transaction: Transaction) => void;
  onDiscard: () => void;
}

function TransactionFormComponent({className, transaction, onSubmit, onDelete, onDiscard}: Props): React.ReactElement {
  const handleCancelClick = useCallback(() => {
    onDiscard();
  }, [onDiscard]);

  const handleDeleteClick = useCallback(() => {
    onDelete?.(transaction);
  }, [onDelete, transaction]);
  
  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit()
  }, [onSubmit]);

  return (
    <form className={className} onSubmit={handleSubmit}>
      <StoredTextInput
        type="number"
        label="Enter amount"
        instance={transaction.amount}
        step="0.01"
        />
      <StoredTextArea label="Note" instance={transaction.description}/>
      <StoredTextInput type="date" label="Date" instance={transaction.date}/>
      <StoredSelectBox
        instance={transaction.transactionDirection}
        label='Category'
      />
      <Divider />
      <ActionsWrapper>
        <Button flat onClick={handleCancelClick} type="button">
          Cancel
        </Button>
        {onDelete
          ? <DeleteButton flat onClick={handleDeleteClick} type="button">
            Delete
          </DeleteButton>
          : null}
        <Button type="submit" disabled={!transaction.isValid}>
          Save Transaction
        </Button>
      </ActionsWrapper>
    </form>
  )
}

export default memo(TransactionFormComponent, StyledTransactionForm);