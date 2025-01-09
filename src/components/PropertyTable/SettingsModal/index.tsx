import {useUnit} from 'effector-react';
import {useTranslation} from 'react-i18next';
import {Button, Checkbox, Modal} from 'antd';
import {$filters} from '@models/propertyTable/filters';
import {$tableSettingsModal, closeTableSettingsModal} from '@models/propertyTable/settings';
import * as S from './styled';
import {useEffect, useState} from 'react';
import {CheckboxOptionType} from 'antd/es/checkbox/Group';

export function SettingsModal() {
  const {t} = useTranslation();
  const {isOpen} = useUnit($tableSettingsModal);
  const {propertiesList} = useUnit($filters);
  const [options, setOptions] = useState<CheckboxOptionType[]>();

  useEffect(() => {
    setOptions(Object.keys(propertiesList)?.map((prop) => ({
      value: prop,
      label: t(propertiesList[prop]?.toLowerCase().replaceAll(' ', '_').replaceAll('-', '_')),
    })) || []);
  }, [propertiesList]);

  return (
    <Modal
      title='Настройка строк таблицы'
      open={isOpen}
      onCancel={closeTableSettingsModal}
      footer={[
        <Button key='submit' type='primary' onClick={() => {
          console.log(options);
        }}>
          Применить
        </Button>,
        <Button key='back' onClick={closeTableSettingsModal}>
          Отмена
        </Button>,
      ]}
    >
      {!Object.keys(propertiesList).length && <>Для отображения свойств необходимо выбрать параметр</>}
      <S.PropertiesList>
        <Checkbox.Group
          style={{ flexDirection: 'column' }}
          options={options}
          onChange={(e)=>{
            console.log(e);}}
        />
      </S.PropertiesList>
    </Modal>
  );
}
