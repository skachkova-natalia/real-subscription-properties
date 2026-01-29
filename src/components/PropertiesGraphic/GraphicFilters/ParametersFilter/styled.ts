import styled from 'styled-components';
import {Input} from 'antd';
import {breakpoint, color} from '@src/theme';
import {SelectComponent} from '@ui-kit/Select';

export const FiltersGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  @media (max-width: ${breakpoint.laptop}) {
    flex-direction: column;
  }
`;

export const Filter = styled.div`
  position: relative;
  padding: 16px;
  display: flex;
  gap: 4px;
  border: 1px solid ${color.base.s100};
  border-radius: 8px;

  @media (max-width: ${breakpoint.mobile}) {
    padding: 16px 4px;
  }    
`;

export const PropertiesList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const PropertyItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
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

export const StyledInput = styled(Input)`
  min-width: 130px;
  max-width: 130px;
  width: 100%;
`;

export const DimensionSelect = styled(SelectComponent)`
  min-width: 85px;
  max-width: 85px;
  width: 85px;
`;
