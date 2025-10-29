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
  const {variableParameter} = useUnit($graphic);

  useEffect(() => {
    if (variableParameter) {
      return;
    }
    const searchParams = new URLSearchParams(location.search);
    const graphicParams =  searchParams.get('graphicParams');
    if (!graphicParams) {
      return;
    }
    const [props, count, fixedParam, varParam] = graphicParams.split(';') || [];
    const properties = props.split(',').map((prop) => {
      const [name, dimension] = prop.split(':');
      return ({name, dimension});
    })
    const [fixed_id, value, fixed_param_dimension] = fixedParam?.split(':') || [];
    const [variable_id, min, max, variable_param_dimension] = varParam?.split(':') || [];
    setFixedParameter(fixed_id);
    setVariableParameter(variable_id);
    form.setFieldsValue({
      'properties': properties,
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
      'properties': [],
      'variable_parameter.id': undefined,
      'variable_parameter.min': undefined,
      'variable_parameter.max': undefined,
      'variable_parameter.param_dimension': undefined,
      'fixed_parameter.value': undefined,
      'fixed_parameter.param_dimension': undefined,
    });
  }, [currentSubstance, currentMode]);

  useEffect(() => {
    if (!variableParameter) {
      return;
    }
    modesParams.forEach((param) => {
      if (param.id === variableParameter) {
        form.setFieldValue('variable_parameter.param_dimension', param.units[0]);
      } else {
        form.setFieldValue('fixed_parameter.param_dimension', param.units[0]);
      }
    })
  }, [variableParameter]);

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

    const properties: string[] = [];
    const fixedParameterValues = {};
    values['properties'].forEach((prop)=> {
      properties.push(`${prop['name']}:${prop['dimension']}`);
      fixedParameterValues[`${prop['name']}`] = values['fixed_parameter.value'];
    });
    setFixedParameterValues(fixedParameterValues);

    const params = `${properties.join(',')};${values['count']};${fixedParameter}:${values['fixed_parameter.value']}:${values['fixed_parameter.param_dimension']};${values['variable_parameter.id']}:${values['variable_parameter.min']}:${values['variable_parameter.max']}:${values['variable_parameter.param_dimension']}`;
    updateQueryParams(navigate, 'graphicParams', params.toString());

    const filters = {
      mode_name: currentMode,
      substance_name: currentSubstance,
      properties: values['properties'].map((prop)=> ({
        name: prop['name'],
        dimension: prop['dimension'],
      })),
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


