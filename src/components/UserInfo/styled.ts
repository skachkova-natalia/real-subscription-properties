import styled from 'styled-components';
import {breakpoint, color} from '@src/theme';
import {NavLink} from 'react-router-dom';

export const User = styled.div`
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  font-size: 14px;
  border-bottom: 1px solid #dfe5eb;
  @media (max-width: ${breakpoint.mobile}) {
    display: none;
  }
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    cursor: pointer;
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${color.base.s600};

  &:hover {
    color: ${color.primary.s700};
  }
`;
