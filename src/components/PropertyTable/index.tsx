import {useTranslation} from 'react-i18next';
import {Filters} from '@components/PropertyTable/Filters';
import {useUnit} from 'effector-react/effector-react.umd';
import {$propertyTable} from '@models/propertyTable';
import {$filters} from '@models/filters';
import * as S from './styled';

export function PropertyTable() {
  const {i18n, t} = useTranslation();
  const {data, error, loading} = useUnit($propertyTable);
  const {propertiesList} = useUnit($filters);

  const columns = [
    {
      title: t('property'),
      dataIndex: 'propertyId',
      key: 'propertyId',
      render: (text) =>
        <span>{t(propertiesList[text]?.toLowerCase().replaceAll(' ', '_').replaceAll('-', '_'))}</span>,
    },
    {
      title: t('value'),
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: t('dimension'),
      dataIndex: 'dimension',
      key: 'dimension',
    },
  ];

  return (
    <S.TableContainer>
      <Filters />
      {error && <S.Error>{error[`msg_user_${i18n.language}`]}</S.Error>}
      <S.StyledTable
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={false}
      />
    </S.TableContainer>
  );
}
