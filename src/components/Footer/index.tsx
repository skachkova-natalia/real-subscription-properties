import TelegramIconSvg from '@assets/telegramIcon.svg?react';
import {color} from '@src/theme';
import {Typography} from 'antd';
import * as S from './styled';

export function Footer() {
  return (
    <S.Container>
      <S.A href='https://t.me/konovalov_ia'>
        <TelegramIconSvg width={20} height={20} fill={color.base.s600} />
      </S.A>
      <Typography.Text>
        Остались вопросы?{' '}
        <S.A href='mailto:support@rsp.ru'>
          Напишите
        </S.A> нам
      </Typography.Text>
    </S.Container>
  );
}
