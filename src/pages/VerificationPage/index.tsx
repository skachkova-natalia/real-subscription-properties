import {useLocation} from 'react-router';
import * as S from './styled';
import {Alert, Button, Spin, Typography} from 'antd';
import {useTranslation} from 'react-i18next';
import {LoadingOutlined} from '@ant-design/icons';
import {useGate, useUnit} from 'effector-react';
import {$verificationPage, VerificationPageGate} from '@models/verification';
import i18n from 'i18next';

export default function VerificationPage() {
  const {t} = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  useGate(VerificationPageGate, id);
  const {error, loading, success} = useUnit($verificationPage);

  if (!id) {
    return null;
  }

  return (
    <S.MainContainer>
      <Typography.Title level={4}>{t('verification.title')}</Typography.Title>
      {loading && (
        <Spin indicator={<LoadingOutlined spin />} />
      )}
      {error && <Typography>{error[`msg_user_${i18n.language}`]}</Typography>}
      {success && (
        <>
          <Alert
            message={<>Аккаунт пользователя подтверждён.</>}
            type='success'
            showIcon
          />
          <Button type='primary'>{t('common.main_page')}</Button>
        </>
      )}
    </S.MainContainer>
  );
}
