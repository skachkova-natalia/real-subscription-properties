import {createGlobalStyle} from 'styled-components';
import {color, font} from '@src/theme';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  body {
    background-color: ${color.base.s10};
    color: #000;
    margin: 0;

    #root {
      overflow-x: hidden;
    }
  }

  html {
    font-family: ${font.family.primary};
  }
`;
