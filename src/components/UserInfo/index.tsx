import {useUnit} from 'effector-react/effector-react.umd';
import {$user} from '@models/auth';
import * as S from './styled';
import {useTranslation} from 'react-i18next';

export function UserInfo() {
  const user = useUnit($user);
  const {t} = useTranslation();

  return (
    <S.User>
      {!user && <S.StyledNavLink to='/login'>{t('sign_in')}</S.StyledNavLink>}
      {!!user && <>{user.username}</>}
      {!!user && <S.StyledNavLink to='/'>{t('sign_out')}</S.StyledNavLink>}
    </S.User>
  );
}
