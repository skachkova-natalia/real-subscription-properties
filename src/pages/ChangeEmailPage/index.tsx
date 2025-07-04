import {useLocation, useNavigate} from 'react-router';
import * as S from './styled';
import {Alert, Button, Form, Input, Spin, Typography} from 'antd';
import {useTranslation} from 'react-i18next';
import {LoadingOutlined} from '@ant-design/icons';
import {useGate, useUnit} from 'effector-react';
import i18n from 'i18next';
import {$changeEmailPage, changeEmail, ChangeEmailPageGate} from '@models/changeEmail';
import {color} from '@src/theme';

export default function ChangeEmailPage() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  useGate(ChangeEmailPageGate);
  const {error, loading, success} = useUnit($changeEmailPage);

  if (!id) {
    navigate('/');
  }

  return (
    <>
      <Typography.Title level={4}>{t('email_change.title')}</Typography.Title>
      <Spin indicator={<LoadingOutlined spin />} spinning={loading}>
        <S.MainContainer>
          {!error && !success && (
            <>
              <Alert
                message={t('email_change.message')}
                type='info'
                showIcon
              />
              <Form
                style={{maxWidth: 600}}
                onFinish={(values) => changeEmail({...values, token_change: id})}
                autoComplete='off'
              >
                <Form.Item
                  label={t('password')}
                  name='password'
                  rules={[{required: true, message: 'Обязательное поле'}]}
                >
                  <Input.Password />
                </Form.Item>
                <Button
                  htmlType='submit'
                  type='primary'
                  loading={loading}
                  style={{backgroundColor: color.primary.s700}}
                >
                  {t('common.confirm')}
                </Button>
              </Form>
            </>
          )}
          {error && (
            <Alert
              message={error[`msg_user_${i18n.language}`]}
              type='error'
              showIcon
            />
          )}
          {success && (
            <>
              <Alert
                message={t('email_change.success_email_change')}
                type='success'
                showIcon
              />
              <S.ButtonContainer>
                <Button type='primary'>{t('common.main_page')}</Button>
                <S.StyledNavLink to='/login'>
                  <Button style={{width: '100%'}}>
                    {t('sign_in')}
                  </Button>
                </S.StyledNavLink>
              </S.ButtonContainer>
            </>
          )}
        </S.MainContainer>
      </Spin>
    </>
  );
}
