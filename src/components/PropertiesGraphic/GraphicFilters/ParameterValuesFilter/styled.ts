import styled from 'styled-components';
import {breakpoint} from '@src/theme';
import {Input} from 'antd';
import {SelectComponent} from '@ui-kit/Select';

export const Parameter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;

  @media (max-width: ${breakpoint.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

export const Label = styled.span`
  font-size: 14px;
`;

export const Values = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const DimensionSelect = styled(SelectComponent)`
  min-width: 85px;
  max-width: 85px;
`;

export const StyledInput = styled(Input)`

  @media (max-width: ${breakpoint.tablet}) {
    max-width: 95px;
  }
`;
