import styled from 'styled-components';
import {breakpoint, color, H1} from '@src/theme';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 100px;
  color: ${color.primary.s700};
  box-shadow: 0 5px 6px rgb(0 0 0 / 15%);
  @media (max-width: ${breakpoint.tablet}) {
    padding: 10px 50px;
  }
  @media (max-width: ${breakpoint.mobile}) {
    padding: 10px 30px;
  }
`;

export const Title = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  ${H1};
  cursor: pointer;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;
