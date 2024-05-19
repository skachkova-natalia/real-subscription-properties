export interface PropertyItem {
  dimensionId: string;
  property: string;
  value: number;
}

export interface TableResponse {
  data: PropertyItem[];
}
