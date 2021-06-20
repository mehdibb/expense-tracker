import styled from '@emotion/styled';
import {baseInputStyles, baseInputWrapperStyles} from '../base-input-styles';


export const ErrorWrapper = styled.span`
  margin-top: 4px;
  color: var(--red);
  font-size: 12px;
`;

export const Input = styled.input`
  ${baseInputStyles};

  height: 48px;
`;

export const StyledTextInput = styled.div`
  ${baseInputWrapperStyles};
`;
