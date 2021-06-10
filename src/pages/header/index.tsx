import {BalanceWrapper, BottomSection, Currency, HeaderText, StyledDate, StyledHeader, TopSection} from './styles';
import {dateFormat} from '../../lib/utilities';
import { Button, Input } from '../../lib/components';
import { Edit } from '../../lib/assets/images';


interface Props {
  className?: string;
}

function HeaderComponent({className}: Props): React.ReactElement {

  return (
    <header className={className}>
      <TopSection>
        <HeaderText>Wallet Balance</HeaderText>
        <StyledDate>
          {dateFormat(new Date())}
        </StyledDate>
      </TopSection>
      <BottomSection>
        <BalanceWrapper>
          <Input />
          <Button Icon={Edit}/>
        </BalanceWrapper>
        <Currency>USD</Currency>
      </BottomSection>
    </header>
  )
}

export default StyledHeader.withComponent(HeaderComponent);