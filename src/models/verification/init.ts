import {resetDomainStoresByEvents} from '@utils/effector';
import {
  $verificationError,
  $verificationSuccess,
  verificationPageDomain,
  VerificationPageGate,
  verifyFx,
} from '@models/verification/index';
import {sample} from 'effector';

resetDomainStoresByEvents(verificationPageDomain, VerificationPageGate.close);

$verificationError
  .on(verifyFx.failData, (_, payload) => payload.detail || null)
  .reset(verifyFx);
$verificationSuccess.on(verifyFx.doneData, () => true).reset(verifyFx);

sample({
  clock: VerificationPageGate.open,
  filter: (id) => !!id,
  fn: (id) => id,
  target: verifyFx,
});
