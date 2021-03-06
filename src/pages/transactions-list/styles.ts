import {Placeholder} from '#';
import styled from '@emotion/styled';


const Section = styled.li`
  margin-right: auto;
  color: var(--dark-grey);
  font-weight: 700;
`;

export const MonthSection = styled(Section)`
  padding: 8px 0;
  font-size: 16px;
`;

export const YearSection = styled(Section)`
  font-size: 24px;

  :not(:first-of-type) {
    padding-top: 16px;
  }
`;

export const TransactionsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 8px 4px;
  overflow-y: overlay;
`;

export const StyledTransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 0;

  ${Placeholder} {
    margin-top: 16px;
  }
`;
