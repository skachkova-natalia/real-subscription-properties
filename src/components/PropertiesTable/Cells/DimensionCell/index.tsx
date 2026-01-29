import {MathJax} from 'better-react-mathjax';
import {getTableRow} from '@models/propertiesTable';
import {$latexUnitsCode} from '@models/dictionary';
import {useUnit} from 'effector-react';
import {useMemo} from 'react';
import MathJaxWrapper from '@components/MathJaxWrapper';
import {SelectComponent} from '@ui-kit/Select';

interface Props {
  dimension: string;
  property_literal: string;
  available_dimensions: string[];
}

export function DimensionCell({dimension, property_literal, available_dimensions}: Props) {
  const latexUnitsCode = useUnit($latexUnitsCode);

  const dimensionOptions = useMemo(() => {
    return available_dimensions?.map((dimension) => ({
      key: dimension,
      value: dimension,
      label: <MathJax>{latexUnitsCode[dimension]}</MathJax>,
    })) || [];
  }, [available_dimensions, latexUnitsCode]);

  return (
    <MathJaxWrapper key={`${dimension}`}>
      {available_dimensions && available_dimensions?.length > 0 && (
        <SelectComponent
          options={dimensionOptions}
          value={dimension}
          onChange={(newValue) => {
            getTableRow({property_dimension: newValue, property: property_literal});
          }}
        />
      )}
      {(!available_dimensions || !available_dimensions?.length) && '—'}
    </MathJaxWrapper>
  );
}
