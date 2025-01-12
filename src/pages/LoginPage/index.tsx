import {useTranslation} from 'react-i18next';
import {Button, Form, Input} from 'antd';
import {login} from '@models/auth';
import {color} from '@src/theme';
import * as S from './styled';

export function LoginPage() {
  const {t} = useTranslation();

  return (
    <S.Container>
      <Form
        style={{maxWidth: 600}}
        onFinish={login}
        autoComplete='off'
      >
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
        <S.ButtonContainer>
          <Button htmlType='submit' type='primary' style={{backgroundColor: color.primary.s700}}>
            {t('sign_in')}
          </Button>
          <S.StyledNavLink to='/register'>
            <Button htmlType='submit' style={{width: '100%'}}>
              {t('registration')}
            </Button>
          </S.StyledNavLink>
        </S.ButtonContainer>
      </Form>
    </S.Container>
  );
}
