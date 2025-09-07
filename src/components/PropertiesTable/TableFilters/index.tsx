import {$filters, applyFilters} from '@models/filters';
import * as S from './styled';
import i18n from 'i18next';
import {Form, Input, Select} from 'antd';
import {MathJax, MathJaxContext} from 'better-react-mathjax';
import {ArrowRightOutlined} from '@ant-design/icons';
import {useUnit} from 'effector-react';
import {$latexUnitsCode} from '@models/dictionary';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router';
import {updateQueryParams} from '@utils/queryParamsHelper';

export default function TableFilters() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const {modesParams, currentMode} = useUnit($filters);
  const latexUnitsCode = useUnit($latexUnitsCode);
  const [form] = Form.useForm();
  const [selectedDimensions, setSelectedDimensions] = useState<{[key: string]: string}>({});
  const [key, setKey] = useState(true);

  useEffect(() => {
    if (!Object.keys(selectedDimensions).length) {
      const searchParams = new URLSearchParams(location.search);
      const properties = searchParams.get('tableParams') || '';
      const defaultDimensions = {};
      const defaultValues = {};
      properties.split(',').forEach((item)=>{
        const [prop, value, dimension] = item.split(':');
        defaultDimensions[prop] = dimension;
        defaultValues[prop] = value;
      })
      setSelectedDimensions(defaultDimensions);
      form.setFieldsValue(defaultValues);
    }
  }, [location.search]);

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

  const onSubmit = (values) => {
    const params = Object.entries(values || {})
      .filter(([, value]) => !!value)
      .map(([key, value]) => `${key}:${value}:${selectedDimensions[key]}`)
      .join(',');
    updateQueryParams(navigate, 'tableParams', params.toString());

    const filters = Object.keys(values || {}).map((key) => ({
      id: key,
      value: Number(values?.[key]),
      param_dimension: selectedDimensions[key],
    }));
    applyFilters(filters);
  }

  return (
    <S.StyledForm
      form={form}
      layout='inline'
      onFinish={onSubmit}
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
              allowClear
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
          <S.StyledButton
            type='primary'
            htmlType='submit'
            icon={<ArrowRightOutlined />}
            iconPosition='end'
          >
            {t('common.calculate')}
          </S.StyledButton>
        </Form.Item>
      )}
    </S.StyledForm>
  );
}
