import {useUnit} from 'effector-react/effector-react.umd';
import {$user} from '@models/auth';
import * as S from './styled';
import {useTranslation} from 'react-i18next';
import {logout} from '@core/api';
import {UserOutlined} from '@ant-design/icons';


export function UserInfo() {
  const user = useUnit($user);
  const {t} = useTranslation();

  return (
    <S.User>
      {!user && <S.StyledNavLink to='/login'>{t('sign_in')}</S.StyledNavLink>}
      {!!user && <S.UserInfo><UserOutlined />{user.name}</S.UserInfo>}
      {!!user && <S.StyledNavLink to='/' onClick={()=> logout()}>{t('sign_out')}</S.StyledNavLink>}
    </S.User>
  );
}
