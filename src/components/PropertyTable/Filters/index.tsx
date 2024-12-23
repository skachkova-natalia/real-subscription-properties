import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useUnit} from 'effector-react';
import {Button, Form, Input, Select} from 'antd';
import {MathJax, MathJaxContext} from 'better-react-mathjax';
import {MATHJAX_DIMENSIONS} from '@src/constants';
import {$filters, applyFilters, setCurrentMode, setCurrentSubstance} from '@models/filters';
import {ArrowRightOutlined} from '@ant-design/icons';
import * as S from './styled';

export function Filters() {
  const {t} = useTranslation();
  const {substancesOptions, currentSubstance, modesParams, modesOptions, currentMode} = useUnit($filters);
  const [params, setParams] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState<string[][]>([]);
  const [selectedDimensions, setSelectedDimensions] = useState<{[key: string]: string}>({});
  const [key, setKey] = useState(true);

  useEffect(() => {
    if (!currentMode) {
      setParams([]);
      setDimensions([]);
      setSelectedDimensions({});
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
        <S.SelectContainer>
          <S.Label>{t('substance')}</S.Label>
          <Select
            options={substancesOptions}
            value={currentSubstance}
            onChange={(e) => setCurrentSubstance(e)}
            placeholder={t('substance')}
            style={{width: 120}}
          />
        </S.SelectContainer>
        <S.SelectContainer>
          <S.Label>{t('parameter_mode')}</S.Label>
          <Select
            options={modesOptions}
            value={currentMode}
            onChange={(e) => setCurrentMode(e)}
            placeholder={t('parameter_mode')}
            style={{width: 120}}
          />
        </S.SelectContainer>
      </S.Filters>
      <S.StyledForm
        layout='inline'
        onFinish={(values) => {
          applyFilters({
            param_values: Object.values(values as object),
            param_dimensions: params.map((param) => selectedDimensions[param]),
          });
        }}
      >
        {params.map((param, paramIndex) => (
          <S.Parameters key={param}>
            <S.Label>{t(param.toLowerCase().replaceAll(' ', '_'))}</S.Label>
            <Form.Item name={param}>
              <Input
                onKeyPress={(event) => {
                  if (!/[0-9.e-]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                style={{maxWidth: '100px'}}
                required
              />
            </Form.Item>
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
          </S.Parameters>
        ))}
        {params.length > 0 && <Form.Item>
          <Button htmlType='submit' icon={<ArrowRightOutlined />} />
        </Form.Item>}
      </S.StyledForm>
    </S.FiltersContainer>
  );
}
