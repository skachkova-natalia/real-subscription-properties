import styled from 'styled-components';
import {Button} from 'antd';
import {breakpoint, color} from '@src/theme';

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: Roboto, sans-serif;

  @media (max-width: ${breakpoint.tablet}) {
    .ant-table {
      font-size: 12px;
    }
  }
`;

export const SettingsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;

  @media (max-width: ${breakpoint.laptop}) {
    flex-direction: row;
  }
`;

export const StyledButton = styled(Button)`
  width: 100%;
  max-width: 125px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${color.primary.s700};
  border: 1px solid ${color.primary.s700};
`;

export const Error = styled.span`
  color: ${color.secondary.danger};
  font-size: 12px;
`;
