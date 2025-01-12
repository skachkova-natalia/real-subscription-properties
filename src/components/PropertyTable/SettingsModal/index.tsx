import {useEffect, useState} from 'react';
import {useUnit} from 'effector-react';
import {useTranslation} from 'react-i18next';
import {Button, Checkbox, CheckboxProps, Modal} from 'antd';
import {$filters, setSelectedProperties} from '@models/propertyTable/filters';
import {$tableSettingsModal, closeTableSettingsModal} from '@models/propertyTable/settings';
import {CheckboxOptionType, CheckboxValueType} from 'antd/es/checkbox/Group';
import * as S from './styled';

export function SettingsModal() {
  const {t} = useTranslation();
  const {isOpen} = useUnit($tableSettingsModal);
  const {propertiesList, selectedProperties} = useUnit($filters);
  const [options, setOptions] = useState<CheckboxOptionType[]>([]);
  const [propertiesValue, setPropertiesValue] = useState<CheckboxValueType[]>([]);
  const checkedAll = options.length === propertiesValue.length;
  const indeterminate = propertiesValue.length > 0 && propertiesValue.length < options.length;

  useEffect(() => {
    setOptions(Object.keys(propertiesList)?.map((prop) => ({
      value: prop,
      label: t(`properties.${propertiesList[prop]?.toLowerCase().replaceAll(' ', '_').replaceAll('-', '_')}`),
    })) || []);
  }, [propertiesList]);

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
      {!Object.keys(propertiesList).length && (
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
