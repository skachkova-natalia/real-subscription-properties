import styled from 'styled-components';
import {breakpoint, color} from '@src/theme';

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 10px 100px;
  background-color: ${color.base.s10};
  box-shadow: 0 1px 6px rgb(0 0 0 / 15%);

  @media (max-width: ${breakpoint.tablet}) {
    padding: 15px 50px;
  }
  @media (max-width: ${breakpoint.mobile}) {
    padding: 15px 30px;
  }
`;

export const A = styled.a`
  height: 20px;
  color: ${color.base.s600};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: ${color.primary.s700};
    fill: ${color.primary.s700};
  }

  svg:hover {
    fill: ${color.primary.s700};
  }
`;
