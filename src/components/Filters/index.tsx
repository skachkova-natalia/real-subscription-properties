import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useUnit} from 'effector-react';
import {Button, Select} from 'antd';
import * as S from './styled';
import {$filters, setCurrentMode, setCurrentSubstance, setIsMixture} from '@models/filters';
import {useLocation, useNavigate} from 'react-router';
import {PlusOutlined} from '@ant-design/icons';
import {openAddMixModal} from '@models/modals/addMixModal';
import {SelectComponent} from '@ui-kit/Select';

export function Filters() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
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
  const [isSubstancesSelectOpen, setIsSubstancesSelectOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!substancesOptions.length) {
      return;
    }
    const searchParams = new URLSearchParams(location.search);
    const substance = searchParams.get('currentSubstance') || '';
    if (substance) {
      const isMixture = substancesOptions.find((option) => option.value === substance)?.['isMixture'] || false;
      setIsMixture(isMixture)
      setCurrentSubstance(substance);
    }
    const mode = searchParams.get('currentMode') || '';
    if (mode) {
      setCurrentMode(mode);
    }
  }, [loadingSubstances]);

  useEffect(() => {
    setSelectedDimensions(modesParams.reduce((acc, param) => {
      if (selectedDimensions[param.id]) {
        return acc;
      }
      return ({...acc, [param.id]: param.units?.[0] || ''});
    }, selectedDimensions));
  }, [currentMode, modesParams]);

  const currentSubstanceOnChange = (e, option) => {
    if (option['isMixture']) {
      setIsMixture(true);
    } else {
      setIsMixture(false);
    }
    setCurrentSubstance(e);
    const queryString = `currentSubstance=${e}`;
    navigate({search: queryString}, {replace: true});
    setIsSubstancesSelectOpen(false);
  };

  const currentModeOnChange = (e) => {
    setCurrentMode(e);
    const queryString = `currentSubstance=${currentSubstance}&currentMode=${e}`;
    navigate({search: queryString}, {replace: true});
  };

  const AddSubstanceButton = (
    <Button
      type='link'
      icon={<PlusOutlined />}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openAddMixModal();
        setIsSubstancesSelectOpen(false);
      }}
    >
      {t('common.add')}
    </Button>
  );

  return (
    <S.FiltersContainer>
      <S.Filters>
        <Select
          options={[
            ...substancesOptions,
            {
              label: AddSubstanceButton,
              value: 'add',
              disabled: true,
            },
          ]}
          value={currentSubstance}
          placeholder={t('substance')}
          notFoundContent={t('no_data')}
          loading={loadingSubstances}
          open={isSubstancesSelectOpen}
          onOpenChange={setIsSubstancesSelectOpen}
          onChange={currentSubstanceOnChange}
        />
        <SelectComponent
          options={modesOptions}
          value={currentMode}
          onChange={currentModeOnChange}
          placeholder={t('parameter_mode')}
          listItemHeight={45}
          listHeight={250}
          loading={loadingModesParams}
          notFoundContent={t('no_data')}
        />
      </S.Filters>
    </S.FiltersContainer>
  );
}
