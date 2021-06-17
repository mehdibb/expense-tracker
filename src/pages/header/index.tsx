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
import {currencyFormat, dateFormat, memo} from '../../lib/utilities';
import {Button, StoredTextInput} from '../../lib/components';
import {ArrowLeft, Close, Done, Edit} from '../../lib/assets/images';
import {useHistory, useLocation} from 'react-router';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StoreContext} from '../../lib/store';


interface Props {
  className?: string;
}

function HeaderComponent({className}: Props): React.ReactElement {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  const store = useContext(StoreContext);
  
  const history = useHistory();
  const location = useLocation();

  const handleBackButtonClick = useCallback(() => {
    history.goBack();
  }, []);

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
    <header className={className}>
      {location.pathname === "/create-transaction"
        ? <BackButton Icon={ArrowLeft} flat purple onClick={handleBackButtonClick}>
          Back
        </BackButton>
        : null}
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
            type="number"
            instance={store.initialBalance}
            label="Initial balance:"
          />
          <Button Icon={Close} onClick={handleDiscardBalance} type="button" />
          <Button Icon={Done} type="submit" />
        </Form>
        : <BalanceWrapper>
          <Balance>
            {currencyFormat(store.totalBalance)}
          </Balance>
          <Button Icon={Edit} onClick={handleEditBalance}/>
        </BalanceWrapper>}
        <Currency>USD</Currency>
      </BottomSection>
    </header>
  )
}

export default memo(HeaderComponent, StyledHeader);