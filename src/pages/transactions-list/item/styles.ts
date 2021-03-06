import styled from '@emotion/styled';
import {Transaction} from '_/store';


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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Amount = styled.span<{direction: Transaction['transactionDirection']['storingParam']}>`
  align-self: center;
  font-weight: 700;
  grid-area: amount;
  justify-self: end;
  ${({direction}): string => direction === 'income'
    ? 'color: var(--green)'
    : 'color: var(--red)'};
`;

export const StyledTransactionsListItem = styled.li`
  display: grid;
  width: 100%;
  height: 120px;
  padding: 32px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 4px 4px -3px var(--grey);
  grid-template-areas: 'day type amount'
    'day description amount';
  grid-template-columns: 72px auto 240px;

  :hover {
    background-color: var(--light-grey);
  }
`;
