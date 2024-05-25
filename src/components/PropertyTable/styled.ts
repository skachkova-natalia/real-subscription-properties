import styled from 'styled-components';
import {Table} from 'antd';

export const StyledTable = styled(Table)`
  width: calc(100% - 100px);
  tr:nth-child(2n) td {
    background-color: #fafafa;
  }
`;
