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
  display: grid;
  align-items: center;
  grid-template-columns: 30% 1fr;
  gap: 16px;
  @media (max-width: 800px) {
    grid-template-columns: 100%;
  }
`;

export const StyledForm = styled(Form)`
  min-height: 32px;
  padding: 20px;
  gap: 16px;
  background-color: #F5F8FF;
  border: 1px solid #CCDDFF;
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
