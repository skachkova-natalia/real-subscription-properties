export interface TableError {
  msg_user_ru: string;
  msg_user_en: string;
}

export interface PropertyItem {
  propertyId: string;
  value: number;
  dimension: string;
  available_dimensions: string[];
}

export interface TableResponse {
  data: PropertyItem[];
}

export interface TableRowResponse {
  data: {
    propertyId: string;
    value: number;
  }
}
