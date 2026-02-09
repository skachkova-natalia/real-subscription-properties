import {resetDomainStoresByEvents} from '@utils/effector';
import {
  $addMixtureError,
  addMixModalDomain,
  addMixture,
  addMixtureFx,
  addMixtureSuccessFx,
  closeAddMixModal,
} from '@models/modals/addMixModal/index';
import {sample} from 'effector';

resetDomainStoresByEvents(addMixModalDomain, closeAddMixModal);

$addMixtureError
  .on(addMixtureFx.failData, (_, payload) => ({
    msg: {
      ru: payload?.detail?.msg.ru || '',
      en: payload?.detail?.msg.en || '',
    },
  }))
  .reset(addMixture);

sample({
  clock: addMixture,
  target: addMixtureFx,
});

sample({
  clock: addMixtureFx.doneData,
  target: [addMixtureSuccessFx, closeAddMixModal],
});
