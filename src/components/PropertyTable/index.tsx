import i18next from 'i18next';
import {Filters} from '@components/PropertyTable/Filters';
import {useUnit} from 'effector-react/effector-react.umd';
import {$propertyTable} from '@models/propertyTable';
import {$filters} from '@models/filters';
import * as S from './styled';

export function PropertyTable() {
  const dataSource = useUnit($propertyTable);
  const {propertiesList} = useUnit($filters);

  console.log(dataSource);

  const columns = [
    {
      title: i18next.t('property'),
      dataIndex: 'propertyId',
      key: 'propertyId',
      render: (text) => <span>{i18next.t(propertiesList[text]?.toLowerCase().replaceAll(' ', '_').replaceAll('-', '_'))}</span>,
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
      render: () => <span>SI</span>,
    },
  ];

  return (
    <>
      <Filters />
      <S.StyledTable dataSource={dataSource} columns={columns} pagination={false}/>
    </>);
}
