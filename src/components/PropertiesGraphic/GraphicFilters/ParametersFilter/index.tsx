import * as S from './styled';
import {GroupLabel} from '@components/PropertiesGraphic/GraphicFilters/styled';
import {Form} from 'antd';
import {MathJax, MathJaxContext} from 'better-react-mathjax';
import {Option} from '@src/types/common';
import {useMemo, useState} from 'react';
import i18n from 'i18next';
import {useTranslation} from 'react-i18next';
import {useUnit} from 'effector-react';
import {$filters} from '@models/filters';
import {$latexUnitsCode} from '@models/dictionary';

interface Props {
  paramOptions: Option[];
  onPropertyChange: () => void;
  onVariableParameterChange: (e: string) => void;
}

export default function ParametersFilter({paramOptions, onPropertyChange, onVariableParameterChange}: Props) {
  const {t} = useTranslation();
  const {propertiesList} = useUnit($filters);
  const latexUnitsCode = useUnit($latexUnitsCode);
  const [selectedProperty, setSelectedProperty] = useState<string>('');

  const propertyOptions: Option[] = useMemo(() => {
    return propertiesList.map((prop) => ({
      label: `${prop.name[`${i18n.language}`]} (${prop.literal})`,
      value: prop.literal,
    })) || [];
  }, [propertiesList]);

  const propertyDimensionOptions = useMemo(() => {
    return propertiesList.find((prop) => prop.literal === selectedProperty)?.dimensions.map((dimension) => ({
      value: dimension,
      label: <MathJax>{latexUnitsCode[dimension]}</MathJax>,
    })) || [];
  }, [selectedProperty]);

  return (
    <S.FiltersGroup>
      <S.Filter>
        <GroupLabel>{t('property')}</GroupLabel>
        <Form.Item name={`property_name`} className='form-item'>
          <S.StyledSelect
            options={propertyOptions}
            placeholder={t('property')}
            onChange={(e) => {
              setSelectedProperty(e as string);
              onPropertyChange();
            }}
            notFoundContent={t('no_data')}
          />
        </Form.Item>
        <MathJaxContext key={selectedProperty}>
          <Form.Item name={`property_dimension`} className='form-item'>
            <S.DimensionSelect
              options={propertyDimensionOptions}
              placeholder={t('dimension')}
              notFoundContent={t('no_data')}
            />
          </Form.Item>
        </MathJaxContext>
      </S.Filter>
      <S.Filter>
        <GroupLabel>Варьируемый параметр</GroupLabel>
        <Form.Item name={`variable_parameter.id`} className='form-item'>
          <S.StyledSelect
            options={paramOptions}
            placeholder={t('substance')}
            onChange={(e) => {
              onVariableParameterChange(e as string);
            }}
            notFoundContent={t('no_data')}
          />
        </Form.Item>
      </S.Filter>
      <S.Filter>
        <GroupLabel>Количество точек</GroupLabel>
        <Form.Item name={`count`} className='form-item'>
          <S.StyledInput type='number' min={1} max={10000} />
        </Form.Item>
      </S.Filter>
    </S.FiltersGroup>
  )
}
