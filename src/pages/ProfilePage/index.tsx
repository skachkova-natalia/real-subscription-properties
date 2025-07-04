import {useUnit} from 'effector-react/effector-react.umd';
import {$user} from '@models/auth';
import {Alert, Button, Typography} from 'antd';
import {$sendingResetPassword, sendResetPassword, sendVerifyEmail} from '@models/user';
import * as S from './styled';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import ChangeEmailSection from '@pages/ProfilePage/ChangeEmailSection';
import {useNavigate} from 'react-router';

export function ProfilePage() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const user = useUnit($user);
  const sendingResetPassword = useUnit($sendingResetPassword);
  const [showNewEmail, setShowNewEmail] = useState<boolean>(false);

  if (!user) {
    navigate('/');
  }

  return (
    <S.MainContainer>
      {!!user && !user?.is_verified && (
        <Alert
          message={<>{t('verification.not_verified')} {t('common.need')} <Typography.Link
            onClick={() => sendVerifyEmail()}>{t('verification.verify')}</Typography.Link> {t('user.account')}</>}
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
  );
}
