import {Parameter} from '@src/types/filters';
import * as S from './styled';
import i18n from 'i18next';
import {Form, Input} from 'antd';
import {MathJax} from 'better-react-mathjax';
import {useTranslation} from 'react-i18next';
import {useMemo} from 'react';
import {useUnit} from 'effector-react';
import {$latexUnitsCode} from '@models/dictionary';
import {resetPoints} from '@models/propertiesGraphic';
import MathJaxWrapper from '@components/MathJaxWrapper';

interface Props {
  param: Parameter;
  isVariable: boolean;
}

export default function ParameterValuesFilter({param, isVariable}: Props) {
  const {t} = useTranslation();
  const latexUnitsCode = useUnit($latexUnitsCode);

  const dimensionOptions = useMemo(() => {
    return param.units.map((unit) => ({
      value: unit,
      label: <MathJax>{latexUnitsCode[unit]}</MathJax>,
    })) || [];
  }, [param]);

  return (
    <S.Parameter>
      <S.Label>{param.name[`${i18n.language}`]}</S.Label>
      {isVariable ? (
        <S.Values>
          <Form.Item name={`variable_parameter.min`} className='form-item'>
            <S.StyledInput
              inputMode='decimal'
              required
              onChange={()=>resetPoints()}
            />
          </Form.Item>
          —
          <Form.Item name={`variable_parameter.max`} className='form-item'>
            <S.StyledInput
              inputMode='decimal'
              required
              onChange={()=>resetPoints()}
            />
          </Form.Item>
          <MathJaxWrapper key={param.id}>
            <Form.Item name={`variable_parameter.param_dimension`} className='form-item'>
              <S.DimensionSelect
                options={dimensionOptions}
                placeholder={t('dimension')}
                notFoundContent={t('no_data')}
                onChange={() => resetPoints()}
              />
            </Form.Item>
          </MathJaxWrapper>
        </S.Values>
      ) : (
        <S.Values>
          <Form.Item name={`fixed_parameter.value`} className='form-item'>
            <Input
              inputMode='decimal'
              required
            />
          </Form.Item>
          <MathJaxWrapper key={param.id}>
            <Form.Item name={`fixed_parameter.param_dimension`} className='form-item'>
              <S.DimensionSelect
                options={dimensionOptions}
                placeholder={t('dimension')}
                notFoundContent={t('no_data')}
                onChange={() => resetPoints()}
              />
            </Form.Item>
          </MathJaxWrapper>
        </S.Values>
      )}
    </S.Parameter>
  );
}
