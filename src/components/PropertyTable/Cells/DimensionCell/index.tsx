import {Select} from 'antd';
import {MathJax, MathJaxContext} from 'better-react-mathjax';
import {MATHJAX_DIMENSIONS} from '@src/constants';
import {PropertyItem} from '@src/types/table';
import {getTableRow} from '@models/propertyTable';
import {useState} from 'react';

export function DimensionCell(value: string, row: PropertyItem) {
  const [key, setKey] = useState(true);

  const dimensionOptions = row.available_dimensions?.map((dimension) => ({
    key: dimension,
    value: dimension,
    label: <MathJax>{MATHJAX_DIMENSIONS[dimension]}</MathJax>,
  })) || [];

  return (
    <MathJaxContext>
      {row.available_dimensions && row.available_dimensions?.length > 0 && (
        <Select
          key={`${key}`}
          options={dimensionOptions}
          defaultValue={row.available_dimensions[0]}
          onChange={(newValue) => {
            getTableRow({property_dimension: newValue, property: row.propertyId});
            setKey((v) => !v);
          }}
        />
      )}
      {(!row.available_dimensions || !row.available_dimensions?.length) && '—'}
    </MathJaxContext>
  );
}
