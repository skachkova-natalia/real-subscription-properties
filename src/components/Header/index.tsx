import {useTranslation} from 'react-i18next';
import AtomSvg from '@assets/atom.svg?react';
import LanguageSvg from '@assets/language.svg?react';
import {color} from '@src/theme';
import * as S from './styled';

enum LANGUAGE {
  RU = 'ru',
  EN = 'en'
}

export function Header() {
  const {i18n} = useTranslation();

  const changeLanguage = () => {
    const language = i18n.language === LANGUAGE.EN ? LANGUAGE.RU : LANGUAGE.EN;
    i18n.changeLanguage(language);
  };

  return (
    <S.Container>
      <S.Title>
        <AtomSvg width={30} height={30} fill={color.primary.s700} />
        RSP
      </S.Title>
      <S.ButtonsContainer>
        <S.Icon onClick={changeLanguage}>
          {i18n.language}
          <LanguageSvg width={20} height={20} fill={color.primary.s700} />
        </S.Icon>
      </S.ButtonsContainer>
    </S.Container>
  );
}
