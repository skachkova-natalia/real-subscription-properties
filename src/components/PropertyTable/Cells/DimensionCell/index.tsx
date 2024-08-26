import {Select} from 'antd';

export function DimensionCell(value: string, row: any) {
  return (
    <>
      {row.available_dimensions && row.available_dimensions.length === 1 && row.dimension}
      {row.available_dimensions && row.available_dimensions.length > 1 && <Select
        options={row.available_dimensions.map((dimension) => ({value: dimension, label: dimension}))}
        defaultValue={row.available_dimensions[0]}
        onChange={(newValue) => {
          console.log(newValue);
        }}
      />}
      {!row.available_dimensions && '—'}
    </>
  );
}
