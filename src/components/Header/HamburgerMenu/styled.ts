import styled from 'styled-components';
import {Button} from 'antd';
import {breakpoint} from '@src/theme';

export const HamburgerMenu = styled(Button)`
  display: none !important;
  @media (max-width: ${breakpoint.mobile}) {
    display: block !important;
  }
`;

export const MenuContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
  display: grid;
  flex-direction: row;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
