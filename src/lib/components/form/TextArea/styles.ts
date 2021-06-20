import styled from '@emotion/styled';
import {baseInputStyles, baseInputWrapperStyles} from '../base-input-styles';


export const TextArea = styled.textarea`
  ${baseInputStyles};

  resize: vertical;
  min-height: 52px;
`;

export const StyledTextArea = styled.div`
  ${baseInputWrapperStyles};
`;
