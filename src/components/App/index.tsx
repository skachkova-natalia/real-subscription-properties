import {useGate} from 'effector-react';
import '@models/init';
import {AppGate} from '@models/app';
import {Header} from '@components/Header';
import {PropertyTable} from '@components/PropertyTable';
import {Footer} from '@components/Footer';
import * as S from './styled';

function App() {
  useGate(AppGate);

  return (
    <>
      <S.GlobalStyle />
      <Header />
      <PropertyTable />
      <Footer />
    </>
  );
}

export default App;
