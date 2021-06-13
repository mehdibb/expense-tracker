import styled from '@emotion/styled';
import {Props} from '.';


export const StyledButton = styled(
    'button',
    {shouldForwardProp: (prop: string): boolean => !['flat, purple'].includes(prop)})<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border: unset;
  color: ${({purple}): string => purple ? 'var(--purple)' : 'var(--black)'};
  font-weight: 600;
  cursor: ${({disabled}): string => disabled ? 'not-allowed' : 'pointer'};
  background-color: unset;

  ${({children, flat, purple, disabled}): string => children
    ? `
    padding: 0 12px;
    border-radius: 3px;
    ${flat ? '' : disabled ? 'background-color: var(--light-yellow);' : 'background-color: var(--yellow);'}
    ${flat || disabled
      ? ''
      : `
      :hover {
        background-color: var(--dark-yellow);
      }
    `}
    // TODO: implement different button styles
    ${flat && purple && !disabled
      ? `
        :hover {
          color: var(--black);

          svg {
            fill: var(--black);
          }
        }
      `
      : flat && !purple && !disabled
        ? `
          :hover {
            text-decoration: underline;
          }
        `
        : flat && purple && disabled
          ? `

          `
          : flat && !purple && disabled
            ? `
            
            `
            : !flat && purple && disabled
              ? `
              
              `
              : !flat && purple && !disabled
                ? `
                
                `
                : !flat && !purple && disabled
                  ? `
                  
                  `
                  : !flat && !purple && !disabled
                    ? `
                    
                    `
                    : ''
        }
    
    svg {
      margin-right: 8px;
      fill: ${flat ? 'var(--purple)' : 'var(--black)'};
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