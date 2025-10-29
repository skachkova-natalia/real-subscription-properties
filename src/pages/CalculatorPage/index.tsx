import {Tabs, TabsProps} from 'antd';
import {Filters} from '@components/Filters';
import PropertiesTable from '@components/PropertiesTable';
import PropertiesGraphic from '@components/PropertiesGraphic';
import * as S from './styled';
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router';
import {useMemo} from 'react';

export default function CalculatorPage() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const activeKey = useMemo(() => {
    return location.pathname.replaceAll('/', '') || 'calculation';
  }, [location]);

  const items: TabsProps['items'] = [
    {
      key: 'calculation',
      label: t('tabs.calculating'),
      children: <PropertiesTable />,
    },
    {
      key: 'graphic',
      label: t('tabs.graphic'),
      children: <PropertiesGraphic />,
    },
  ];

  const handleOnChange = (path: string) => {
    navigate(`${path}/${location.search}`);
  };

  return (
    <S.MainContainer>
      <Filters />
      <Tabs defaultActiveKey={activeKey} items={items} onChange={handleOnChange} />
    </S.MainContainer>
  );
}
