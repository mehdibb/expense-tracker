import styled from '@emotion/styled';
import {Button, TextInput} from '../../lib/components';


export const BackButton = styled(Button)`
  position: absolute;
  top: 8px;
  left: -20px;
  transform: translateX(-100%);

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const HeaderText = styled.h2`
  font-weight: unset;
  font-size: 20px;
`;

export const StyledDate = styled.span`

`;

export const TopSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 96px;
`;

export const BalanceWrapper = styled.span`
  display: flex;
  align-items: center;

  ${TextInput} {
    margin-bottom: unset;
  }
`;

export const Currency = styled.span`
  align-self: flex-end;
`;

export const BottomSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledHeader = styled.header`
  position: relative;
  width: 100%;
  margin-bottom: 56px;
  padding: 24px;
  border-radius: 8px;
  color: var(--white);
  background-color: var(--black);
`;