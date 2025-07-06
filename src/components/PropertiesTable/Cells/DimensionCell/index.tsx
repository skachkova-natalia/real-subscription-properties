import {Select} from 'antd';
import {MathJax, MathJaxContext} from 'better-react-mathjax';
import {MATHJAX_DIMENSIONS} from '@src/constants';
import {PropertyItem} from '@src/types/table';
import {getTableRow} from '@models/propertiesTable';

export function DimensionCell(value: string, row: PropertyItem) {
  const dimensionOptions = row.available_dimensions?.units_simple?.map((dimension) => ({
    key: dimension,
    value: dimension,
    label: <MathJax>{MATHJAX_DIMENSIONS[dimension]}</MathJax>,
  })) || [];

  return (
    <MathJaxContext key={`${value}`}>
      {row.available_dimensions && row.available_dimensions?.units_simple?.length > 0 && (
        <Select
          options={dimensionOptions}
          value={row.dimension.unit_simple}
          onChange={(newValue) => {
            getTableRow({property_dimension: newValue, property: row.property_literal});
          }}
        />
      )}
      {(!row.available_dimensions || !row.available_dimensions?.units_simple?.length) && '—'}
    </MathJaxContext>
  );
}
