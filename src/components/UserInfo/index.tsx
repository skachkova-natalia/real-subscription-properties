import {useUnit} from 'effector-react/effector-react.umd';
import {$user} from '@models/auth';
import * as S from './styled';

export function UserInfo() {
  const user = useUnit($user);

  return (
    <S.User>
      {!user && <S.StyledNavLink to='/login'>Вход</S.StyledNavLink>}
      {!!user && <>{user.username}</>}
      {!!user && <S.StyledNavLink to='/'>Выход</S.StyledNavLink>}
    </S.User>
  );
}
