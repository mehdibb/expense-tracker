import styled from '@emotion/styled';
import {Button, SelectBox} from '#';


export const Divider = styled.hr`
  margin: 0 -24px 56px -24px;
  border: unset;
  border-top: 1px solid var(--light-grey);
  border-bottom: 1px solid var(--light-grey);
`;

export const DeleteButton = styled(Button)`
  margin-right: 8px;
  margin-left: auto;
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