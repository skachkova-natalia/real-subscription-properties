import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useUnit} from 'effector-react';
import {Button, Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import * as XLSX from 'xlsx';
import {PropertyItem} from '@src/types/table';
import {$filters} from '@models/filters';
import {DimensionCell} from '@components/PropertiesTable/Cells/DimensionCell';
import {ValueCell} from '@components/PropertiesTable/Cells/ValueCell';
import ExcelIconSvg from '@assets/excelIcon.svg?react';
import {color} from '@src/theme';
import {SettingOutlined} from '@ant-design/icons';
import * as S from './styled';
import {$propertiesTable} from '@models/propertiesTable';
import {openTableSettingsModal} from '@models/modals/tableSettingsModal';
import {TableSettingsModal} from '@components/Modals/TableSettingsModal';

export default function PropertiesTable() {
  const {i18n, t} = useTranslation();
  const {data, error, loading} = useUnit($propertiesTable);
  const {propertiesList, selectedProperties} = useUnit($filters);
  const [dataSource, setDataSource] = useState<PropertyItem[]>([]);
  const tableRef = useRef(null);

  const COLUMNS: ColumnsType<PropertyItem> = [
    {
      title: t('property'),
      dataIndex: 'property',
      key: 'property',
      render: (_, row) => row.property_name[i18n.language],
    },
    {
      title: t('value'),
      dataIndex: 'value',
      key: 'value',
      render: (text) => <ValueCell value={text} />,
    },
    {
      title: t('dimension'),
      dataIndex: 'dimension',
      key: 'dimension',
      render: DimensionCell,
    },
  ];

  useEffect(() => {
    setDataSource(data.filter((e) => selectedProperties.includes(e.property_literal)));
  }, [data, selectedProperties]);

  // const doScreenshot = useCallback(() => {
  //   if (tableRef?.current === null) {
  //     return;
  //   }
  //   takeScreenShot(
  //     tableRef.current,
  //     '',
  //     `Таблица свойств вещества ${substancesOptions.find((e) => e.value === currentSubstance)?.label}`,
  //   );
  // }, []);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.map((item) => ({
      'Свойство': item.property_literal,
      'Значение': item.value,
      'Единица измерения': item.dimension,
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'Таблица свойств веществ.xlsx');
  };

  return (
    <>
      <TableSettingsModal />
      <S.TableContainer ref={tableRef}>
        {error && <S.Error>{error.msg[`${i18n.language}`]}</S.Error>}
        <S.ButtonsContainer>
          {Object.keys(propertiesList).length > 0 && (
            <S.SettingsContainer>
              <Button onClick={() => openTableSettingsModal()}>
                <SettingOutlined />
                {t('settings')}
              </Button>
            </S.SettingsContainer>
          )}
          {data?.length > 0 && (
            <>
              {/*<S.StyledButton onClick={doScreenshot}>*/}
              {/*  <ScreenCaptureSvg width={16} height={16} fill={color.primary.s700} />*/}
              {/*  {t('screenshot')}*/}
              {/*</S.StyledButton>*/}
              <S.StyledButton onClick={downloadExcel}>
                <ExcelIconSvg width={16} height={16} fill={color.primary.s700} />
                xlsx
              </S.StyledButton>
            </>
          )}
        </S.ButtonsContainer>
        <Table
          dataSource={dataSource}
          columns={COLUMNS}
          loading={loading}
          pagination={false}
          locale={{emptyText: t('no_data')}}
        />
      </S.TableContainer>
    </>
  );
}
