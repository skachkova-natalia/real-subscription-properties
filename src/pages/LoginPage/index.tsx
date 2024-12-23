import {Button, Form, Input} from 'antd';
import {login} from '@models/auth';
import * as S from './styled';
import {color} from '@src/theme';

export function LoginPage() {
  return (
    <S.Container>
      <Form
        style={{maxWidth: 600}}
        onFinish={login}
        autoComplete='off'
      >
        <Form.Item
          label='Логин'
          name='username'
          rules={[{required: true, message: 'Обязательное поле'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Пароль'
          name='password'
          rules={[{required: true, message: 'Обязательное поле'}]}
        >
          <Input.Password />
        </Form.Item>
        <S.ButtonContainer>
          <Button htmlType='submit' type='primary' style={{backgroundColor: color.primary.s700}}>
            Вход
          </Button>
          <S.StyledNavLink to='/register'>
            <Button htmlType='submit' style={{width: '100%'}}>
              Регистрация
            </Button>
          </S.StyledNavLink>
        </S.ButtonContainer>
      </Form>
    </S.Container>
  );
}
