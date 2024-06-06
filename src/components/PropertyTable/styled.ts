import styled from 'styled-components';
import {Table} from 'antd';
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
`;

export const StyledTable = styled(Table)`
  width: 100%;

  tr:nth-child(2n) td {
    background-color: ${color.base.s10};
  }
`;
