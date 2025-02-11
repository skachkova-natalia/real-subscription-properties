import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useUnit} from 'effector-react';
import {Button, Form, Input, Select} from 'antd';
import {MathJax, MathJaxContext} from 'better-react-mathjax';
import {MATHJAX_DIMENSIONS} from '@src/constants';
import {$filters, applyFilters, setCurrentMode, setCurrentSubstance} from '@models/propertyTable/filters';
import {ArrowRightOutlined} from '@ant-design/icons';
import * as S from './styled';

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
  const [params, setParams] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState<string[][]>([]);
  const [selectedDimensions, setSelectedDimensions] = useState<{[key: string]: string}>({});
  const [key, setKey] = useState(true);

  useEffect(() => {
    if (!currentMode) {
      setParams([]);
      setDimensions([]);
      return;
    }
    const modeParams = modesParams.find((mode) => mode.value === currentMode);
    if (modeParams) {
      setParams(modeParams.filter_params || []);
      setDimensions(modeParams.available_param_dimension || []);
      setSelectedDimensions(modeParams.param_dimensions.reduce((acc, dimension, index) => {
        const param = modeParams.filter_params[index];
        if (selectedDimensions[param]) {
          return acc;
        }
        return ({...acc, [param]: dimension});
      }, selectedDimensions));
    }
  }, [currentMode, modesParams]);

  const dimensionOptions = (index) => dimensions[index].map((dimension) => ({
    key: dimension,
    value: dimension,
    label: <MathJax>{MATHJAX_DIMENSIONS[dimension]}</MathJax>,
  }));

  return (
    <S.FiltersContainer>
      <S.Filters>
        <Select
          options={substancesOptions}
          value={currentSubstance}
          onChange={(e) => setCurrentSubstance(e)}
          placeholder={t('substance')}
          style={{width: window.innerWidth > 768 ? 180 : 360}}
          loading={loadingSubstances}
          notFoundContent={t('no_data')}
        />
        <Select
          value={currentMode}
          onChange={(e) => setCurrentMode(e)}
          placeholder={t('parameter_mode')}
          style={{width: window.innerWidth > 920 ? 680 : 360}}
          listItemHeight={45}
          listHeight={250}
          loading={loadingModesParams}
          notFoundContent={t('no_data')}
        >
          {modesOptions.map((option) => (
            <Select.Option value={option.value}>{option.label}</Select.Option>
          ))}
        </Select>
      </S.Filters>
      <S.StyledForm
        layout='inline'
        onFinish={(values) => {
          applyFilters({
            param_values: Object.values(values as object).map((value) => value.replace(',', '.')),
            param_dimensions: params.map((param) => selectedDimensions[param]),
          });
        }}
      >
        {params.map((param, paramIndex) => (
          <S.Parameters key={param}>
            <S.Label>{t(`properties.${param.toLowerCase().replaceAll(' ', '_')}`)}</S.Label>
            <Form.Item name={param}>
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
            {dimensionOptions(paramIndex).length > 0 && (
              <MathJaxContext key={`${key}`}>
                <Select
                  options={dimensionOptions(paramIndex)}
                  value={selectedDimensions[param]}
                  onChange={(newValue) => {
                    setSelectedDimensions({...selectedDimensions, [param]: newValue});
                    setKey((v) => !v);
                  }}
                />
              </MathJaxContext>
            )}
          </S.Parameters>
        ))}
        {params.length > 0 && <Form.Item>
          <Button htmlType='submit' icon={<ArrowRightOutlined />} />
        </Form.Item>}
      </S.StyledForm>
    </S.FiltersContainer>
  );
}
