export interface GraphicFiltersParams {
  substance_name: string;
  mode_name: string;
  properties: Property[];
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

export interface Property {
  name: string;
  dimension: string;
}

export interface Points {
  data: PropertyPoint;
}

export interface PropertyPoint {
  [key: string]: Point[];
}

export interface Point {
  x: number;
  y: number;
}

