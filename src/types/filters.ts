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
}

export interface ModesResponse {
  data: Mode[];
}

export interface TableFilters {
  substanceId: string;
  modeId: string;
  params: string[];
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
