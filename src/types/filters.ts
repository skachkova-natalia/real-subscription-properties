

export interface Filter {
  value: string;
  label: string;
}

export interface SubstanceFiltersResponse {
  data: Filter[];
}

export interface Mode {
  value: string;
  label: string[];
}

export interface ModesResponse {
  data: Mode[];
}
