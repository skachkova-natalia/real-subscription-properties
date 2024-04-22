import {Domain, Unit} from 'effector';

export function resetDomainStoresByEvents(
  domain: Domain,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...triggers:  Unit<any>[]
): void {
  domain.onCreateStore((store) => store.reset(triggers));
}

export function forwardPayload<State, E>() {
  return (state: State, payload: E) => payload;
}

export function forwardErrorMessage() {
  return (state: string, payload: Error) => payload.message;
}
