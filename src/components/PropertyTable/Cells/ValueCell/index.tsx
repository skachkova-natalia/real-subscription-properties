import {Tooltip} from 'antd';

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
  console.log(value, Number.parseFloat(value).toExponential(3));

  return (
    <Tooltip title={getValue()}>{Number.parseFloat(value).toExponential(3)}</Tooltip>
  );
}
