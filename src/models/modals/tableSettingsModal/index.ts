import {combine, createDomain} from 'effector';
import {modalStateFactory} from '@utils/modalStateFactory';

export const tableSettingsModalDomain = createDomain();

export const {
  $isOpen,
  openModal: openTableSettingsModal,
  closeModal: closeTableSettingsModal,
} = modalStateFactory({domain: tableSettingsModalDomain});

export const $tableSettingsModal = combine({
  isOpen: $isOpen,
});
