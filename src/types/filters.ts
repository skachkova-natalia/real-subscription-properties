export interface Filter {
  value: string;
  label: string;
}

export interface Substance {
  name_en: string;
  name_ru: string;
  substance_name: string;
}

export interface SubstanceFiltersResponse {
  data: Substance[];
}

export interface ModesResponse {
  data: Mode[];
}

export interface Mode {
  mode_name: string;
  description_ru: string;
  description_en: string;
  parameters: Parameter[];
}

export interface Parameter {
  id: string;
  name_en: string;
  name_ru: string;
  unit: string[];
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

export interface TableRowFilters {
  substanceId: string;
  modeId: string;
  params: TableParamsFilters & TableRowParamsFilters;
}

export interface TableRowParamsFilters{
  property: string;
  property_dimension: string;
}

export interface PropertiesFilters {
  substance_name: string;
  mode_name: string;
}

export interface PropertyDescription {
  [key: string]: string;
}

export interface PropertiesListResponse {
  data: PropertyDescription;
}
