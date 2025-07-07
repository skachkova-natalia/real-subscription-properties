import {useEffect, useState} from 'react';
import {useUnit} from 'effector-react';
import {useTranslation} from 'react-i18next';
import {Button, Checkbox, CheckboxProps, Modal} from 'antd';
import {CheckboxOptionType} from 'antd/es/checkbox/Group';
import * as S from './styled';
import i18n from 'i18next';
import {$tableSettingsModal, closeTableSettingsModal} from '@models/modals/tableSettingsModal';
import {$filters, setSelectedProperties} from '@models/filters';

export function TableSettingsModal() {
  const {t} = useTranslation();
  const {isOpen} = useUnit($tableSettingsModal);
  const {propertiesList, selectedProperties} = useUnit($filters);
  const [options, setOptions] = useState<CheckboxOptionType[]>([]);
  const [propertiesValue, setPropertiesValue] = useState<string[]>([]);
  const checkedAll = options.length === propertiesValue.length;
  const indeterminate = propertiesValue.length > 0 && propertiesValue.length < options.length;

  useEffect(() => {
    setOptions(propertiesList.map((prop) => ({
      value: prop.literal,
      label: prop.name[i18n.language],
    })) || []);
  }, [propertiesList, t]);

  useEffect(() => {
    setPropertiesValue(selectedProperties);
  }, [selectedProperties]);

  const onChangeCheckedAll: CheckboxProps['onChange'] = (e) => {
    setPropertiesValue(e.target.checked ? options.map((option) => option.value) : []);
  };

  return (
    <Modal
      title={t('table_settings')}
      open={isOpen}
      onCancel={closeTableSettingsModal}
      footer={[
        <Button
          key='submit'
          type='primary'
          onClick={() => {
            setSelectedProperties(propertiesValue as string[]);
            closeTableSettingsModal();
          }}
        >
          {t('common.apply')}
        </Button>,
        <Button key='back' onClick={closeTableSettingsModal}>
          {t('common.cancel')}
        </Button>,
      ]}
    >
      {!propertiesList.length && (
        <>{t('messages.need_to_select_parameter')}</>
      )}
      {options.length > 0 && (
        <S.PropertiesList>
        <Checkbox indeterminate={indeterminate} onChange={onChangeCheckedAll} checked={checkedAll}>
          {t('common.select_all')}
        </Checkbox>
        <Checkbox.Group
          style={{flexDirection: 'column'}}
          options={options}
          value={propertiesValue}
          onChange={(e) => {
            setPropertiesValue(e);
          }}
        />
      </S.PropertiesList>
      )}
    </Modal>
  );
}
