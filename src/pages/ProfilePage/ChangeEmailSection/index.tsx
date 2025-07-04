import {Button, Form, Input} from 'antd';
import {color} from '@src/theme';
import {useTranslation} from 'react-i18next';
import {$sendingChangeEmail, sendChangeEmail} from '@models/user';
import * as S from './styled';
import {useUnit} from 'effector-react';

export default function ChangeEmailSection() {
  const {t} = useTranslation();
  const loading = useUnit($sendingChangeEmail)

  return (
    <Form
      layout='horizontal'
      style={{maxWidth: 600}}
      onFinish={sendChangeEmail}
      autoComplete='off'
    >
      <S.FormContainer>
        <Form.Item
          label='Новый E-mail'
          name='new_email'
          rules={[
            {required: true, message: 'Обязательное поле'},
            {
              type: 'email',
              message: 'Некорректный формат почты. Пример: name@company.ru',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Button htmlType='submit' type='primary' loading={loading} style={{backgroundColor: color.primary.s700}}>
          {t('user.change_email')}
        </Button>
      </S.FormContainer>
    </Form>
  );
}
