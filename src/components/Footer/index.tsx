import {color} from '@src/theme';
import {Typography} from 'antd';
import * as S from './styled';
import {useTranslation} from 'react-i18next';
import LanguageSvg from '@assets/language.svg?react';
import {changeAppLanguage} from '@models/app';

enum LANGUAGE {
  RU = 'ru',
  EN = 'en'
}

export function Footer() {
  const {i18n} = useTranslation();

  const changeLanguage = () => {
    const language = i18n.language === LANGUAGE.EN ? LANGUAGE.RU : LANGUAGE.EN;
    i18n.changeLanguage(language);
    changeAppLanguage();
  };

  return (
    <S.Container>
      <Typography.Text>
        Остались вопросы?{' '}
        <S.A href='mailto:support@rsp.ru'>
          Напишите
        </S.A> нам
      </Typography.Text>
      <S.Language onClick={changeLanguage}>
        <Typography.Text>
          {i18n.language}
        </Typography.Text>
        <LanguageSvg width={20} height={20} fill={color.primary.s700} />
      </S.Language>
    </S.Container>
  );
}
