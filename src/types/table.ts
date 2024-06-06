export interface PropertyItem {
  propertyId: string;
  value: number;
  dimension: string;
  available_dimensions: string[];
}

export interface TableResponse {
  data: PropertyItem[];
}
