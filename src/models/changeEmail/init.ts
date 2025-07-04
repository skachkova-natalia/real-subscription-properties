import {resetDomainStoresByEvents} from '@utils/effector';
import {
  $changeEmailError,
  $changeEmailSuccess, changeEmail,
  changeEmailFx,
  changeEmailPageDomain,
  ChangeEmailPageGate,
} from '@models/changeEmail/index';
import {sample} from 'effector';

resetDomainStoresByEvents(changeEmailPageDomain, ChangeEmailPageGate.close);

$changeEmailError
  .on(changeEmailFx.failData, (_, payload) => payload.detail || null)
  .reset(changeEmailFx);
$changeEmailSuccess.on(changeEmailFx.doneData, () => true).reset(changeEmailFx);

sample({
  clock: changeEmail,
  target: changeEmailFx,
});
