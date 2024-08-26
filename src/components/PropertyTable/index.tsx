import {useCallback, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useUnit} from 'effector-react/effector-react.umd';
import {takeScreenShot} from '@utils/screenshot';
import {$filters} from '@models/filters';
import {$propertyTable} from '@models/propertyTable';
import {Filters} from '@components/PropertyTable/Filters';
import {ValueCell} from '@components/PropertyTable/Cells/ValueCell';
import ScreenCaptureSvg from '@assets/screen-capture.svg?react';
import {color} from '@src/theme';
import * as S from './styled';
import {DimensionCell} from '@components/PropertyTable/Cells/DimensionCell';

export function PropertyTable() {
  const {i18n, t} = useTranslation();
  const {data, error, loading} = useUnit($propertyTable);
  const {propertiesList} = useUnit($filters);

  const tableRef = useRef(null);

  const doScreenshot = useCallback(() => {
    if (tableRef?.current === null) {
      return;
    }
    takeScreenShot(
      tableRef.current,
      'png',
      `table`,
    );
  }, []);

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
      render: ValueCell,
    },
    {
      title: t('dimension'),
      dataIndex: 'dimension',
      key: 'dimension',
      render: DimensionCell,
    },
  ];

  return (
    <S.TableContainer ref={tableRef}>
      <S.FilterContainer>
        <Filters />
        {data?.length > 0 && <S.StyledButton onClick={doScreenshot}>
          <ScreenCaptureSvg width={16} height={16} fill={color.primary.s700} />
          {t('screenshot')}
        </S.StyledButton>}
      </S.FilterContainer>
      {error && <S.Error>{error[`msg_user_${i18n.language}`]}</S.Error>}
      <S.StyledTable
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={false}
        locale={{ emptyText: t('no_data') }}
      />
    </S.TableContainer>
  );
}
