import {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useUnit} from 'effector-react';
import {Button, Table, Tooltip} from 'antd';
import {ColumnsType} from 'antd/es/table';
import * as XLSX from 'xlsx';
import {PropertyItem} from '@src/types/table';
import {takeScreenShot} from '@utils/screenshot';
import {$filters} from '@models/propertyTable/filters';
import {$propertyTable} from '@models/propertyTable/table';
import {Filters} from '@components/PropertyTable/Filters';
import {DimensionCell} from '@components/PropertyTable/Cells/DimensionCell';
import {ValueCell} from '@components/PropertyTable/Cells/ValueCell';
import ScreenCaptureSvg from '@assets/screenCapture.svg?react';
import ExcelIconSvg from '@assets/excelIcon.svg?react';
import {color} from '@src/theme';
import {openTableSettingsModal} from '@models/propertyTable/settings';
import {SettingOutlined} from '@ant-design/icons';
import {SettingsModal} from '@components/PropertyTable/SettingsModal';
import * as S from './styled';

export function PropertyTable() {
  const {i18n, t} = useTranslation();
  const {data, error, loading} = useUnit($propertyTable);
  const {propertiesList, selectedProperties, currentSubstance, substancesOptions} = useUnit($filters);
  const [dataSource, setDataSource] = useState<PropertyItem[]>([]);

  const tableRef = useRef(null);

  const COLUMNS: ColumnsType<PropertyItem> = [
    {
      title: t('property'),
      dataIndex: 'propertyId',
      key: 'propertyId',
      render: (text) =>
        <span>{t(`properties.${propertiesList[text]?.toLowerCase().replaceAll(' ', '_').replaceAll('-', '_')}`)}</span>,
    },
    {
      title: t('value'),
      dataIndex: 'value',
      key: 'value',
      render: ValueCell,
    },
    {
      title: t('dimension'),
      dataIndex: 'dimension',
      key: 'dimension',
      render: DimensionCell,
    },
  ];

  useEffect(() => {
    setDataSource(data.filter((e)=>selectedProperties.includes(e.propertyId)));
  }, [data, selectedProperties]);

  const doScreenshot = useCallback(() => {
    if (tableRef?.current === null) {
      return;
    }
    takeScreenShot(
      tableRef.current,
      '',
      `Таблица свойств вещества ${substancesOptions.find((e) => e.value === currentSubstance)?.label}`,
    );
  }, []);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.map((item) => ({
      'Свойство': item.propertyId,
      'Значение': item.value,
      'Единица измерения': item.dimension,
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'Таблица свойств веществ.xlsx');
  };

  return (
    <>
      <SettingsModal />
      <S.TableContainer ref={tableRef}>
        <S.FilterContainer>
          <Filters />
          {data?.length > 0 && (
            <S.ButtonsContainer>
              <S.StyledButton onClick={doScreenshot}>
                <ScreenCaptureSvg width={16} height={16} fill={color.primary.s700} />
                {t('screenshot')}
              </S.StyledButton>
              <S.StyledButton onClick={downloadExcel}>
                <ExcelIconSvg width={16} height={16} fill={color.primary.s700} />
                xlsx
              </S.StyledButton>
            </S.ButtonsContainer>
          )}
        </S.FilterContainer>
        <S.SettingsContainer>
          <Tooltip title='Настройка строк таблицы'>
            <Button onClick={() => openTableSettingsModal()}>
              <SettingOutlined />
              {t('settings')}
            </Button>
          </Tooltip>
        </S.SettingsContainer>
        {error && <S.Error>{error[`msg_user_${i18n.language}`]}</S.Error>}
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
