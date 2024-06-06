import styled from 'styled-components';
import {color, H1} from '@src/theme';

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 15px 100px;
  color: ${color.primary.s700};
  border-bottom: 1px solid ${color.base.s100};
  ${H1}
`;
