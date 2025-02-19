import {Button, Form, Input, Typography} from 'antd';
import {$registerError, register} from '@models/auth';
import * as S from './styled';
import {useTranslation} from 'react-i18next';
import {useUnit} from 'effector-react';

export function RegisterPage() {
  const {t, i18n} = useTranslation();
  const error = useUnit($registerError);

  return (
    <S.Container>
      <Form
        style={{minWidth: 350, maxWidth: 350}}
        onFinish={register}
        autoComplete='off'
      >
        <Form.Item
          label='E-mail'
          name='email'
          rules={[
            {
              type: 'email',
              message: 'Некорректный формат почты. Пример: name@company.ru',
            },
            {
              required: true,
              message: 'Обязательное поле',
            },]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('login')}
          name='name'
          rules={[{required: true, message: 'Обязательное поле'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('password')}
          name='password'
          rules={[{required: true, message: 'Обязательное поле'}]}
        >
          <Input.Password />
        </Form.Item>
        {error && <Typography.Text type="danger">{error[`msg_user_${i18n.language}`]}</Typography.Text>}
        <Button htmlType='submit' style={{width: '100%'}}>
          {t('register')}
        </Button>
      </Form>
    </S.Container>
  );
}
