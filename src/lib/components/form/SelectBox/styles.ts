import styled from '@emotion/styled';
import {baseInputStyles, baseInputWrapperStyles} from '../base-input-styles';


export const Select = styled.select`
  ${baseInputStyles};

  width: 100%;
  /* IconWrapper border-left width + padding left + svg width + base input padding-right*/
  margin-right: -41px;
  border: none;
  background-color: unset;
  appearance: none;

  :focus-visible {
    outline: unset;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 4px;
  border-left: 1px solid var(--grey);
  pointer-events: none;

  svg {
    width: 24px;
    height: 24px;
    fill: var(--dark-grey);
  }
`;

export const SelectWrapper = styled.div`
  ${baseInputStyles};

  display: flex;
  align-items: center;
  padding: unset;
`;

export const StyledSelectBox = styled.div`
  ${baseInputWrapperStyles};

  :focus-within ${SelectWrapper} {
    outline: -webkit-focus-ring-color auto 1px;
    outline-offset: 0;
  }
`;