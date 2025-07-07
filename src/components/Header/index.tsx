import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router';
import LogoSvg from '@assets/logo.svg?react';
import {color} from '@src/theme';
import * as S from './styled';
import {Button, Typography} from 'antd';
import TelegramIconSvg from '@assets/telegramIcon.svg?react';
import {NavLink} from 'react-router-dom';
import {HamburgerMenu} from '@components/Header/HamburgerMenu';
import {useUnit} from 'effector-react';
import {$user} from '@models/auth';
import {UserInfo} from '@components/UserInfo';

export function Header() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const user = useUnit($user);

  return (
    <S.StyledHeader>
      <HamburgerMenu />
      <S.ContactInfo>
        <Button icon={<TelegramIconSvg width={14} height={14} fill={color.base.s600} />}>Напишите нам в
          Telegram</Button>
        <Typography.Link href='mailto:support@rsp.ru'>email: support@rsp.ru</Typography.Link>
      </S.ContactInfo>
      <S.MenuContainer>
        <S.StyledTitle onClick={() => navigate('/')}>
          <LogoSvg width={40} height={40} />
          RSP
        </S.StyledTitle>
        {!user && (
          <S.ButtonsContainer>
            <Button type='primary' style={{backgroundColor: color.primary.s700}}>
              <NavLink to='/login'>{t('sign_in')}</NavLink>
            </Button>
            <Button onClick={() => {
            }}>
              <NavLink to='/register'>{t('registration')}</NavLink>
            </Button>
          </S.ButtonsContainer>
        )}
        {!!user && (
          <UserInfo />
        )}
      </S.MenuContainer>
    </S.StyledHeader>
  );
}
