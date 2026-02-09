import {combine, createDomain} from 'effector';
import {modalStateFactory} from '@utils/modalStateFactory';
import {mixtureService} from '@services/mixtureService';
import {Mixture} from '@src/types/mixture';
import {showSuccessNotification} from '@utils/notification';
import {ApiResponseError} from '@core/api';
import {ErrorDescription} from '@src/types/common';

export const addMixModalDomain = createDomain();

export const addMixtureFx = addMixModalDomain.createEffect<typeof mixtureService.addNewMixture, ApiResponseError>(mixtureService.addNewMixture);
export const addMixtureSuccessFx = addMixModalDomain.createEffect({handler: () => showSuccessNotification('Смесь была успешно создана.')});

export const addMixture = addMixModalDomain.createEvent<Mixture>();

export const $addMixtureError = addMixModalDomain.createStore<ErrorDescription | null>(null);

export const {
  $isOpen,
  openModal: openAddMixModal,
  closeModal: closeAddMixModal,
} = modalStateFactory({domain: addMixModalDomain});

export const $mixModal = combine({
  isOpen: $isOpen,
  loading: addMixtureFx.pending,
  addMixtureError: $addMixtureError,
});
