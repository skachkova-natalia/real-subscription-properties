import {Button, Form, Input} from 'antd';
import {register} from '@models/auth';
import * as S from './styled';
import {useTranslation} from 'react-i18next';

export function RegisterPage() {
  const {t} = useTranslation();

  return (
    <S.Container>
      <Form
        style={{maxWidth: 600}}
        onFinish={register}
        autoComplete='off'
      >
        <Form.Item
          label='E-mail'
          name='email'
          rules={[{required: true, message: 'Обязательное поле', type: 'email'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('login')}
          name='username'
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
