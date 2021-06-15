import {ActionsWrapper, Divider, StyledCreateTransaction} from './styles';
import {TextInput, TextArea, SelectBox, Button} from '../../lib/components';
import React, {useCallback, useContext} from 'react';
import {useLocalObservable} from 'mobx-react-lite';
import {CreateTransactionStore, StoreContext} from '../../lib/store';
import {memo} from '../../lib/utilities/memo';
import {useHistory} from 'react-router';


interface Props {
  className?: string;
}

function CreateTransactionComponent({className}: Props): React.ReactElement {
  const store = useContext(StoreContext);
  const localStore = useLocalObservable(() => new CreateTransactionStore());
  const history = useHistory();
  
  const handleCancelClick = useCallback(() => {
    history.push('/');
  }, []);
  
  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.createTransaction(localStore.storingParams);
    history.push('/');
  }, []);
  
  return (
    <form className={className} onSubmit={handleSubmit}>
      <TextInput type="number" label="Enter amount" value={localStore.amount} onChange={localStore.setAmount}/>
      <TextArea label="Note" value={localStore.note} onChange={localStore.setNote}/>
      <TextInput type="date" label="Date" value={localStore.date} onChange={localStore.setDate}/>
      <SelectBox
        items={localStore.typeItems}
        activeItem={localStore.typeActiveItem}
        onActiveItemChange={localStore.setTypeActiveItem}
        label='Category'
      />
      <Divider />
      <ActionsWrapper>
        <Button flat onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button type="submit" disabled={!localStore.isValid}>
          Save Transaction
        </Button>
      </ActionsWrapper>
    </form>
  )
}

export default memo(CreateTransactionComponent, StyledCreateTransaction);