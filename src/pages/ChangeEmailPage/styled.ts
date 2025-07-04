import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import {color} from '@src/theme';

export const MainContainer =  styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

export const ButtonContainer = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(200px, 2);
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${color.base.s600};

  &:hover {
    color: ${color.primary.s700};
  }
`;

