import styled from '@emotion/styled';
import {Button, SelectBox} from '#';
import {SelectWrapper} from '#/form/SelectBox/styles';


export const FiltersWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;

  ${SelectBox} {
    width: 120px;
    margin-right: 8px;
    margin-bottom: unset;

    select {
      padding: 8px;
    }
    
    ${SelectWrapper} {
      justify-content: space-between;
    }
  }
`;

export const ActionsWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  border-bottom: 1px solid var(--light-grey);
  padding-bottom: 32px;

  >${Button} {
    flex-shrink: 0;
  }
`;

export const StyledApplication = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 720px;
  min-height: 0;
  padding-bottom: 16px;
  margin-inline: auto;
`;
