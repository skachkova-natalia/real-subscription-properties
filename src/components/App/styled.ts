import {createGlobalStyle} from 'styled-components';
import {breakpoint, font} from '@src/theme';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  body {
    color: #000;
    margin: 0;
    padding: 20px 60px;
    
    @media (max-width: ${breakpoint.mobile}) {
      padding: 20px;
    }

    #root {
      overflow-x: hidden;
    }

    .ant-select-item-option-content {
      white-space: wrap !important;
    }
  }

  html {
    font-family: ${font.family.primary};
  }
`;
