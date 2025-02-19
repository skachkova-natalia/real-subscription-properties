export interface PropertyItem {
  key?: string;
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
    dimension: string;
  }
}
