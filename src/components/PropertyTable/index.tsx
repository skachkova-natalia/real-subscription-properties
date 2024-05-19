import i18next from 'i18next';
import {Table} from 'antd';
import {Filters} from '@components/PropertyTable/Filters';
import {useUnit} from 'effector-react/effector-react.umd';
import {$propertyTable} from '@models/propertyTable';

export function PropertyTable() {
  const dataSource = useUnit($propertyTable);

  const columns = [
    {
      title: i18next.t('property'),
      dataIndex: 'property',
      key: 'property',
    },
    {
      title: i18next.t('value'),
      dataIndex: 'value',
      key: 'value',
      editable: true,
    },
    {
      title: i18next.t('dimension'),
      dataIndex: 'dimension',
      key: 'dimension',
      render: (text) => <a>{text}</a>,
      editable: true,
    },
  ];

  return (
    <>
      <Filters />
      <Table dataSource={dataSource} columns={columns} pagination={false}/>
    </>);
}
