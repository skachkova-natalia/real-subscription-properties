import {Button, Form, Input} from 'antd';
import {register} from '@models/auth';
import * as S from './styled';
import {useTranslation} from 'react-i18next';

export function RegisterPage() {
  const {t} = useTranslation();

  return (
    <S.Container>
      <Form
        style={{minWidth: 360, maxWidth: 600}}
        onFinish={register}
        autoComplete='off'
      >
        <Form.Item
          label='E-mail'
          name='email'
          rules={[
            {
              type: 'email',
              message: 'Введите email. Например, name@company.ru',
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
        <Button htmlType='submit' style={{width: '100%'}}>
          {t('register')}
        </Button>
      </Form>
    </S.Container>
  );
}
