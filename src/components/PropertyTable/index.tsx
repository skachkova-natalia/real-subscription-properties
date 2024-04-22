import i18next from 'i18next';
import {Table} from 'antd';
import {Filters} from '@components/PropertyTable/Filters';

export function PropertyTable() {
  const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

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
