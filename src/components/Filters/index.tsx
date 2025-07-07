import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useUnit} from 'effector-react';
import {Button, Form, Input, Select} from 'antd';
import {MathJax, MathJaxContext} from 'better-react-mathjax';
import * as S from './styled';
import i18n from 'i18next';
import {ArrowRightOutlined} from '@ant-design/icons';
import {$filters, applyFilters, setCurrentMode, setCurrentSubstance} from '@models/filters';
import {$latexUnitsCode} from '@models/dictionary';
import {color} from '@src/theme';

export function Filters() {
  const {t} = useTranslation();
  const {
    loadingSubstances,
    substancesOptions,
    currentSubstance,
    loadingModesParams,
    modesParams,
    modesOptions,
    currentMode,
  } = useUnit($filters);
  const latexUnitsCode = useUnit($latexUnitsCode);

  const [selectedDimensions, setSelectedDimensions] = useState<{[key: string]: string}>({});
  const [key, setKey] = useState(true);

  useEffect(() => {
    setSelectedDimensions(modesParams.reduce((acc, param) => {
      if (selectedDimensions[param.id]) {
        return acc;
      }
      return ({...acc, [param.id]: param.units?.[0] || ''});
    }, selectedDimensions));
  }, [currentMode, modesParams]);

  const dimensionOptions = (units) => units.map((dimension) => ({
    key: dimension,
    value: dimension,
    label: <MathJax>{latexUnitsCode[dimension]}</MathJax>,
  }));

  return (
    <S.FiltersContainer>
      <S.Filters>
        <Select
          options={substancesOptions}
          value={currentSubstance}
          onChange={(e) => setCurrentSubstance(e)}
          placeholder={t('substance')}
          loading={loadingSubstances}
          notFoundContent={t('no_data')}
        />
        <Select
          value={currentMode}
          onChange={(e) => setCurrentMode(e)}
          placeholder={t('parameter_mode')}
          listItemHeight={45}
          listHeight={250}
          loading={loadingModesParams}
          notFoundContent={t('no_data')}
        >
          {modesOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
          ))}
        </Select>
      </S.Filters>
      <S.StyledForm
        layout='inline'
        onFinish={(values) => {
          const filters = Object.keys(values || {}).map((key) => ({
            id: key,
            value: Number(values?.[key]),
            param_dimension: selectedDimensions[key],
          }));
          applyFilters(filters);
        }}
      >
        {modesParams.map((param) => (
          <S.Parameter key={param.id}>
            <S.Label>{param.name[`${i18n.language}`]}</S.Label>
            <Form.Item name={param.id}>
              <Input
                onKeyPress={(e) => {
                  const value = (e.target as HTMLInputElement).value || '';
                  if (!/[0-9.,e-]/.test(e.key) || ((value.includes('.') || value.includes(',')) && (e.key === '.' || e.key === ',')) || value.includes('e') && e.key === 'e') {
                    e.preventDefault();
                  }
                }}
                style={{width: '120px'}}
                inputMode='decimal'
                required
              />
            </Form.Item>
            {param.units?.length > 0 && (
              <MathJaxContext key={`${key}`}>
                <Select
                  options={dimensionOptions(param.units)}
                  value={selectedDimensions[param.id]}
                  onChange={(newValue) => {
                    setSelectedDimensions({...selectedDimensions, [param.id]: newValue});
                    setKey((v) => !v);
                  }}
                />
              </MathJaxContext>
            )}
          </S.Parameter>
        ))}
        {modesParams.length > 0 && (
          <Form.Item>
            <Button type='primary' htmlType='submit' style={{backgroundColor: color.primary.s700}}>Расчитать <ArrowRightOutlined /></Button>
          </Form.Item>
        )}
      </S.StyledForm>
    </S.FiltersContainer>
  );
}
