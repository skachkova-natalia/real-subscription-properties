import {LocaleTranslation} from '@src/types/common';

export interface PropertyItem {
  key?: string;
  property_literal: string;
  property_name: LocaleTranslation;
  dimension: string;
  value: string;
  available_dimensions: string[];
}

export interface TableResponse {
  data: PropertyItem[];
}

export interface TableRowResponse {
  data: PropertyItem;
}
