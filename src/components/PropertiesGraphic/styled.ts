import styled from 'styled-components';
import {color} from '@src/theme';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Error = styled.span`
  color: ${color.secondary.danger};
  font-size: 12px;
`;

export const FixedParameter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
