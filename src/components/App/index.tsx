import {useGate} from 'effector-react';
import '@models/init';
import {AppGate} from '@models/app';
import {PropertyTable} from '@components/PropertyTable';
import {Header} from '@components/Header';
import * as S from './styled';

function App() {
  useGate(AppGate);

  return (
    <>
      <S.GlobalStyle />
      <Header />
      <PropertyTable />
    </>
  );
}

export default App;
