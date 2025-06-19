import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useUnit} from 'effector-react';
import {Button, Form, Input, Select} from 'antd';
import {MathJax, MathJaxContext} from 'better-react-mathjax';
import {MATHJAX_DIMENSIONS} from '@src/constants';
import {$filters, setCurrentMode, setCurrentSubstance} from '@models/propertyTable/filters';
import * as S from './styled';
import i18n from 'i18next';
import {ArrowRightOutlined} from '@ant-design/icons';

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
  const [selectedDimensions, setSelectedDimensions] = useState<{[key: string]: string}>({});
  const [key, setKey] = useState(true);

  useEffect(() => {
    setSelectedDimensions(modesParams.reduce((acc, param) => {
      if (selectedDimensions[param.id]) {
        return acc;
      }
      return ({...acc, [param.id]: param.unit?.[0] || ''});
    }, selectedDimensions));
  }, [currentMode, modesParams]);

  const dimensionOptions = (units) => units.map((dimension) => ({
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
            <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
          ))}
        </Select>
      </S.Filters>
      <S.StyledForm
        layout='inline'
        onFinish={(values) => {
          console.log(values);
          // applyFilters({
          //   param_values: Object.values(values as object).map((value) => value.replace(',', '.')),
          //   param_dimensions: params.map((param) => selectedDimensions[param]),
          // });
        }}
      >
        {modesParams.map((param) => (
          <S.Parameters key={param.id}>
            <S.Label>{param[`name_${i18n.language}`]}</S.Label>
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
            {param.unit.length > 0 && (
              <MathJaxContext key={`${key}`}>
                <Select
                  options={dimensionOptions(param.unit)}
                  value={selectedDimensions[param.id]}
                  onChange={(newValue) => {
                    setSelectedDimensions({...selectedDimensions, [param.id]: newValue});
                    setKey((v) => !v);
                  }}
                />
              </MathJaxContext>
            )}
          </S.Parameters>
        ))}
        {modesParams.length > 0 && <Form.Item>
          <Button htmlType='submit' icon={<ArrowRightOutlined />} />
        </Form.Item>}
      </S.StyledForm>
    </S.FiltersContainer>
  );
}
