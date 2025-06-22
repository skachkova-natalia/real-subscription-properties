import {useUnit} from 'effector-react/effector-react.umd';
import {$user} from '@models/auth';
import * as S from './styled';
import {useTranslation} from 'react-i18next';
import {logout} from '@core/api';
import {UserOutlined} from '@ant-design/icons';
import {Dropdown, MenuProps} from 'antd';
import {NavLink} from 'react-router-dom';

export function UserInfo() {
  const {t} = useTranslation();
  const user = useUnit($user);

  const userActions: MenuProps['items'] = [
    {
      label: (
        <NavLink to='/profile'>
          {t('user.personal_account')}
        </NavLink>
      ),
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <NavLink to='/' onClick={() => logout()}>{t('sign_out')}</NavLink>
      ),
      key: '2',
    },
  ];

  return (
    <S.User>
      {!user && <S.StyledNavLink to='/login'>{t('sign_in')}</S.StyledNavLink>}
      {!!user && (
        <Dropdown menu={{items: userActions}} arrow={false}>
          <S.UserInfo>
            <UserOutlined />
            {user.name}
          </S.UserInfo>
        </Dropdown>
      )}
    </S.User>
  );
}
