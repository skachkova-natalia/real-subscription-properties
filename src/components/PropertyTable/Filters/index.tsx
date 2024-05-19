import {Button, Form, Input, Select} from 'antd';
import i18next from 'i18next';
import {useUnit} from 'effector-react';
import {$filters, setCurrentMode, setCurrentSubstance} from '@models/filters';
import {ArrowRightOutlined} from '@ant-design/icons';
import * as S from './styled';
import {useEffect, useState} from 'react';

export function Filters() {
  const {substancesOptions, currentSubstance, modesParams, modesOptions, currentMode} = useUnit($filters);
  const [params, setParams] = useState<string[]>([]);

  useEffect(() => {
    if (!currentMode) {
      setParams([]);
      return;
    }
    setParams(modesParams.find((mode) => mode.value === currentMode)?.label || []);
  }, [currentMode, modesParams]);

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
          console.log(values);
        }}
      >
        {params.map((param) => (
          <Form.Item
            key={param}
            name={param}
            label={i18next.t(param.toLowerCase().replaceAll(' ', '_'))}
          >
            <Input defaultValue='0'/>
          </Form.Item>
        ))}
        {params.length> 0 && <Form.Item>
          <Button htmlType='submit' icon={<ArrowRightOutlined />} />
        </Form.Item>}
      </S.StyledForm>
    </S.FiltersContainer>
  );
}
