import {Select} from 'antd';
import i18next from 'i18next';
import * as S from './styled';
import {useUnit} from 'effector-react';
import {$filters} from '@models/filters';

export function Filters() {
  const {substances} = useUnit($filters);
  console.log(substances);
  return (
    <S.FiltersContainer>
      <Select
        style={{width: 120}}
        options={[]}
        placeholder={i18next.t('substance')}
      />
      <Select
        style={{width: 120}}
        options={[]}
        placeholder={i18next.t('parameterMode')}
      />
    </S.FiltersContainer>
  );
}
