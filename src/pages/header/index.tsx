import {
  BackButton,
  BalanceWrapper,
  BottomSection,
  Currency,
  HeaderText,
  StyledDate,
  StyledHeader,
  TopSection,
} from './styles';
import {dateFormat, memo} from '../../lib/utilities';
import {Button, TextInput} from '../../lib/components';
import {ArrowLeft, Edit} from '../../lib/assets/images';
import {useHistory, useLocation} from 'react-router';
import {useCallback} from 'react';


interface Props {
  className?: string;
}

function HeaderComponent({className}: Props): React.ReactElement {
  const history = useHistory();
  const location = useLocation();

  const handleBackButtonClick = useCallback(() => {
    history.goBack();
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
        <BalanceWrapper>
          <TextInput />
          <Button Icon={Edit}/>
        </BalanceWrapper>
        <Currency>USD</Currency>
      </BottomSection>
    </header>
  )
}

export default memo(HeaderComponent, StyledHeader);