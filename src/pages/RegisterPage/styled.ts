import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import {color} from '@src/theme';

export const Container = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${color.base.s600};

  &:hover {
    color: ${color.primary.s700};
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
`;
