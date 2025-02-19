import {useTranslation} from 'react-i18next';
import {Alert, Button, Form, Input, Typography} from 'antd';
import {$loginPage, $user, login} from '@models/auth';
import {color} from '@src/theme';
import * as S from './styled';
import {useUnit} from 'effector-react';
import {useNavigate} from 'react-router';

export function LoginPage() {
  const {t, i18n} = useTranslation();
  const user = useUnit($user);
  const navigate = useNavigate();
  const {isRegistered, error} = useUnit($loginPage);

  if (user) {
    navigate('/');
  }

  return (
    <S.Container>
      {isRegistered && (
        <Alert
          message='Пользователь зарегистрирован. Для продолжения работы необходимо войти в систему'
          type='success'
          showIcon
        />
      )}
      <Form
        style={{maxWidth: 600}}
        onFinish={login}
        autoComplete='off'
      >
        <Form.Item
          label='E-mail'
          name='email'
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
