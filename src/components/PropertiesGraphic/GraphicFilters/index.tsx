import * as S from './styled';
import {useTranslation} from 'react-i18next';
import {useUnit} from 'effector-react';
import {$filters} from '@models/filters';
import {Option} from '@src/types/common';
import {useEffect, useMemo} from 'react';
import i18n from 'i18next';
import {ArrowRightOutlined} from '@ant-design/icons';
import ParameterValuesFilter from '@components/PropertiesGraphic/GraphicFilters/ParameterValuesFilter';
import ParametersFilter from '@components/PropertiesGraphic/GraphicFilters/ParametersFilter';
import {GraphicFiltersParams} from '@src/types/graphic';
import {
  $graphic,
  getPropertyPoints,
  setFixedParameter,
  setFixedParameterValues,
  setSelectedProperty,
  setVariableParameter,
} from '@models/propertiesGraphic';
import {updateQueryParams} from '@utils/queryParamsHelper';
import {useNavigate} from 'react-router';
import {Form} from 'antd';

export default function GraphicFilters() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {modesParams, currentSubstance, currentMode} = useUnit($filters);
  const {variableParameter, fixedParameterValues} = useUnit($graphic);

  useEffect(() => {
    if (variableParameter) {
      return;
    }
    const searchParams = new URLSearchParams(location.search);
    const graphicParams =  searchParams.get('graphicParams');
    if (!graphicParams) {
      return;
    }
    const [prop, fixedParam, varParam] = graphicParams.split(';') || [];
    const [property_name, dimension_response, count] = prop.split(':');
    const [fixed_id, value, fixed_param_dimension] = fixedParam.split(':');
    const [variable_id, min, max, variable_param_dimension] = varParam.split(':');
    setSelectedProperty(property_name);
    setFixedParameter(fixed_id);
    setVariableParameter(variable_id);
    form.setFieldsValue({
      'property_name': property_name,
      'dimension_response': dimension_response,
      'count': count,
      'fixed_parameter.id': fixed_id,
      'fixed_parameter.value': value,
      'fixed_parameter.param_dimension': fixed_param_dimension,
      'variable_parameter.id': variable_id,
      'variable_parameter.min': min,
      'variable_parameter.max': max,
      'variable_parameter.param_dimension': variable_param_dimension,
    });
  }, [location.search]);

  const paramOptions: Option[] = useMemo(() => {
    return modesParams.map((param) => ({
      label: `${param.name[`${i18n.language}`]} (${param.id})`,
      value: param.id,
    })) || [];
  }, [modesParams]);

  useEffect(() => {
    if (!variableParameter) {
      return;
    }
    setVariableParameter('');
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
    setVariableParameter(e);
    form.setFieldsValue({
      'variable_parameter.min': undefined,
      'variable_parameter.max': undefined,
      'variable_parameter.param_dimension': undefined,
      'fixed_parameter.value': undefined,
      'fixed_parameter.param_dimension': undefined,
    });
  };

  const onSubmit = (values: unknown) => {
    if (!values) {
      return;
    }

    const fixedParameter = paramOptions.find((param) => param.value !== variableParameter)?.value;
    if (Object.values(fixedParameterValues).some((param) => param === values['fixed_parameter.value'])) {
      return;
    }
    if (fixedParameter) {
      setFixedParameter(fixedParameter);
    }
    setFixedParameterValues({[`${fixedParameter}`]: values['fixed_parameter.value']});

    const params = `${values['property_name']}:${values['dimension_response']}:${values['count']};${fixedParameter}:${values['fixed_parameter.value']}:${values['fixed_parameter.param_dimension']};${values['variable_parameter.id']}:${values['variable_parameter.min']}:${values['variable_parameter.max']}:${values['variable_parameter.param_dimension']}`;
    updateQueryParams(navigate, 'graphicParams', params.toString());

    const filters = {
      mode_name: currentMode,
      substance_name: currentSubstance,
      property_name: values['property_name'],
      dimension_response: values['dimension_response'],
      count: values['count'] || 1000,
      fixed_parameter: {
        id: fixedParameter,
        value: values['fixed_parameter.value'],
        param_dimension: values['fixed_parameter.param_dimension'],
      },
      variable_parameter: {
        id: values['variable_parameter.id'],
        min: values['variable_parameter.min'],
        max: values['variable_parameter.max'],
        param_dimension: values['variable_parameter.param_dimension'],
      },
    } as GraphicFiltersParams;
    getPropertyPoints(filters);
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
          {variableParameter && (
            <S.Parameters>
              {modesParams.map((param) => (
                <ParameterValuesFilter key={param.id} param={param} isVariable={param.id === variableParameter} />
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


