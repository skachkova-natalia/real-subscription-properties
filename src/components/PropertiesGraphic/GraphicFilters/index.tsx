import * as S from './styled';
import {useTranslation} from 'react-i18next';
import {useUnit} from 'effector-react';
import {$filters} from '@models/filters';
import {Option} from '@src/types/common';
import {useEffect, useMemo, useState} from 'react';
import i18n from 'i18next';
import {ArrowRightOutlined} from '@ant-design/icons';
import {useForm} from 'antd/es/form/Form';
import ParameterValuesFilter from '@components/PropertiesGraphic/GraphicFilters/ParameterValuesFilter';
import ParametersFilter from '@components/PropertiesGraphic/GraphicFilters/ParametersFilter';
import {GraphicParams} from '@src/types/graphic';
import {getPropertyPoints} from '@models/propertiesGraphic';

export default function GraphicFilters() {
  const {t} = useTranslation();
  const [form] = useForm();
  const {modesParams, currentSubstance, currentMode} = useUnit($filters);
  const [variableParam, setVariableParam] = useState<string>('');

  const paramOptions: Option[] = useMemo(() => {
    return modesParams.map((param) => ({
      label: `${param.name[`${i18n.language}`]} (${param.id})`,
      value: param.id,
    })) || [];
  }, [modesParams]);

  useEffect(() => {
    setVariableParam('');
    form.setFieldsValue({
      'property_name': undefined,
      'dimension_response': undefined,
      'variable_parameter.id': undefined,
      'variable_parameter.min': undefined,
      'variable_parameter.max': undefined,
      'variable_parameter.param_dimension': undefined,
      'fixed_parameter.value': undefined,
      'fixed_parameter.param_dimension': undefined,
    });
  }, [currentSubstance, currentMode]);

  const onPropertyChange = () => {
    form.setFieldsValue({'dimension_response': undefined});
  };

  const onVariableParameterChange = (e: string) => {
    setVariableParam(e);
    form.setFieldsValue({
      'variable_parameter.min': undefined,
      'variable_parameter.max': undefined,
      'variable_parameter.param_dimension': undefined,
      'fixed_parameter.value': undefined,
      'fixed_parameter.param_dimension': undefined,
    });
  };

  const onSubmit = (value: unknown) => {
    if (!value) {
      return;
    }
    const params = {
      mode_name: currentMode,
      substance_name: currentSubstance,
      property_name: value['property_name'],
      dimension_response: value['dimension_response'],
      count: value['count'] || 1000,
      fixed_parameter: {
        id: paramOptions.find((param) => param.value !== variableParam)?.value,
        value: value['fixed_parameter.value'],
        param_dimension: value['fixed_parameter.param_dimension'],
      },
      variable_parameter: {
        id: value['variable_parameter.id'],
        min: value['variable_parameter.min'],
        max: value['variable_parameter.max'],
        param_dimension: value['variable_parameter.param_dimension'],
      },
    } as GraphicParams;
    getPropertyPoints(params);
  };

  return (
    <S.StyledForm
      form={form}
      initialValues={{count: 1000}}
      layout='inline'
      onFinish={onSubmit}
    >
      <S.FiltersContainer>
        <ParametersFilter
          paramOptions={paramOptions}
          onPropertyChange={onPropertyChange}
          onVariableParameterChange={onVariableParameterChange}
        />
        <S.ParametersContainer>
          {variableParam && (
            <S.Parameters>
              {modesParams.map((param) => (
                <ParameterValuesFilter key={param.id} param={param} isVariable={param.id === variableParam} />
              ))}
            </S.Parameters>
          )}
        </S.ParametersContainer>
      </S.FiltersContainer>
      <S.StyledButton
        type='primary'
        htmlType='submit'
        icon={<ArrowRightOutlined />}
        iconPosition='end'
      >
        {t('common.calculate')}
      </S.StyledButton>
    </S.StyledForm>
  );
}


