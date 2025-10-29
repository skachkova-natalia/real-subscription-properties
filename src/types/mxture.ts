export interface Mixture {
  name: string;
  description: string;
  components: Component[];
}

export interface Component {
  name: string;
  concentration: string;
}
