import {Tooltip} from 'antd';
import * as S from './styled';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

interface Props {
  value: string;
}

export function ValueCell({value}: Props) {
  const {t} = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(setSeconds, 100, seconds - 1);
    } else {
      setOpen(false);
    }
  }, [seconds]);

  const getValue = () => {
    if (value === 'NaN') {
      return 'NaN';
    }
    if (value === 'Infinity') {
      return '∞';
    }
    return Number.parseFloat(value).toExponential(3);
  };

  return (
    <Tooltip
      title={t('common.copied')}
      placement='right'
      open={open}
    >
      <S.Value onClick={() => {
        navigator.clipboard.writeText(value);
        setOpen(true);
        setSeconds(10);
      }}>
        {getValue()}
      </S.Value>
    </Tooltip>
  );
}
