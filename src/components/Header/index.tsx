import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router';
import LogoSvg from '@assets/logo.svg?react';
import {color} from '@src/theme';
import * as S from './styled';
import {Button, Typography} from 'antd';
import TelegramIconSvg from '@assets/telegramIcon.svg?react';
import {NavLink} from 'react-router-dom';

export function Header() {
  const {t} = useTranslation();
  const navigate = useNavigate();

  return (
    <S.StyledHeader>
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
        <S.ButtonsContainer>
          <Button type='primary'>
            <NavLink to='/login'>{t('sign_in')}</NavLink>
          </Button>
          <Button onClick={()=>{}} >
            <NavLink to='/register'>{t('registration')}</NavLink>
          </Button>
        </S.ButtonsContainer>
      </S.MenuContainer>
    </S.StyledHeader>
  );
}
