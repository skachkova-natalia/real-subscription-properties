interface Props {
  value: string;
}

export function PropertyCell({ value }: Props) {
  return <span>{value}</span>;
}
