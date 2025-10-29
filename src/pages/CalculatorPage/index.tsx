import {Tabs, TabsProps} from 'antd';
import {Filters} from '@components/Filters';
import * as S from './styled';
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router';
import {useMemo} from 'react';
import {Outlet} from 'react-router-dom';

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
      label: t('tabs.calculation'),
    },
    {
      key: 'graphic',
      label: t('tabs.graphic'),
    },
  ];

  const handleOnChange = (path: string) => {
    navigate(`${path}${location.search}`);
  };

  return (
    <S.MainContainer>
      <Filters />
      <Tabs defaultActiveKey={activeKey} items={items} onChange={handleOnChange} />
      <Outlet />
    </S.MainContainer>
  );
}
