import styled from 'styled-components';
import {breakpoint} from '@src/theme';
import {Typography} from 'antd';

export const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 1px rgb(0 0 0 / 15%);
  @media (max-width: ${breakpoint.tablet}) {
    padding: 10px 50px;
  }
  @media (max-width: ${breakpoint.mobile}) {
    flex-direction: row;
    align-items: center;
    gap: 8px;
    padding: 10px 0;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  @media (max-width: ${breakpoint.mobile}) {
    display: none;
  }
`;

export const StyledTitle = styled(Typography.Title)`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  &.ant-typography {
    margin: 10px;
    color: ${props => props.color || '#0278BE'};
  }
`;

export const MenuContainer = styled.div`
  display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  @media (max-width: ${breakpoint.mobile}) {
    display: none;
  }
`;
