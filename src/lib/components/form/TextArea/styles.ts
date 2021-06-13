import styled from '@emotion/styled';
import {baseInputStyles, baseInputWrapperStyles} from '../base-input-styles';


export const TextArea = styled.textarea`
  ${baseInputStyles};

  resize: vertical;
`;

export const StyledTextArea = styled.div`
  ${baseInputWrapperStyles};
`;