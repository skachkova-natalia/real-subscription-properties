import {Select} from 'antd';
import {MathJax, MathJaxContext} from 'better-react-mathjax';
import {MATHJAX_DIMENSIONS} from '@src/constants';
import {PropertyItem} from '@src/types/table';
import {getTableRow} from '@models/propertyTable';

export function DimensionCell(value: string, row: PropertyItem) {
  const dimensionOptions = row.available_dimensions?.map((dimension) => ({
    key: dimension,
    value: dimension,
    label: <MathJax>{MATHJAX_DIMENSIONS[dimension]}</MathJax>,
  })) || [];

  return (
    <MathJaxContext>
      {row.available_dimensions && row.available_dimensions?.length > 0 && (
        <Select
          key={`${value}`}
          options={dimensionOptions}
          value={value}
          onChange={(newValue) => {
            getTableRow({property_dimension: newValue, property: row.propertyId});
          }}
        />
      )}
      {(!row.available_dimensions || !row.available_dimensions?.length) && '—'}
    </MathJaxContext>
  );
}
