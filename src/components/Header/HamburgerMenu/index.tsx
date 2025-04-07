import {Button, Drawer, Typography} from 'antd';
import {NavLink} from 'react-router-dom';
import {MenuOutlined} from '@ant-design/icons';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {color} from '@src/theme';
import TelegramIconSvg from '@assets/telegramIcon.svg?react';
import * as S from './styled';

export function HamburgerMenu() {
  const {t} = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <S.HamburgerMenu type='text' icon={<MenuOutlined />} onClick={() => setIsMenuOpen(true)} />
      {isMenuOpen && (
        <Drawer onClose={() => setIsMenuOpen(false)} open={isMenuOpen} placement='left' width={250}>
          <S.MenuContainer>
          <S.ButtonsContainer>
            <Button type='primary'>
              <NavLink to='/login'>{t('sign_in')}</NavLink>
            </Button>
            <Button onClick={() => {
            }}>
              <NavLink to='/register'>{t('registration')}</NavLink>
            </Button>
          </S.ButtonsContainer>
            <S.ContactInfo>
              <Button icon={<TelegramIconSvg width={14} height={14} fill={color.base.s600} />}>Напишите нам в
                Telegram</Button>
              <Typography.Link href='mailto:support@rsp.ru'>email: support@rsp.ru</Typography.Link>
            </S.ContactInfo>
          </S.MenuContainer>
        </Drawer>
      )}
    </>
  );
}
