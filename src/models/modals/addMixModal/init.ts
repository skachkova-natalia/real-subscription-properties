import {resetDomainStoresByEvents} from '@utils/effector';
import {addMixModalDomain, addMixture, addMixtureFx, closeAddMixModal} from '@models/modals/addMixModal/index';
import {sample} from 'effector';

resetDomainStoresByEvents(addMixModalDomain, closeAddMixModal);

sample({
  clock: addMixture,
  target: addMixtureFx,
})
