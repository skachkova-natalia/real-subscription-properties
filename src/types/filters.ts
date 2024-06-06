export interface Filter {
  value: string;
  label: string;
}

export interface SubstanceFiltersResponse {
  data: Filter[];
}

export interface Mode {
  value: string;
  filter_params: string[];
  param_literals: string[];
  param_dimensions: string[];
  available_param_dimension: string[][];
}

export interface ModesResponse {
  data: Mode[];
}

export interface TableFilters {
  substanceId: string;
  modeId: string;
  params: TableParamsFilters;
}

export interface TableParamsFilters {
  param_values: string[];
  param_dimensions: string[];
}

export interface PropertiesFilters {
  substanceId: string;
  modeId: string;
}

export interface PropertyDescription {
  [key: string]: string;
}

export interface PropertiesListResponse {
  data: PropertyDescription;
}
