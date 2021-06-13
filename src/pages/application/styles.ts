import styled from '@emotion/styled';
import {Button} from '../../lib/components';


export const StyledApplication = styled.main`
  display: flex;
  position: relative;
  top: 72px;
  flex-direction: column;
  align-items: center;
  width: 720px;
  margin: auto;

  >${Button} {
    margin-left: auto;
  }
`;
