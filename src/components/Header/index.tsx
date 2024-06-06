import * as S from './styled';
import AtomSvg from '@assets/atom.svg?react';
import {color} from '@src/theme';

export function Header() {
  return (
    <S.Header>
      <AtomSvg width={30} height={30} fill={color.primary.s700}/>
      RSP
    </S.Header>
  );
}
