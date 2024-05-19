import styled from 'styled-components';
import {Form} from 'antd';

export const FiltersContainer = styled.div`
  min-width: 750px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const Label = styled.span`
  font-size: 14px;
`;

export const StyledForm = styled(Form)`
  min-height: 32px;
`;
