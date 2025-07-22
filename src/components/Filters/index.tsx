import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useUnit} from 'effector-react';
import {Select} from 'antd';
import * as S from './styled';
import {$filters, setCurrentMode, setCurrentSubstance} from '@models/filters';

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

  useEffect(() => {
    setSelectedDimensions(modesParams.reduce((acc, param) => {
      if (selectedDimensions[param.id]) {
        return acc;
      }
      return ({...acc, [param.id]: param.units?.[0] || ''});
    }, selectedDimensions));
  }, [currentMode, modesParams]);

  return (
    <S.FiltersContainer>
      <S.Filters>
        <Select
          options={substancesOptions}
          value={currentSubstance}
          onChange={(e) => setCurrentSubstance(e)}
          placeholder={t('substance')}
          loading={loadingSubstances}
          notFoundContent={t('no_data')}
        />
        <Select
          value={currentMode}
          onChange={(e) => setCurrentMode(e)}
          placeholder={t('parameter_mode')}
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
    </S.FiltersContainer>
  );
}
