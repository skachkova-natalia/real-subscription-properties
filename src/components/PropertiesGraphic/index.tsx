import * as S from './styled';
import GraphicFilters from '@components/PropertiesGraphic/GraphicFilters';
import {$graphic, getPropertyPoints, setFilters, setFixedParameterValues} from '@models/propertiesGraphic';
import {useUnit} from 'effector-react';
import {LoadingOutlined} from '@ant-design/icons';
import {Button, Input, Spin} from 'antd';
import i18n from 'i18next';
import Graphic from '@components/PropertiesGraphic/Graphic';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {GraphicFiltersParams} from '@src/types/graphic';

export default function PropertiesGraphic() {
  const {t} = useTranslation();
  const {
    filters,
    points,
    loading,
    error,
    fixedParameter,
    fixedParameterValues,
  } = useUnit($graphic);
  const [newValue, setNewValue] = useState<string>('');

  const onAdd = () => {
    if (newValue && filters) {
      setFixedParameterValues([...fixedParameterValues, newValue]);
      setFilters({
        ...filters,
        fixed_parameter: {
          ...filters.fixed_parameter,
          value: Number(newValue),
        },
      } as GraphicFiltersParams);
      getPropertyPoints();
    }
    setNewValue('');
  };

  return (
    <S.MainContainer>
      <GraphicFilters />
      {error && (<S.Error>{error.msg[`${i18n.language}`]}</S.Error>)}
      {!!Object.keys(points).length && (
        <>
          <S.FixedParameter>
            <Input
              value={newValue}
              onKeyPress={(e) => {
                const value = (e.target as HTMLInputElement).value || '';
                if (!/[0-9.,e-]/.test(e.key) || ((value.includes('.') || value.includes(',')) && (e.key === '.' || e.key === ',')) || value.includes('e') && e.key === 'e') {
                  e.preventDefault();
                }
              }}
              onChange={(e) => setNewValue(e.target.value as string)}
              style={{width: '100px'}}
              inputMode='decimal'
              placeholder={`${fixedParameter} = `}
              required
              allowClear
            />
            <Button
              type='link'
              onClick={onAdd}
            >
              {t('common.add')}
            </Button>
          </S.FixedParameter>
          <Spin indicator={<LoadingOutlined spin />} spinning={loading}>
            {Object.keys(points).map((prop) => (
              <Graphic key={prop} points={points[prop]} property={prop} />
            ))}
          </Spin>
        </>
      )}
    </S.MainContainer>
  );
}
