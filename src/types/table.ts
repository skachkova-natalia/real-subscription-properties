import {LocaleTranslation} from '@src/types/common';

export interface PropertyItem {
  key?: string;
  property_literal: string;
  property_name: LocaleTranslation;
  dimension: {
    unit_simple: string;
    unit_latex: string;
  };
  value: number;
  available_dimensions: {
    units_simple: string[];
    units_latex: string[];
  };
}

export interface TableResponse {
  data: PropertyItem[];
}

export interface TableRowResponse {
  data: {
    propertyId: string;
    value: number;
    dimension: string;
  };
}
