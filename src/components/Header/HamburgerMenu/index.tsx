import {Button, Drawer, Menu, MenuProps, Typography} from 'antd';
import {NavLink} from 'react-router-dom';
import {LogoutOutlined, MenuOutlined, TableOutlined, UserOutlined} from '@ant-design/icons';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {color} from '@src/theme';
import TelegramIconSvg from '@assets/telegramIcon.svg?react';
import * as S from './styled';
import {useUnit} from 'effector-react/effector-react.umd';
import {$user} from '@models/auth';
import {logout} from '@core/api';

export function HamburgerMenu() {
  const {t} = useTranslation();
  const user = useUnit($user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    {
      key: 'main',
      label: <NavLink to='/'>{t('table')}</NavLink>,
      icon: <TableOutlined  />,
    },
    {
      type: 'divider',
    },
    ...(user ? [{
      key: 'profile',
      label: <NavLink to='/profile'>{t('user.personal_account')}</NavLink>,
      icon: <UserOutlined />,
    },
      {
        key: 'logout',
        label: <NavLink to='/' onClick={() => logout()}>{t('sign_out')}</NavLink>,
        icon: <LogoutOutlined />,
      }] : []),
  ];

  return (
    <>
      <S.HamburgerMenu type='text' icon={<MenuOutlined />} onClick={() => setIsMenuOpen(true)} />
      {isMenuOpen && (
        <Drawer onClose={() => setIsMenuOpen(false)} open={isMenuOpen} placement='left' width={250}>
          <S.MenuContainer>
            <S.TopBlock>
            {!user && (
              <S.ButtonsContainer>
                <Button type='primary'>
                  <NavLink to='/login'>{t('sign_in')}</NavLink>
                </Button>
                <Button>
                  <NavLink to='/register'>{t('registration')}</NavLink>
                </Button>
              </S.ButtonsContainer>
            )}
            <Menu
              mode='inline'
              items={items}
              onClick={() => setIsMenuOpen(false)}
            />
            </S.TopBlock>
            <S.Footer>
            {!!user && (
              <S.UserInfo>
                <UserOutlined />
                {user.name}
              </S.UserInfo>
            )}
            <S.ContactInfo>
              <Button icon={<TelegramIconSvg width={14} height={14} fill={color.base.s600} />}>Напишите нам в
                Telegram</Button>
              <Typography.Link href='mailto:support@rsp.ru'>email: support@rsp.ru</Typography.Link>
            </S.ContactInfo>
            </S.Footer>
          </S.MenuContainer>
        </Drawer>
      )}
    </>
  );
}
