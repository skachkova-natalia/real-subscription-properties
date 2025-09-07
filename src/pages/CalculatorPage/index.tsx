import {Tabs, TabsProps} from 'antd';
import {Filters} from '@components/Filters';
import PropertiesTable from '@components/PropertiesTable';
import PropertiesGraphic from '@components/PropertiesGraphic';
import * as S from './styled';
import {useTranslation} from 'react-i18next';

export default function CalculatorPage() {
  const {t} = useTranslation();

  const items: TabsProps['items'] = [
    {
      key: 'properties-calculation',
      label: t('tabs.calculating'),
      children: <PropertiesTable />,
    },
    {
      key: 'properties-graphic',
      label: t('tabs.graphic'),
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
