import TelegramIconSvg from '@assets/telegramIcon.svg?react';
import {color} from '@src/theme';
import * as S from './styled';

export function Footer() {
  return (
    <S.Container>
      <S.A href='https://t.me/konovalov_ia'>
        <TelegramIconSvg width={20} height={20} fill={color.base.s600} />
      </S.A>
      <S.A href='mailto:iliakonowaloff@yandex.ru'>
        iliakonowaloff@yandex.ru
      </S.A>
    </S.Container>
  );
}
