import styled from 'styled-components';
import {Button} from 'antd';
import {breakpoint, color} from '@src/theme';

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 100px;
  font-family: Roboto, sans-serif;

  @media (max-width: ${breakpoint.tablet}) {
    padding: 40px 50px;
  }
  @media (max-width: ${breakpoint.mobile}) {
    padding: 30px;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${color.primary.s700};
  border: 1px solid ${color.primary.s700};
`;

export const Error = styled.span`
  color: ${color.secondary.danger.s600};
  font-size: 12px;
`;
