import {useGate} from 'effector-react';
import {Outlet} from 'react-router-dom';
import '@models/init';
import {AppGate} from '@models/app';
import {Header} from '@components/Header';
import * as S from './styled';
import {notification} from 'antd';
import {Footer} from '@components/Footer';

notification.config({
  placement: 'topLeft',
  duration: 3,
  rtl: false,
});

function App() {
  useGate(AppGate);

  return (
    <>
      <S.GlobalStyle />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
