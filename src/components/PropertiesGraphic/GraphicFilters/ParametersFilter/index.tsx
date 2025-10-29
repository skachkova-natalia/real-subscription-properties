import * as S from './styled';
import {GroupLabel} from '@components/PropertiesGraphic/GraphicFilters/styled';
import {Button, Form} from 'antd';
import {MathJax} from 'better-react-mathjax';
import {Option} from '@src/types/common';
import {useMemo, useState} from 'react';
import i18n from 'i18next';
import {useTranslation} from 'react-i18next';
import {useUnit} from 'effector-react';
import {$filters} from '@models/filters';
import {$latexUnitsCode} from '@models/dictionary';
import {resetPoints} from '@models/propertiesGraphic';
import MathJaxWrapper from '@components/MathJaxWrapper';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';

interface Props {
  paramOptions: Option[];
  onVariableParameterChange: (e: string) => void;
}

export default function ParametersFilter({paramOptions, onVariableParameterChange}: Props) {
  const {t} = useTranslation();
  const {setFieldValue, getFieldValue} = Form.useFormInstance();
  const {propertiesList} = useUnit($filters);
  const latexUnitsCode = useUnit($latexUnitsCode);
  const [selectedProperties, setSelectedProperties] = useState<Map<number, string[]>>(new Map());

  const propertyOptions: Option[] = useMemo(() => {
    return propertiesList.map((prop) => ({
      label: `${prop.name[`${i18n.language}`]} (${prop.literal})`,
      value: prop.literal,
    })) || [];
  }, [propertiesList]);

  const propertyDimensionOptions = (index: number) => {
    let props = selectedProperties?.get(index) || [];
    if (!props.length) {
      const property = String(getFieldValue(['properties', index, 'name'])) || '';
      props = propertiesList.find((prop) => prop.literal === property)?.dimensions || [];
    }
    return (props).map((dimension) => ({
      value: dimension,
      label: <MathJax>{latexUnitsCode[dimension]}</MathJax>,
    })) || [];
  };

  const handlePropertyChange = (property: string, index: number, fieldName: number) => {
    const dimensions = propertiesList.find((prop) => prop.literal === property)?.dimensions || [];
    setSelectedProperties((prev) => {
      const newMap = new Map(prev);
      newMap.set(index, dimensions);
      return newMap;
    });
    if (dimensions.length > 0) {
      setFieldValue(
        ['properties', fieldName, 'dimension'],
        dimensions[0],
      );
    }
  };

  return (
    <S.FiltersGroup>
      <S.Filter>
        <GroupLabel>{t('property')}</GroupLabel>
        <Form.List name='properties' initialValue={[{}]}>
          {(fields, {add, remove}) => (
            <S.PropertiesList>
              {fields.map((field, index) => (
                <S.PropertyItem key={field.key}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'name']}
                    className='form-item'
                  >
                    <S.StyledSelect
                      options={propertyOptions}
                      placeholder={t('property')}
                      onChange={(e) => handlePropertyChange(e as string, index, field.name)}
                      notFoundContent={t('no_data')}
                    />
                  </Form.Item>
                  <MathJaxWrapper key={`${field.key}`}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'dimension']}
                      className='form-item'
                    >
                      <S.DimensionSelect
                        options={propertyDimensionOptions(index)}
                        placeholder={t('dimension')}
                        notFoundContent={t('no_data')}
                      />
                    </Form.Item>
                  </MathJaxWrapper>
                  {index > 0 && (
                    <Button
                      type='text'
                      size='small'
                      onClick={() => {
                        remove(field.name);
                        setSelectedProperties((prev) => {
                          const newMap = new Map(prev);
                          newMap.delete(index);
                          return newMap;
                        });
                      }}
                      icon={<DeleteOutlined />}
                    >
                    </Button>
                  )}
                </S.PropertyItem>
              ))}
              <Button
                type='link'
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                {t('common.add')}
              </Button>
            </S.PropertiesList>
          )}
        </Form.List>
      </S.Filter>
      <S.Filter>
        <GroupLabel>{t('parameter')}</GroupLabel>
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
        <GroupLabel>{t('points_count')}</GroupLabel>
        <Form.Item name={`count`} className='form-item'>
          <S.StyledInput
            type='number'
            min={1}
            max={10000}
            onChange={() => resetPoints()}
          />
        </Form.Item>
      </S.Filter>
    </S.FiltersGroup>
  );
}
