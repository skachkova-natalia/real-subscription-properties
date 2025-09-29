import {useTranslation} from 'react-i18next';
import {Alert, Button, Form, Input, Typography} from 'antd';
import {$loginPage, $user, login} from '@models/auth';
import {color} from '@src/theme';
import * as S from './styled';
import {useUnit} from 'effector-react';
import {useNavigate} from 'react-router';
import {useForm} from 'antd/es/form/Form';
import {forgetPassword} from '@models/user';

export function LoginPage() {
  const {t, i18n} = useTranslation();
  const [form] = useForm();
  const navigate = useNavigate();
  const user = useUnit($user);
  const {isRegistered, error} = useUnit($loginPage);

  if (user) {
    navigate('/');
  }

  const handleForgetPassword = () => {
    const email = form.getFieldValue('email');
    if (!email) {
      form.validateFields(['email']);
      return;
    }
    forgetPassword(email);
  };

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
        form={form}
        autoComplete='off'
        validateTrigger='onBlur'
        onFinish={login}
        style={{maxWidth: 600}}
      >
        <Form.Item
          label='E-mail'
          name='email'
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
        <Form.Item
          label={t('password')}
          name='password'
          rules={[{required: true, message: 'Обязательное поле'}]}
        >
          <Input.Password />
          <Button type='link' onClick={handleForgetPassword}>
            {t('user.forget_password')}
          </Button>
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
