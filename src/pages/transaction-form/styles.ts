import styled from '@emotion/styled';
import {SelectBox} from '#';


export const Divider = styled.hr`
  margin: 0 -24px 56px -24px;
  border: unset;
  border-top: 1px solid var(--light-grey);
  border-bottom: 1px solid var(--light-grey);
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledTransactionForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px;

  ${SelectBox} {
    margin-bottom: 56px;
  }
`;