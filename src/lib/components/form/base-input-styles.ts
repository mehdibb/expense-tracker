import {css, SerializedStyles} from '@emotion/react';
import styled from '@emotion/styled';


export const baseInputStyles = (): SerializedStyles => css`
  padding: 16px;
  border: 1px solid var(--grey);
  border-radius: 4px;
`;

export const baseInputWrapperStyles = (): SerializedStyles => css`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

export const Label = styled.label`
  margin-bottom: 16px;
  font-weight: 700;
  font-size: 18px;
`;
