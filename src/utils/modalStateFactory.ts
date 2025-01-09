import {createDomain, Domain} from 'effector';

interface Params {
  domain?: Domain;
}

export function modalStateFactory<OpenEventPayload = void>(params?: Params) {
  const {domain = createDomain()} = params || {};
  const openModal = domain.createEvent<OpenEventPayload>();
  const closeModal = domain.createEvent<unknown>();
  const $isOpen = domain.createStore<boolean>(false);

  $isOpen.on(openModal, () => true).on(closeModal, () => false);

  return {
    $isOpen,
    openModal,
    closeModal,
  };
}
