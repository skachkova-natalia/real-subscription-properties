export interface Mixture {
  name: string;
  description: string;
  components: Component[];
}

export interface Component {
  name: string;
  concentration: string;
}

export interface MixtureExtended extends Mixture {
  phase_id: number;
  pure_components: Component[];
  created_at: string;
  changed_at: string;
  owner_id: number;
}

export interface MixturesResponse {
  data: MixtureExtended[];
}
