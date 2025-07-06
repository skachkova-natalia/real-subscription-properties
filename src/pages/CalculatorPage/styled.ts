import styled from 'styled-components';
import {breakpoint} from '@src/theme';

export const MainContainer = styled.div`
  padding: 40px 100px 60px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (max-width: ${breakpoint.tablet}) {
    padding: 40px 50px 60px;
  }
  @media (max-width: ${breakpoint.mobile}) {
    padding: 12px 12px 50px;
  }
`;
