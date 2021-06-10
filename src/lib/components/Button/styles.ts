import styled from '@emotion/styled';
import { Props } from '.';


export const StyledButton = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border: unset;
  font-weight: 600;
  cursor: pointer;
  background-color: unset;

  ${({children}): string => children
    ? `
    padding: 0 12px;
    border-radius: 2px;
    background-color: var(--yellow);
    
    svg {
      margin-right: 8px;
      fill: var(--black);
    }

    :hover {
      background-color: var(--dark-yellow);
    }
    `
    // Icon Button
    : `
    width: 40px;
    border-radius: 50%;
    fill: var(--yellow);

    :hover {
      background-color: var(--yellow);
  
      svg {
        fill: var(--black);
      }
    }
    `}

  svg {
    width: 24px;
    height: 24px;
  }
`;