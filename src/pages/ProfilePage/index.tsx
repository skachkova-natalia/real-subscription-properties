import {useUnit} from 'effector-react/effector-react.umd';
import {$profilePage, $user} from '@models/auth';
import {Alert, Button, Spin, Typography} from 'antd';
import {$sendingResetPassword, sendResetPassword, sendVerifyEmail} from '@models/user';
import * as S from './styled';
import {useTranslation} from 'react-i18next';
import {LoadingOutlined} from '@ant-design/icons';
import {useState} from 'react';
import ChangeEmailSection from '@pages/ProfilePage/ChangeEmailSection';
import {useNavigate} from 'react-router';

export function ProfilePage() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {loading} = useUnit($profilePage);
  const user = useUnit($user);
  const sendingResetPassword = useUnit($sendingResetPassword);
  const [showNewEmail, setShowNewEmail] = useState<boolean>(false);

  if (!user && !loading) {
    navigate('/');
  }

  return (
    <Spin indicator={<LoadingOutlined spin />} spinning={loading}>
      <S.MainContainer>
        {!!user && !user?.is_verified && (
          <Alert
            message={<>{t('user.not_verified')} {t('common.need')} <Typography.Link
              onClick={() => sendVerifyEmail()}>{t('user.verify')}</Typography.Link> {t('user.account')}</>}
            type='warning'
            showIcon
          />
        )}
        <Typography.Text>{t('user.name')}: {user?.name}</Typography.Text>
        <S.Email>
          <Typography.Text>{t('user.email')}: {user?.email}</Typography.Text>
          {!showNewEmail && (
            <Button type='link' onClick={() => setShowNewEmail(true)}>
              {t('user.change_email')}
            </Button>
          )}
        </S.Email>
        {showNewEmail && (<ChangeEmailSection />)}
        <Button loading={sendingResetPassword} onClick={() => sendResetPassword()}>
          {t('user.reset_password')}
        </Button>
      </S.MainContainer>
    </Spin>
  );
}
