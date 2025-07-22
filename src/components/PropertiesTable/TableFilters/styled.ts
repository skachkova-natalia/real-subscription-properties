import styled from 'styled-components';
import {Button, Form} from 'antd';
import {color} from '@src/theme';

export const StyledForm = styled(Form)`
  min-height: 32px;
  padding: 20px;
  gap: 16px;
  background-color: ${color.primary.s20};
  border: 1px solid ${color.primary.s100};
  border-radius: 5px;
`;

export const Label = styled.span`
  font-size: 14px;
`;

export const Parameter = styled.div`
  display: grid;
  grid-template-columns: minmax(90px, max-content) 120px 70px;
  align-items: center;
  gap: 4px;
`;

export const StyledButton = styled(Button)`
  background-color: ${color.primary.s700};
`
