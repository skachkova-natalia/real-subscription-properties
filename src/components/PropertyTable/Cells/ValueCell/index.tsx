import {Tooltip} from 'antd';
import * as S from './styled';

export function ValueCell(value: string) {
  const getValue = () => {
    if (value === 'NaN') {
      return '—';
    }
    if (value === 'Infinity') {
      return '∞';
    }
    return value;
  };

  return (
    <Tooltip title={getValue()}>
      <S.Value onClick={() => navigator.clipboard.writeText(value)}>
        {Number.parseFloat(value).toExponential(3)}
      </S.Value>
    </Tooltip>
  );
}
