import {combine, createDomain} from 'effector';
import {modalStateFactory} from '@utils/modalStateFactory';
import {mixtureService} from '@services/mixtureService';
import {Mixture} from '@src/types/mxture';

export const addMixModalDomain = createDomain();

export const addMixtureFx = addMixModalDomain.createEffect(mixtureService.addNewMixture);

export const addMixture = addMixModalDomain.createEvent<Mixture>();

export const {
  $isOpen,
  openModal: openAddMixModal,
  closeModal: closeAddMixModal,
} = modalStateFactory({domain: addMixModalDomain});

export const $mixModal = combine({
  isOpen: $isOpen,
});
