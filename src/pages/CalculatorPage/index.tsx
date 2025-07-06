import {Tabs, TabsProps} from 'antd';
import {Filters} from '@components/Filters';
import PropertiesTable from '@components/PropertiesTable';
import PropertiesGraphic from '@components/PropertiesGraphic';
import * as S from './styled';

export default function CalculatorPage() {
  const items: TabsProps['items'] = [
    {
      key: 'properties-calculation',
      label: 'Расчет свойств',
      children: <PropertiesTable />,
    },
    {
      key: 'properties-graphic',
      label: 'График',
      children: <PropertiesGraphic />,
    },
  ];

  return (
    <S.MainContainer>
      <Filters />
      <Tabs defaultActiveKey='properties-calculation' items={items} />
    </S.MainContainer>
  );
}
