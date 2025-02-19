import {useUnit} from 'effector-react/effector-react.umd';
import {$user} from '@models/auth';
import {Alert, Typography} from 'antd';
import {sendVerifyEmail} from '@models/user';
import * as S from './styled';

export function ProfilePage() {
  const user = useUnit($user);

  return (
    <S.MainContainer>
      {!user?.is_verified && (
        <Alert
          message={<>Аккаунт пользователя не подтверждён. Необходимо <Typography.Link
            onClick={() => sendVerifyEmail()}>верифицировать</Typography.Link> аккаунт</>}
          type='warning'
          showIcon
        />
      )}
      <Typography.Text>Имя пользователя: {user?.name}</Typography.Text>
      <Typography.Text>Почта пользователя: {user?.email}</Typography.Text>
    </S.MainContainer>
  );
}
