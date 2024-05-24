export interface PropertyItem {
  dimensionId?: string;
  propertyId: string;
  value: number;
}

export interface TableResponse {
  data: PropertyItem[];
}
