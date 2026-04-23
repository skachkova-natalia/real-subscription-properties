import {useNavigate} from 'react-router';
import {Alert, Button, Spin, Typography} from 'antd';
import {useTranslation} from 'react-i18next';
import {LoadingOutlined} from '@ant-design/icons';
import {useGate, useUnit} from 'effector-react';
import {$verificationPage, VerificationPageGate} from '@models/verification';
import i18n from 'i18next';
import {useSearchParams} from 'react-router-dom';
import * as S from './styled';

export default function VerificationPage() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  useGate(VerificationPageGate, id);
  const {error, loading, success} = useUnit($verificationPage);

  if (!id) {
    navigate('/');
  }

  return (
    <S.MainContainer>
      <Typography.Title level={4}>{t('verification.title')}</Typography.Title>
      <Spin indicator={<LoadingOutlined spin />} spinning={loading}>
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
              message={t('verification.success_verify')}
              type='success'
              showIcon
            />
            <Button type='primary'>{t('common.main_page')}</Button>
          </>
        )}
      </Spin>
    </S.MainContainer>
  );
}
