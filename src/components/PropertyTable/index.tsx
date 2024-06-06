import i18next from 'i18next';
import {Filters} from '@components/PropertyTable/Filters';
import {useUnit} from 'effector-react/effector-react.umd';
import {$propertyTable} from '@models/propertyTable';
import {$filters} from '@models/filters';
import * as S from './styled';

export function PropertyTable() {
  const {data, error, loading} = useUnit($propertyTable);
  const {propertiesList} = useUnit($filters);

  console.log(error);
  const columns = [
    {
      title: i18next.t('property'),
      dataIndex: 'propertyId',
      key: 'propertyId',
      render: (text) =>
        <span>{i18next.t(propertiesList[text]?.toLowerCase().replaceAll(' ', '_').replaceAll('-', '_'))}</span>,
    },
    {
      title: i18next.t('value'),
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: i18next.t('dimension'),
      dataIndex: 'dimension',
      key: 'dimension',
    },
  ];

  return (
    <S.TableContainer>
      <Filters />
      {error && <S.Error>{error}</S.Error>}
      <S.StyledTable
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={false}
      />
    </S.TableContainer>
  );
}
