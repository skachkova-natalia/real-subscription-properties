import {resetDomainStoresByEvents} from '@utils/effector';
import {sample} from 'effector';
import {
  $registerError,
  register,
  registerPageDomain,
  registerFx,
  RegisterPageGate,
} from '@models/registration/index';

resetDomainStoresByEvents(registerPageDomain, RegisterPageGate.close);

$registerError
  .on(registerFx.failData, (_, payload) => payload.detail)
  .reset(registerFx);

sample({
  clock: register,
  target: registerFx,
});
