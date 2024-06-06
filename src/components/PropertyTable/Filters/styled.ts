import styled from 'styled-components';
import {Form} from 'antd';

export const FiltersContainer = styled.div`
  min-width: 710px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 800px) {
    min-width: auto;
  }
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  @media (max-width: 800px) {
    flex-wrap: wrap;
  }
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

export const Parameters = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const StyledForm = styled(Form)`
  min-height: 32px;
  gap: 15px;
`;
