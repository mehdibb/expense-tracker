import {css, SerializedStyles} from '@emotion/react';
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

const balanceTextStyles = (): SerializedStyles => css`
  color: var(--white);
  font-weight: 700;
  font-size: 32px;
`;

export const Balance = styled.span`
  ${balanceTextStyles};

  margin-right: 8px;
`;

export const BalanceWrapper = styled.span`
  display: flex;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;

  ${TextInput} {
    margin-top: -16px;
    margin-bottom: unset;

    label {
      margin-bottom: unset;
      font-size: 16px;
    }

    /* FIXME: the input text moves up when part of the text is selected */
    input {
      ${balanceTextStyles};
      
      width: 192px;
      height: unset;
      margin-right: 8px;
      padding: unset;
      border: unset;
      border-bottom: 1px solid var(--yellow);
      border-radius: unset;
      background-color: var(--black);
      caret-color: var(--yellow);

      ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
        margin: 0;
        -webkit-appearance: none;
      }

      :focus-visible {
        outline: unset;
      }
  }
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
  font-weight: 600;
  background-color: var(--black);
`;