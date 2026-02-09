import {useUnit} from 'effector-react';
import {useTranslation} from 'react-i18next';
import {Button, Form, Input, Modal, Typography} from 'antd';
import {$mixModal, addMixture, closeAddMixModal} from '@models/modals/addMixModal';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {$filters} from '@models/filters';
import i18n from 'i18next';
import * as S from './styled';
import {SelectComponent} from '@ui-kit/Select';

export function AddMixModal() {
  const {t} = useTranslation();
  const {isOpen, loading, addMixtureError} = useUnit($mixModal);
  const {substancesOptions} = useUnit($filters);
  console.log(addMixtureError);

  return (
    <Modal
      title={t('mixture.title')}
      open={isOpen}
      onCancel={closeAddMixModal}
      footer={[]}
    >
      <Form
        layout='vertical'
        validateTrigger='onBlur'
        autoComplete='off'
        onFinish={(values) => {
          addMixture(values);
        }}
        style={{maxWidth: 600}}
      >
        <S.FormContainer>
          <Form.Item
            name='name'
            rules={[{required: true, message: 'Обязательное поле'}]}
            className='form-item'
          >
            <Input placeholder={t('mixture.name')} />
          </Form.Item>
          <Form.Item
            name='description'
            className='form-item'
          >
            <Input placeholder={t('mixture.description')} />
          </Form.Item>
          <S.Filter>
            <S.GroupLabel>Компоненты</S.GroupLabel>
            <Form.List name='components' initialValue={[{}, {}]}>
              {(fields, {add, remove}) => (
                <S.ComponentsList>
                  {fields.map((field) => (
                    <S.ComponentItem key={field.key}>
                      <Form.Item
                        {...field}
                        key={`name-${field.key}`}
                        name={[field.name, 'name']}
                        rules={[{required: true, message: 'Обязательное поле'}]}
                        className='form-item select'
                      >
                        <SelectComponent
                          options={substancesOptions}
                          placeholder={t('property')}
                          notFoundContent={t('no_data')}
                        />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        key={`concentration-${field.key}`}
                        name={[field.name, 'concentration']}
                        rules={[{required: true, message: 'Обязательное поле'}]}
                        className='form-item'
                      >
                        <Input
                          onKeyPress={(e) => {
                            const value = (e.target as HTMLInputElement).value || '';
                            if (!/[0-9.,e-]/.test(e.key) || ((value.includes('.') || value.includes(',')) && (e.key === '.' || e.key === ',')) || value.includes('e') && e.key === 'e') {
                              e.preventDefault();
                            }
                          }}
                          inputMode='decimal'
                          required
                          allowClear
                          placeholder={t('mixture.concentration')}
                        />
                      </Form.Item>
                      {fields.length > 2 && (
                        <Button
                          type='text'
                          size='small'
                          onClick={() => {
                            remove(field.name);
                          }}
                          icon={<DeleteOutlined />}
                        >
                        </Button>
                      )}
                    </S.ComponentItem>
                  ))}
                  <Button
                    type='link'
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    {t('common.add')}
                  </Button>
                </S.ComponentsList>
              )}
            </Form.List>
          </S.Filter>
        </S.FormContainer>
        {addMixtureError && (
          <Typography.Text type='danger'>{addMixtureError.msg[`${i18n.language}`]}</Typography.Text>)}
        <S.ButtonsContainer>
          <Button
            key='submit'
            htmlType='submit'
            type='primary'
            loading={loading}
          >
            {t('common.add')}
          </Button>
          <Button key='back' onClick={closeAddMixModal}>
            {t('common.cancel')}
          </Button>
        </S.ButtonsContainer>
      </Form>
    </Modal>
  );
}
