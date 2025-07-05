import {LocaleTranslation} from '@src/types/common';

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
  description: LocaleTranslation;
  parameters: Parameter[];
}

export interface Parameter {
  id: string;
  name: LocaleTranslation;
  units: Unit;
}

export interface Unit {
  units_latex: string[];
  units_simple: string[];
}

export interface TableFilters {
  substance_name: string;
  mode_name: string;
  params: TableParamFilters[];
}

export interface TableParamFilters {
  id: string;
  values: number;
  param_dimension: string;
}

export interface TableRowFilters {
  substanceId: string;
  modeId: string;
  params: TableParamFilters & TableRowParamsFilters;
}

export interface TableRowParamsFilters{
  property: string;
  property_dimension: string;
}

export interface PropertiesFilters {
  substance_name: string;
  mode_name: string;
}

export interface PropertiesListResponse {
  data: PropertyItem[];
}

export interface PropertyItem {
  literal: string;
  name_en: string;
  name_ru: string;
  dimension_si: string;
}
