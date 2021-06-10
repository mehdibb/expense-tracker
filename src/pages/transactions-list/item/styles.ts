import styled from '@emotion/styled';
import {TransactionDirection} from '../../../lib';


export const Day = styled.span`
  align-self: center;
  font-weight: 700;
  font-size: 32px;
  grid-area: day;
`;

export const Type = styled.span`
  align-self: start;
  font-weight: 600;
  font-size: 20px;
  grid-area: type;
`;

export const Description = styled.span`
  align-self: end;
  color: var(--grey);
  grid-area: description;
`;

export const Amount = styled.span<{direction: TransactionDirection}>`
  align-self: center;
  font-weight: 700;
  grid-area: amount;
  justify-self: end;
  ${({direction}): string => direction === TransactionDirection.Income
    ? 'color: var(--green)'
    : 'color: var(--red)'};
`;

export const StyledTransactionsListItem = styled.li`
  display: grid;
  width: 100%;
  height: 120px;
  padding: 32px;
  border-bottom: 2px solid var(--light-grey);
  cursor: pointer;
  user-select: none;
  grid-template-areas: 'day type amount'
    'day description amount';
  grid-template-columns: 72px auto 192px;

  :hover {
    background-color: var(--light-grey);
  }
`;