import styled from 'styled-components';
import {Typography} from 'antd';
import {breakpoint, color} from '@src/theme';
import {SelectComponent} from '@ui-kit/Select';

export const FormContainer = styled.div`
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  .form-item {
    margin: 0;
  }
`;

export const ComponentsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const ComponentItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 4px;
`;

export const Filter = styled.div`
  position: relative;
  padding: 16px;
  border: 1px solid ${color.base.s100};
  border-radius: 8px;

  @media (max-width: ${breakpoint.mobile}) {
    padding: 16px 4px;
  }    
`;

export const GroupLabel = styled(Typography)`
  position: absolute;
  top: -12px;
  padding: 0 8px;
  margin: 0;
  background: ${color.base.s0};
  color: ${color.base.s800};
`;

export const StyledSelect = styled(SelectComponent)`
  min-width: 210px;
  max-width: 210px;
  width: 100%;

  @media (max-width: ${breakpoint.laptop}) {
    width: 220px;
  }

  @media (max-width: ${breakpoint.tablet}) {
    width: 100%;
    min-width: 180px;
    max-width: 180px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 16px;
`
