import {useEffect, useState} from 'react';
import {useUnit} from 'effector-react';
import {Button, Form, Input, Select} from 'antd';
import i18next from 'i18next';
import {$filters, applyFilters, setCurrentMode, setCurrentSubstance} from '@models/filters';
import {ArrowRightOutlined} from '@ant-design/icons';
import * as S from './styled';

export function Filters() {
  const {substancesOptions, currentSubstance, modesParams, modesOptions, currentMode} = useUnit($filters);
  const [params, setParams] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState<string[][]>([]);
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>([]);

  useEffect(() => {
    if (!currentMode) {
      setParams([]);
      setDimensions([]);
      setSelectedDimensions([]);
      return;
    }
    setParams(modesParams.find((mode) => mode.value === currentMode)?.filter_params || []);
    setDimensions(modesParams.find((mode) => mode.value === currentMode)?.available_param_dimension || []);
    setSelectedDimensions(modesParams.find((mode) => mode.value === currentMode)?.param_dimensions || []);
  }, [currentMode, modesParams]);
  console.log(dimensions);

  return (
    <S.FiltersContainer>
      <S.Filters>
        <S.SelectContainer>
          <S.Label>{i18next.t('substance')}</S.Label>
          <Select
            options={substancesOptions}
            value={currentSubstance}
            onChange={(e) => setCurrentSubstance(e)}
            placeholder={i18next.t('substance')}
            style={{width: 120}}
          />
        </S.SelectContainer>
        <S.SelectContainer>
          <S.Label>{i18next.t('parameter_mode')}</S.Label>
          <Select
            options={modesOptions}
            value={currentMode}
            onChange={(e) => setCurrentMode(e)}
            placeholder={i18next.t('parameter_mode')}
            style={{width: 120}}
          />
        </S.SelectContainer>
      </S.Filters>
      <S.StyledForm
        layout='inline'
        onFinish={(values) => {
          applyFilters({
            param_values: Object.values(values as object),
            param_dimensions: selectedDimensions,
          });
        }}
      >
        {params.map((param, paramIndex) => (
          <S.Parameters key={param}>
            <S.Label>{i18next.t(param.toLowerCase().replaceAll(' ', '_'))}</S.Label>
            <Form.Item name={param}>
              <Input style={{maxWidth: '100px'}} />
            </Form.Item>
            <Select
              options={dimensions[paramIndex].map((dimension) => ({value: dimension, label: dimension}))}
              value={selectedDimensions[paramIndex]}
              onChange={(newValue) => {
                const selected = selectedDimensions.map((e, eIndex) => eIndex === paramIndex ? newValue : e);
                setSelectedDimensions(selected);
              }}
            />
          </S.Parameters>
        ))}
        {params.length > 0 && <Form.Item>
          <Button htmlType='submit' icon={<ArrowRightOutlined />} />
        </Form.Item>}
      </S.StyledForm>
    </S.FiltersContainer>
  );
}
