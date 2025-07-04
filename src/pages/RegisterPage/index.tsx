import {Button, Form, Input, Typography} from 'antd';
import * as S from './styled';
import {useTranslation} from 'react-i18next';
import {useGate, useUnit} from 'effector-react';
import {$registrationPage, register, RegisterPageGate} from '@models/registration';
import {useNavigate} from 'react-router';
import {$isRegistered} from '@models/auth';

export function RegisterPage() {
  const {t, i18n} = useTranslation();
  useGate(RegisterPageGate);
  const {error} = useUnit($registrationPage);
  const isRegistered = useUnit($isRegistered);
  const navigate = useNavigate();

  if (isRegistered) {
    navigate('/login');
  }

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
              required: true,
              message: 'Обязательное поле',
            },
            {
              type: 'email',
              message: 'Некорректный формат почты. Пример: name@company.ru',
            }]}
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
        {error && <Typography.Text type='danger'>{error[`msg_user_${i18n.language}`]}</Typography.Text>}
        <Button htmlType='submit' style={{width: '100%'}}>
          {t('register')}
        </Button>
      </Form>
    </S.Container>
  );
}
