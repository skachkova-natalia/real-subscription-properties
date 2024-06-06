import styled from 'styled-components';
import {breakpoint, color, H1} from '@src/theme';

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 15px 100px;
  color: ${color.primary.s700};
  box-shadow: 0 1px 6px rgb(0 0 0 / 15%);
  ${H1};
  @media (max-width: ${breakpoint.tablet}) {
    padding: 15px 50px;
  }
  @media (max-width: ${breakpoint.mobile}) {
    padding: 15px 30px;
  }
}
`;
