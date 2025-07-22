export interface GraphicParams {
  substance_name: string;
  mode_name: string;
  property_name: string;
  property_dimension: string;
  count: number;
  fixed_parameter: {
    id: string;
    value: number;
    param_dimension: string;
  },
  variable_parameter: {
    id: string;
    min: number;
    max: number;
    param_dimension: string;
  },
}

export interface Point {
  x: number;
  y: number;
}
