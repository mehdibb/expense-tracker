import styled from '@emotion/styled';
import { Props } from '.';


export const StyledButton = styled.button<Props>`
  background-color: unset;
  border: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${({children}): string => children
    ? ''
    : `
    border-radius: 50%;
    height: 40px;
    width: 40px;
    `}

  :hover {
    background-color: var(--yellow);

    svg {
      fill: var(--black);
    }
  }

  svg {
    width: 24px;
    height: 24px;
    fill: var(--yellow);
  }
`;