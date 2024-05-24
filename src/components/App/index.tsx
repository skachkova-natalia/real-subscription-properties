import {useGate} from 'effector-react';
import './styled.css';
import '@models/init';
import {AppGate} from '@models/app';
import {PropertyTable} from '@components/PropertyTable';

function App() {
  useGate(AppGate);

  return (
    <>
      <PropertyTable />
    </>
  );
}

export default App;
