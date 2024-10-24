import {useGate} from 'effector-react';
import {Outlet} from 'react-router-dom';
import '@models/init';
import {AppGate} from '@models/app';
import {Header} from '@components/Header';
import {Footer} from '@components/Footer';
import {UserInfo} from '@components/UserInfo';
import * as S from './styled';

function App() {
  useGate(AppGate);

  return (
    <>
      <S.GlobalStyle />
      <UserInfo />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
