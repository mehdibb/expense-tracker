import {
  BackButton,
  BalanceWrapper,
  BottomSection,
  Currency,
  HeaderText,
  StyledDate,
  StyledHeader,
  TopSection,
  Balance,
  Form,
} from './styles';
import {currencyFormat, dateFormat, memo} from '_/utilities';
import {Button, StoredTextInput} from '#';
import {ArrowLeft, Close, Done, Edit} from '_/assets/images';
import {useHistory, useLocation} from 'react-router';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StoreContext} from '_/store';


interface Props {
  className?: string;
}

function HeaderComponent({className}: Props): React.ReactElement {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  const store = useContext(StoreContext);
  
  const history = useHistory();

  const handleBackButtonClick = useCallback(() => {
    history.push('/');
  }, []);

  const location = useLocation();
  
  const handleEditBalance = useCallback(() => setIsEditing(true), []);

  const handleDiscardBalance = useCallback(() => {
    store.rollbackInitialBalance();
    setIsEditing(false);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape' && isEditing) {
        handleDiscardBalance();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return (): void => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditing]);

  
  const handleSubmitBalance = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.updateInitialBalance();
    setIsEditing(false);
  }, []);
  
  return (
    <header className={className} data-testid='application-header'>
      {location.pathname === '/'
        ? null
        : <BackButton Icon={ArrowLeft} flat purple onClick={handleBackButtonClick}>
          Back
        </BackButton>}
      <TopSection>
        <HeaderText>Wallet Balance</HeaderText>
        <StyledDate>
          {dateFormat(new Date())}
        </StyledDate>
      </TopSection>
      <BottomSection>
      {isEditing
        ? <Form onSubmit={handleSubmitBalance}>
          <StoredTextInput
            instance={store.initialBalance}
            label='Initial balance:'
          />
          <Button Icon={Close} title='Discard' onClick={handleDiscardBalance} type='button' />
          <Button Icon={Done} title='Save' type='submit' disabled={!store.initialBalance.isValid}/>
        </Form>
        : <BalanceWrapper>
          <Balance title='total balance'>
            {currencyFormat(store.totalBalance)}
          </Balance>
          <Button Icon={Edit} title='Edit' onClick={handleEditBalance}/>
        </BalanceWrapper>}
        <Currency>USD</Currency>
      </BottomSection>
    </header>
  )
}

export default memo(HeaderComponent, StyledHeader);
